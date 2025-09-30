import { Expense } from '@/types';
import { formatDate } from './date';

/**
 * Export expenses to CSV format
 */
export const exportToCSV = (expenses: Expense[]): void => {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  // Create CSV headers
  const headers = ['Date', 'Amount', 'Category', 'Description'];

  // Create CSV rows
  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    expense.amount.toFixed(2),
    expense.category,
    `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${timestamp}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};