import { Expense } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export const storageUtils = {
  /**
   * Get all expenses from localStorage
   */
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  /**
   * Save expenses to localStorage
   */
  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Add a new expense
   */
  addExpense: (expense: Expense): Expense[] => {
    const expenses = storageUtils.getExpenses();
    const updatedExpenses = [...expenses, expense];
    storageUtils.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  /**
   * Update an existing expense
   */
  updateExpense: (id: string, updates: Partial<Expense>): Expense[] => {
    const expenses = storageUtils.getExpenses();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, ...updates, updatedAt: new Date().toISOString() }
        : expense
    );
    storageUtils.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  /**
   * Delete an expense
   */
  deleteExpense: (id: string): Expense[] => {
    const expenses = storageUtils.getExpenses();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    storageUtils.saveExpenses(updatedExpenses);
    return updatedExpenses;
  },

  /**
   * Clear all expenses
   */
  clearExpenses: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};