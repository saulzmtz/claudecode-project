import { Card, CardContent } from '@/components/ui';
import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconColor: string;
  description?: string;
}

export function SummaryCard({
  title,
  value,
  icon,
  iconColor,
  description,
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColor}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}