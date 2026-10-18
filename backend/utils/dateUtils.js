// Dates are stored as plain "YYYY-MM-DD" strings (local calendar dates), so they can be
// compared with simple string comparison.

const pad = (n) => String(n).padStart(2, '0');

export function formatLocalDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayString() {
  return formatLocalDate(new Date());
}

// Returns a date string `days` away from today (negative = past).
export function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatLocalDate(d);
}

export function isValidDateString(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export function isOverdue(task, today = todayString()) {
  return !task.completed && Boolean(task.dueDate) && task.dueDate < today;
}
