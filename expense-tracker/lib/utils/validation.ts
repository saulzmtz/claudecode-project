import { ExpenseFormData } from '@/types';

export interface ValidationErrors {
  amount?: string;
  description?: string;
  date?: string;
  category?: string;
}

/**
 * Validate expense form data
 */
export const validateExpenseForm = (
  data: ExpenseFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate amount
  const amount = parseFloat(data.amount);
  if (!data.amount || data.amount.trim() === '') {
    errors.amount = 'Amount is required';
  } else if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  } else if (amount > 999999.99) {
    errors.amount = 'Amount is too large';
  }

  // Validate description
  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (data.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  // Validate date
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      errors.date = 'Invalid date';
    }
  }

  // Validate category
  if (!data.category) {
    errors.category = 'Category is required';
  }

  return errors;
};

/**
 * Check if there are any validation errors
 */
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};