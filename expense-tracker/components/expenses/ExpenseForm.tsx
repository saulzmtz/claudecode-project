'use client';

import { useState } from 'react';
import { ExpenseFormData, ExpenseCategory, Expense } from '@/types';
import { Button, Input, Select } from '@/components/ui';
import { validateExpenseForm, hasErrors, ValidationErrors } from '@/lib/utils';
import { formatDateForInput } from '@/lib/utils/date';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  onCancel?: () => void;
  initialData?: Expense;
  submitLabel?: string;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export function ExpenseForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Add Expense',
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: initialData?.date ? formatDateForInput(initialData.date) : formatDateForInput(new Date().toISOString()),
    amount: initialData?.amount?.toString() || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      date: true,
      amount: true,
      category: true,
      description: true,
    });

    // Validate form
    const validationErrors = validateExpenseForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    onSubmit(formData);

    // Reset form if not editing
    if (!initialData) {
      setFormData({
        date: formatDateForInput(new Date().toISOString()),
        amount: '',
        category: 'Food',
        description: '',
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        onBlur={() => handleBlur('date')}
        error={touched.date ? errors.date : undefined}
        required
      />

      <Input
        label="Amount"
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="0.00"
        value={formData.amount}
        onChange={handleChange}
        onBlur={() => handleBlur('amount')}
        error={touched.amount ? errors.amount : undefined}
        required
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        onBlur={() => handleBlur('category')}
        error={touched.category ? errors.category : undefined}
        options={categories.map((cat) => ({ value: cat, label: cat }))}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          onBlur={() => handleBlur('description')}
          rows={3}
          placeholder="Enter expense description..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched.description && errors.description
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          required
        />
        {touched.description && errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}