export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Work', 'Personal', 'Study', 'Other'];

export const STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export const STATUS_LABELS = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]));

export const SORT_OPTIONS = [
  { value: 'created', label: 'Creation date (newest)' },
  { value: 'due', label: 'Due date (soonest)' },
  { value: 'priority', label: 'Priority (high to low)' },
];

export const PAGE_TITLES = {
  '/': 'Dashboard',
  '/tasks': 'All Tasks',
  '/my-day': 'My Day',
  '/kanban': 'Kanban Board',
};
