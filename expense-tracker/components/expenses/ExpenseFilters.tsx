'use client';

import { ExpenseFilters as ExpenseFiltersType, ExpenseCategory } from '@/types';
import { Input, Select, Button } from '@/components/ui';

interface ExpenseFiltersProps {
  filters: ExpenseFiltersType;
  onFiltersChange: (filters: ExpenseFiltersType) => void;
  onClearFilters: () => void;
}

const categories: (ExpenseCategory | 'All')[] = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export function ExpenseFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ExpenseFiltersProps) {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.startDate ||
    filters.endDate ||
    filters.searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="Search"
          type="text"
          placeholder="Search expenses..."
          value={filters.searchQuery || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchQuery: e.target.value })
          }
        />

        <Select
          label="Category"
          value={filters.category || 'All'}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              category: e.target.value as ExpenseCategory | 'All',
            })
          }
          options={categories.map((cat) => ({ value: cat, label: cat }))}
        />

        <Input
          label="Start Date"
          type="date"
          value={filters.startDate || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, startDate: e.target.value })
          }
        />

        <Input
          label="End Date"
          type="date"
          value={filters.endDate || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, endDate: e.target.value })
          }
        />
      </div>
    </div>
  );
}