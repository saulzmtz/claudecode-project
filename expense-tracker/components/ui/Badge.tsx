import { ReactNode } from 'react';
import { ExpenseCategory } from '@/types';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'category';
  category?: ExpenseCategory;
}

export function Badge({ children, variant = 'default', category }: BadgeProps) {
  const getCategoryColor = (cat?: ExpenseCategory): string => {
    if (!cat) return 'bg-gray-100 text-gray-800';

    const colors: Record<ExpenseCategory, string> = {
      Food: 'bg-orange-100 text-orange-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Bills: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800',
    };

    return colors[cat];
  };

  const variantStyles =
    variant === 'category'
      ? getCategoryColor(category)
      : 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles}`}
    >
      {children}
    </span>
  );
}