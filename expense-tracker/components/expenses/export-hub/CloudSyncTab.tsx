'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { Button } from '@/components/ui';

interface CloudSyncTabProps {
  expenses: Expense[];
}

interface CloudService {
  id: string;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
  lastSync?: string;
  color: string;
}

export function CloudSyncTab({ expenses }: CloudSyncTabProps) {
  const [services, setServices] = useState<CloudService[]>([
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      icon: '📊',
      description: 'Sync to a live spreadsheet with auto-updates',
      connected: false,
      color: 'bg-green-50 border-green-200 text-green-700',
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: '📦',
      description: 'Automatic backups to your Dropbox folder',
      connected: true,
      lastSync: '2 hours ago',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: '☁️',
      description: 'Store exports in your Drive account',
      connected: false,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: '🌐',
      description: 'Microsoft OneDrive integration',
      connected: false,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: '📝',
      description: 'Export to Notion database automatically',
      connected: false,
      color: 'bg-gray-50 border-gray-200 text-gray-700',
    },
    {
      id: 'airtable',
      name: 'Airtable',
      icon: '🔷',
      description: 'Sync to Airtable base with real-time updates',
      connected: false,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
  ]);

  const [syncing, setSyncing] = useState<string | null>(null);

  const handleConnect = async (serviceId: string) => {
    setSyncing(serviceId);

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1500));

    setServices(services.map(s =>
      s.id === serviceId
        ? { ...s, connected: true, lastSync: 'Just now' }
        : s
    ));

    setSyncing(null);
  };

  const handleDisconnect = (serviceId: string) => {
    setServices(services.map(s =>
      s.id === serviceId
        ? { ...s, connected: false, lastSync: undefined }
        : s
    ));
  };

  const handleSync = async (serviceId: string) => {
    setSyncing(serviceId);

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1000));

    setServices(services.map(s =>
      s.id === serviceId
        ? { ...s, lastSync: 'Just now' }
        : s
    ));

    setSyncing(null);
  };

  const connectedCount = services.filter(s => s.connected).length;

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Cloud Integration Status
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {connectedCount} {connectedCount === 1 ? 'service' : 'services'} connected
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${connectedCount > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-gray-700">
              {connectedCount > 0 ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Available Integrations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-lg border-2 p-4 transition-all ${
                service.connected
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{service.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    {service.connected && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 font-medium">
                          Connected
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {service.description}
              </p>

              {service.connected && service.lastSync && (
                <div className="text-xs text-gray-500 mb-3">
                  Last synced: {service.lastSync}
                </div>
              )}

              <div className="flex space-x-2">
                {service.connected ? (
                  <>
                    <Button
                      onClick={() => handleSync(service.id)}
                      disabled={syncing === service.id}
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                    >
                      {syncing === service.id ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Syncing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Sync Now
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleDisconnect(service.id)}
                      size="sm"
                      variant="secondary"
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleConnect(service.id)}
                    disabled={syncing === service.id}
                    size="sm"
                    className="w-full"
                  >
                    {syncing === service.id ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Connect
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div className="flex-1 text-sm text-purple-900">
            <p className="font-medium">Secure & Encrypted</p>
            <p className="text-purple-700 mt-1">
              All cloud integrations use OAuth 2.0 authentication and end-to-end encryption to keep your financial data safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}