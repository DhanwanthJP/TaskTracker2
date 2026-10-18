// Task due dates are "YYYY-MM-DD" strings in the user's local calendar.
const pad = (n) => String(n).padStart(2, '0');

export function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isOverdue(task) {
  return !task.completed && Boolean(task.dueDate) && task.dueDate < todayString();
}

export function isDueToday(task) {
  return task.dueDate === todayString();
}

export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}
