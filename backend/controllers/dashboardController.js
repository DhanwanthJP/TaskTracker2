import { tasks } from '../data/tasks.js';
import { isOverdue, todayString } from '../utils/dateUtils.js';

// Every number is calculated from the tasks array on each request,
// so the statistics can never drift out of sync with the data.
export function getDashboardStats(req, res) {
  const today = todayString();

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter((task) => isOverdue(task, today)).length;
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const byStatus = { todo: 0, 'in-progress': 0, done: 0 };
  tasks.forEach((task) => {
    byStatus[task.status] += 1;
  });

  const dueToday = tasks.filter((task) => task.dueDate === today);
  const recent = [...tasks]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  res.json({ total, completed, pending, overdue, completionPercentage, byStatus, dueToday, recent });
}
