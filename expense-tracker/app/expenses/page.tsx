'use client';

import { useState } from 'react';
import { useExpenses } from '@/lib/hooks/useExpenses';
import { Navigation } from '@/components/layout/Navigation';
import { ExpenseForm, ExpenseList, ExpenseFilters } from '@/components/expenses';
import { ExportHub } from '@/components/expenses/ExportHub';
import { Button, Modal, LoadingSpinner } from '@/components/ui';
import { ExpenseFormData } from '@/types';

export default function ExpensesPage() {
  const {
    filteredExpenses,
    filters,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    clearFilters,
  } = useExpenses();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportHubOpen, setIsExportHubOpen] = useState(false);

  const handleAddExpense = (formData: ExpenseFormData) => {
    addExpense({
      date: new Date(formData.date).toISOString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
    });
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="mt-2 text-gray-600">
              Manage and track all your expenses
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsExportHubOpen(true)}
              disabled={filteredExpenses.length === 0}
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
                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Export Hub
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <svg
                className="w-5 h-5 mr-2 inline-block"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              Add Expense
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ExpenseFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredExpenses.length} expense
            {filteredExpenses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />
      </main>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Expense"
      >
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Export Hub */}
      <ExportHub
        isOpen={isExportHubOpen}
        onClose={() => setIsExportHubOpen(false)}
        expenses={filteredExpenses}
      />
    </div>
  );
}