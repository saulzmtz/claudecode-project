'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { Button, Input } from '@/components/ui';

interface ScheduleTabProps {
  expenses: Expense[];
}

interface Schedule {
  id: string;
  name: string;
  frequency: string;
  destination: string;
  format: string;
  enabled: boolean;
  nextRun: string;
}

export function ScheduleTab({ expenses }: ScheduleTabProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      name: 'Monthly Backup',
      frequency: 'Monthly (1st of month)',
      destination: 'Dropbox',
      format: 'CSV',
      enabled: true,
      nextRun: '2025-10-01',
    },
    {
      id: '2',
      name: 'Weekly Summary',
      frequency: 'Weekly (Monday)',
      destination: 'Email',
      format: 'PDF',
      enabled: false,
      nextRun: '2025-10-07',
    },
  ]);

  const [showNewScheduleForm, setShowNewScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    frequency: 'weekly',
    destination: 'email',
    format: 'csv',
  });

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const createSchedule = () => {
    const schedule: Schedule = {
      id: Date.now().toString(),
      name: newSchedule.name || 'New Schedule',
      frequency: newSchedule.frequency === 'daily' ? 'Daily' :
                 newSchedule.frequency === 'weekly' ? 'Weekly (Monday)' :
                 'Monthly (1st of month)',
      destination: newSchedule.destination === 'email' ? 'Email' :
                   newSchedule.destination === 'dropbox' ? 'Dropbox' : 'Google Drive',
      format: newSchedule.format.toUpperCase(),
      enabled: true,
      nextRun: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    };

    setSchedules([...schedules, schedule]);
    setShowNewScheduleForm(false);
    setNewSchedule({ name: '', frequency: 'weekly', destination: 'email', format: 'csv' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Scheduled Exports
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Automate your data exports and backups
          </p>
        </div>
        <Button onClick={() => setShowNewScheduleForm(!showNewScheduleForm)}>
          <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 4v16m8-8H4" />
          </svg>
          New Schedule
        </Button>
      </div>

      {/* New Schedule Form */}
      {showNewScheduleForm && (
        <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Create New Schedule</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Name
              </label>
              <Input
                value={newSchedule.name}
                onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                placeholder="e.g., Monthly Tax Backup"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={newSchedule.destination}
                  onChange={(e) => setNewSchedule({ ...newSchedule, destination: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="gdrive">Google Drive</option>
                  <option value="onedrive">OneDrive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={newSchedule.format}
                  onChange={(e) => setNewSchedule({ ...newSchedule, format: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={createSchedule} className="flex-1">
                Create Schedule
              </Button>
              <Button variant="secondary" onClick={() => setShowNewScheduleForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Schedules */}
      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-medium">No scheduled exports</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first automated export schedule
            </p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`bg-white rounded-lg border-2 p-4 transition-all ${
                schedule.enabled
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        schedule.enabled
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                          schedule.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{schedule.name}</h4>
                      {schedule.enabled && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{schedule.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        <span>{schedule.destination} • {schedule.format}</span>
                      </div>
                      {schedule.enabled && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Next run: {new Date(schedule.nextRun).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                >
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1 text-sm text-amber-900">
            <p className="font-medium">Smart Scheduling</p>
            <p className="text-amber-700 mt-1">
              Scheduled exports run automatically in the background. You&apos;ll receive a notification when each export completes successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}