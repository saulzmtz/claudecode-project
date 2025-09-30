'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { Modal, Button } from '@/components/ui';
import { QuickExportTab } from './export-hub/QuickExportTab';
import { CloudSyncTab } from './export-hub/CloudSyncTab';
import { ScheduleTab } from './export-hub/ScheduleTab';
import { ShareTab } from './export-hub/ShareTab';
import { HistoryTab } from './export-hub/HistoryTab';

interface ExportHubProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

type TabType = 'quick' | 'cloud' | 'schedule' | 'share' | 'history';

export function ExportHub({ isOpen, onClose, expenses }: ExportHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>('quick');

  const tabs = [
    {
      id: 'quick' as TabType,
      label: 'Quick Export',
      icon: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'cloud' as TabType,
      label: 'Cloud Sync',
      icon: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      id: 'schedule' as TabType,
      label: 'Schedule',
      icon: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'share' as TabType,
      label: 'Share',
      icon: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
    },
    {
      id: 'history' as TabType,
      label: 'History',
      icon: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex flex-col h-full -m-6">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Export Hub</h2>
              <p className="text-blue-100 text-sm mt-1">
                Export, sync, and share your expense data
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tab navigation */}
          <div className="mt-6 flex space-x-1 bg-blue-700/30 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:bg-blue-600/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 bg-gray-50 px-6 py-6 overflow-y-auto">
          {activeTab === 'quick' && <QuickExportTab expenses={expenses} />}
          {activeTab === 'cloud' && <CloudSyncTab expenses={expenses} />}
          {activeTab === 'schedule' && <ScheduleTab expenses={expenses} />}
          {activeTab === 'share' && <ShareTab expenses={expenses} />}
          {activeTab === 'history' && <HistoryTab />}
        </div>
      </div>
    </Modal>
  );
}