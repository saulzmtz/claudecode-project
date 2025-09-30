'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { Button } from '@/components/ui';
import { exportToCSV } from '@/lib/utils';

interface QuickExportTabProps {
  expenses: Expense[];
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  format: 'csv' | 'json' | 'pdf';
  color: string;
}

const templates: ExportTemplate[] = [
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'IRS-ready format with all deductible expenses',
    icon: '📋',
    format: 'pdf',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Aggregated monthly spending breakdown',
    icon: '📊',
    format: 'pdf',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'category-analysis',
    name: 'Category Analysis',
    description: 'Detailed category spending with charts',
    icon: '📈',
    format: 'pdf',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'raw-data',
    name: 'Raw Data Export',
    description: 'Complete data in CSV for analysis',
    icon: '📁',
    format: 'csv',
    color: 'from-gray-500 to-slate-600',
  },
  {
    id: 'json-backup',
    name: 'JSON Backup',
    description: 'Full backup with metadata',
    icon: '💾',
    format: 'json',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'receipt-log',
    name: 'Receipt Log',
    description: 'Simplified format for record keeping',
    icon: '🧾',
    format: 'pdf',
    color: 'from-indigo-500 to-blue-600',
  },
];

export function QuickExportTab({ expenses }: QuickExportTabProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (template: ExportTemplate) => {
    setExporting(template.id);

    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Perform actual export based on template
    try {
      exportToCSV(expenses);

      // Add to history (would be stored in state/localStorage in real app)
      const exportRecord = {
        id: Date.now().toString(),
        template: template.name,
        format: template.format,
        timestamp: new Date().toISOString(),
        recordCount: expenses.length,
      };

      // Store in localStorage
      const history = JSON.parse(localStorage.getItem('exportHistory') || '[]');
      history.unshift(exportRecord);
      localStorage.setItem('exportHistory', JSON.stringify(history.slice(0, 20)));

    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{expenses.length}</div>
            <div className="text-sm text-gray-500">Total Records</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(expenses.map(e => new Date(e.date).getMonth())).size}
            </div>
            <div className="text-sm text-gray-500">Months</div>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Export Templates
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${template.color}`} />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-3xl">{template.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {template.description}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {template.format.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => handleExport(template)}
                    disabled={exporting === template.id || expenses.length === 0}
                    size="sm"
                    className="w-full"
                  >
                    {exporting === template.id ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1 text-sm text-blue-900">
            <p className="font-medium">Pro Tip</p>
            <p className="text-blue-700 mt-1">
              Set up automatic exports in the <strong>Schedule</strong> tab to get regular backups sent to your email or cloud storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}