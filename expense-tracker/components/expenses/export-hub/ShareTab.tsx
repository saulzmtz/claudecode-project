'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Expense } from '@/types';
import { Button, Input } from '@/components/ui';

interface ShareTabProps {
  expenses: Expense[];
}

export function ShareTab({ expenses }: ShareTabProps) {
  const [shareLink, setShareLink] = useState('');
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [expiryDays, setExpiryDays] = useState('7');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generateShareLink = () => {
    // Simulate link generation
    const randomId = Math.random().toString(36).substring(7);
    const link = `https://expensetracker.app/share/${randomId}`;
    setShareLink(link);
    setLinkGenerated(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendViaEmail = () => {
    alert('Email functionality would open your email client with the link');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Share Your Data
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Generate secure shareable links or QR codes
        </p>
      </div>

      {!linkGenerated ? (
        /* Configuration */
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Share Settings
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Summary
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Records:</span>{' '}
                      <span className="font-semibold text-gray-900">
                        {expenses.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Amount:</span>{' '}
                      <span className="font-semibold text-gray-900">
                        ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Expiry
                </label>
                <select
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="never">Never expires</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Protection (Optional)
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password to protect link"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-medium text-blue-900">
                      Allow downloads
                    </span>
                    <p className="text-blue-700 mt-1">
                      Recipients can download the data in CSV format
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <Button onClick={generateShareLink} className="w-full">
            <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Generate Share Link
          </Button>
        </div>
      ) : (
        /* Generated Link */
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1 text-sm">
                <p className="font-medium text-green-900">Share link created!</p>
                <p className="text-green-700 mt-1">
                  Your data is now accessible via the link below
                </p>
              </div>
            </div>
          </div>

          {/* Share Link */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Share Link</h4>
            <div className="flex space-x-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button onClick={copyToClipboard} variant="secondary">
                {copied ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button onClick={sendViaEmail} variant="secondary" className="flex-1">
                <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Link
              </Button>
              <Button
                onClick={() => alert('SMS functionality would open messaging app')}
                variant="secondary"
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Send via SMS
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">QR Code</h4>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <QRCodeSVG
                  value={shareLink}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Scan this QR code to access the shared data
              </p>
              <Button
                onClick={() => {
                  // Download QR code
                  const svg = document.querySelector('svg');
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      ctx?.drawImage(img, 0, 0);
                      const pngFile = canvas.toDataURL('image/png');
                      const downloadLink = document.createElement('a');
                      downloadLink.download = 'expense-qr-code.png';
                      downloadLink.href = pngFile;
                      downloadLink.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                  }
                }}
                variant="secondary"
                size="sm"
                className="mt-3"
              >
                <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download QR Code
              </Button>
            </div>
          </div>

          {/* Link Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Link Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">{expiryDays}d</div>
                <div className="text-sm text-gray-600">Expires In</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setLinkGenerated(false);
              setShareLink('');
            }}
            variant="secondary"
            className="w-full"
          >
            Create New Share Link
          </Button>
        </div>
      )}

      {/* Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="flex-1 text-sm text-purple-900">
            <p className="font-medium">Secure Sharing</p>
            <p className="text-purple-700 mt-1">
              All shared links are encrypted and can be revoked at any time from the History tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}