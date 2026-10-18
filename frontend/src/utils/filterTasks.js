const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const comparators = {
  // Soonest first; tasks without a due date go last.
  due: (a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  },
  created: (a, b) => b.createdAt.localeCompare(a.createdAt),
  priority: (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
};

// Search, filters and sorting are applied together.
export function applyFilters(tasks, { q, status, priority, category, sort }) {
  const term = q.trim().toLowerCase();

  return tasks
    .filter(
      (task) =>
        (!term || task.title.toLowerCase().includes(term)) &&
        (status === 'all' || task.status === status) &&
        (priority === 'all' || task.priority === priority) &&
        (category === 'all' || task.category === category)
    )
    .sort(comparators[sort] ?? comparators.created);
}
