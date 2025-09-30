/**
 * Format a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

/**
 * Get the start of the current month
 */
export const getStartOfMonth = (): string => {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Get the end of the current month
 */
export const getEndOfMonth = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

/**
 * Check if a date is within a range
 */
export const isDateInRange = (
  date: string,
  startDate?: string,
  endDate?: string
): boolean => {
  const dateObj = new Date(date);

  if (startDate) {
    const start = new Date(startDate);
    if (dateObj < start) return false;
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    if (dateObj > end) return false;
  }

  return true;
};