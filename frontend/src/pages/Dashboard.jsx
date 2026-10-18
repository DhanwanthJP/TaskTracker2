import { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard.jsx';
import ProgressBar from '../components/dashboard/ProgressBar.jsx';
import TaskList from '../components/tasks/TaskList.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useModals } from '../context/ModalContext.jsx';
import { getDashboardStats } from '../services/taskApi.js';
import { btnPrimary } from '../styles.js';

export default function Dashboard() {
  const { tasks } = useTasks();
  const { openCreate } = useModals();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Statistics come from the API. They are fetched again whenever the task list changes,
  // so the numbers always reflect the latest tasks.
  useEffect(() => {
    let ignore = false;
    getDashboardStats()
      .then((data) => {
        if (ignore) return;
        setStats(data);
        setError(null);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      });
    return () => {
      ignore = true;
    };
  }, [tasks, reloadKey]);

  function retry() {
    setError(null);
    setReloadKey((key) => key + 1);
  }

  if (!stats) {
    return error ? <ErrorMessage error={error} onRetry={retry} /> : <LoadingSpinner label="Loading dashboard…" />;
  }

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {error && <ErrorMessage error={error} onRetry={retry} />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          <p className="text-sm text-slate-600">{today}</p>
        </div>
        <button type="button" onClick={openCreate} className={`${btnPrimary} px-6 py-3 text-base`}>
          Add New Task
        </button>
      </div>

      <section aria-label="Task statistics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} tone="success" />
        <StatCard label="Pending" value={stats.pending} tone="info" />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          tone={stats.overdue > 0 ? 'danger' : 'default'}
          hint={stats.overdue > 0 ? 'Past their due date' : 'Nothing is late'}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Completion progress</h2>
          <p className="text-sm text-slate-700">
            {stats.completed} of {stats.total} done ({stats.completionPercentage}%)
          </p>
        </div>
        <ProgressBar value={stats.completionPercentage} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">Due today</h2>
          <TaskList
            tasks={stats.dueToday}
            compact
            emptyTitle="Nothing due today"
            emptyMessage="Tasks with today's due date will show up here."
          />
        </section>
        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">Recently updated</h2>
          <TaskList
            tasks={stats.recent}
            compact
            emptyTitle="No tasks yet"
            emptyMessage="Add your first task to get started."
            emptyAction={
              <button type="button" onClick={openCreate} className={btnPrimary}>
                Add New Task
              </button>
            }
          />
        </section>
      </div>
    </div>
  );
}
