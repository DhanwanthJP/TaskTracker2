import KanbanBoard from '../components/tasks/KanbanBoard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useModals } from '../context/ModalContext.jsx';
import { btnPrimary } from '../styles.js';

export default function KanbanBoardPage() {
  const { tasks, loading, error, loadTasks } = useTasks();
  const { openCreate } = useModals();

  if (loading) return <LoadingSpinner label="Loading board…" />;
  if (error) return <ErrorMessage error={error} onRetry={loadTasks} />;
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Your board is empty"
        message="Add a task and it will appear in the To Do column."
        action={
          <button type="button" onClick={openCreate} className={btnPrimary}>
            Add New Task
          </button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Drag a card to another column, or use the arrow buttons under each card.
      </p>
      <KanbanBoard tasks={tasks} />
    </div>
  );
}
