import TaskList from '../components/tasks/TaskList.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { isDueToday, isOverdue } from '../utils/dates.js';

// Focus view: what needs attention today (plus anything already late).
export default function MyDay() {
  const { tasks, loading, error, loadTasks } = useTasks();

  if (loading) return <LoadingSpinner label="Loading tasks…" />;
  if (error) return <ErrorMessage error={error} onRetry={loadTasks} />;

  const overdue = tasks.filter(isOverdue);
  const dueToday = tasks.filter(isDueToday);
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">{today}</p>

      {overdue.length > 0 && (
        <section>
          <h2 className="mb-3 text-base font-semibold text-red-700">Overdue ({overdue.length})</h2>
          <TaskList tasks={overdue} />
        </section>
      )}

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">Due today ({dueToday.length})</h2>
        <TaskList
          tasks={dueToday}
          emptyTitle="Nothing due today"
          emptyMessage="Give a task today's due date and it will appear here."
        />
      </section>
    </div>
  );
}
