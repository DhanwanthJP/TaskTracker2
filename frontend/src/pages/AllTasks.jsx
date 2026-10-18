import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/tasks/FilterPanel.jsx';
import ViewSwitcher from '../components/tasks/ViewSwitcher.jsx';
import TaskList from '../components/tasks/TaskList.jsx';
import KanbanBoard from '../components/tasks/KanbanBoard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useModals } from '../context/ModalContext.jsx';
import { applyFilters } from '../utils/filterTasks.js';
import { btnPrimary, btnSecondary } from '../styles.js';

// Search text, filters, sort order and view are all stored in the URL query string,
// e.g. /tasks?q=java&category=Study&view=kanban, so they can be bookmarked and survive a refresh.
const DEFAULTS = { status: 'all', priority: 'all', category: 'all', sort: 'created' };

export default function AllTasks() {
  const { tasks, loading, error, loadTasks } = useTasks();
  const { openCreate } = useModals();
  const [params, setParams] = useSearchParams();

  const filters = {
    q: params.get('q') ?? '',
    status: params.get('status') ?? DEFAULTS.status,
    priority: params.get('priority') ?? DEFAULTS.priority,
    category: params.get('category') ?? DEFAULTS.category,
    sort: params.get('sort') ?? DEFAULTS.sort,
  };
  const view = params.get('view') === 'kanban' ? 'kanban' : 'list';
  const canClear =
    filters.q !== '' || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all';

  function setParam(name, value, defaultValue) {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(name);
    else next.set(name, value);
    setParams(next, { replace: true });
  }

  function clearFilters() {
    const next = new URLSearchParams(params);
    ['q', 'status', 'priority', 'category'].forEach((name) => next.delete(name));
    setParams(next, { replace: true });
  }

  const visibleTasks = applyFilters(tasks, filters);

  let content;
  if (loading) {
    content = <LoadingSpinner label="Loading tasks…" />;
  } else if (error) {
    content = <ErrorMessage error={error} onRetry={loadTasks} />;
  } else if (tasks.length === 0) {
    content = (
      <EmptyState
        title="No tasks yet"
        message="Create your first task to start organising your work."
        action={
          <button type="button" onClick={openCreate} className={btnPrimary}>
            Add New Task
          </button>
        }
      />
    );
  } else if (visibleTasks.length === 0) {
    content = (
      <EmptyState
        title="No tasks match your filters"
        message="Try a different search term or remove some filters."
        action={
          <button type="button" onClick={clearFilters} className={btnSecondary}>
            Clear Filters
          </button>
        }
      />
    );
  } else if (view === 'kanban') {
    content = <KanbanBoard tasks={visibleTasks} />;
  } else {
    content = <TaskList tasks={visibleTasks} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-700" aria-live="polite">
          {loading || error ? '' : `Showing ${visibleTasks.length} of ${tasks.length} tasks`}
        </p>
        <ViewSwitcher value={view} onChange={(next) => setParam('view', next, 'list')} />
      </div>

      <FilterPanel
        filters={filters}
        onChange={(name, value) => setParam(name, value, DEFAULTS[name])}
        onClear={clearFilters}
        canClear={canClear}
      />

      {content}
    </div>
  );
}
