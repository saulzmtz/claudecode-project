'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, ExpenseFilters, ExpenseSummary, ExpenseCategory } from '@/types';
import { storageUtils } from '@/lib/utils';
import { isDateInRange, getStartOfMonth, getEndOfMonth } from '@/lib/utils/date';

interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilters;
  summary: ExpenseSummary;
  isLoading: boolean;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: ExpenseFilters) => void;
  clearFilters: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({
    category: 'All',
    searchQuery: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load expenses on mount
  useEffect(() => {
    const loadedExpenses = storageUtils.getExpenses();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  // Add expense
  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedExpenses = storageUtils.addExpense(newExpense);
    setExpenses(updatedExpenses);
  };

  // Update expense
  const updateExpense = (id: string, updates: Partial<Expense>) => {
    const updatedExpenses = storageUtils.updateExpense(id, updates);
    setExpenses(updatedExpenses);
  };

  // Delete expense
  const deleteExpense = (id: string) => {
    const updatedExpenses = storageUtils.deleteExpense(id);
    setExpenses(updatedExpenses);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: 'All',
      searchQuery: '',
    });
  };

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    // Category filter
    if (filters.category && filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    // Date range filter
    if (!isDateInRange(expense.date, filters.startDate, filters.endDate)) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      const matchesAmount = expense.amount.toString().includes(query);

      if (!matchesDescription && !matchesCategory && !matchesAmount) {
        return false;
      }
    }

    return true;
  });

  // Calculate summary
  const summary: ExpenseSummary = (() => {
    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate monthly spending
    const monthStart = getStartOfMonth();
    const monthEnd = getEndOfMonth();
    const monthlyExpenses = expenses.filter((exp) =>
      isDateInRange(exp.date, monthStart, monthEnd)
    );
    const monthlySpending = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate category breakdown
    const categoryBreakdown: Record<ExpenseCategory, number> = {
      Food: 0,
      Transportation: 0,
      Entertainment: 0,
      Shopping: 0,
      Bills: 0,
      Other: 0,
    };

    expenses.forEach((exp) => {
      categoryBreakdown[exp.category] += exp.amount;
    });

    // Find top category
    const categories = Object.entries(categoryBreakdown) as [ExpenseCategory, number][];
    let topCategory: { category: ExpenseCategory; amount: number } | null = null;

    for (const [category, amount] of categories) {
      if (!topCategory || amount > topCategory.amount) {
        topCategory = { category, amount };
      }
    }

    if (topCategory?.amount === 0) {
      topCategory = null;
    }

    const expenseCount = expenses.length;
    const averageExpense = expenseCount > 0 ? totalSpending / expenseCount : 0;

    return {
      totalSpending,
      monthlySpending,
      categoryBreakdown,
      topCategory,
      expenseCount,
      averageExpense,
    };
  })();

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        filters,
        summary,
        isLoading,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilters,
        clearFilters,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}