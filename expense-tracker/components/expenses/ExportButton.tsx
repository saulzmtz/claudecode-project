'use client';

import { Expense } from '@/types';
import { Button } from '@/components/ui';
import { exportToCSV } from '@/lib/utils';

interface ExportButtonProps {
  expenses: Expense[];
}

export function ExportButton({ expenses }: ExportButtonProps) {
  const handleExport = () => {
    exportToCSV(expenses);
  };

  return (
    <Button
      variant="secondary"
      onClick={handleExport}
      disabled={expenses.length === 0}
    >
      <svg
        className="w-5 h-5 mr-2 inline-block"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </Button>
  );
}