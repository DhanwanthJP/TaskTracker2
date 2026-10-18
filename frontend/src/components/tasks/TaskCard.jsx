import { PriorityBadge, CategoryBadge, StatusBadge } from '../common/Badges.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { useModals } from '../../context/ModalContext.jsx';
import { formatDate, isOverdue } from '../../utils/dates.js';
import { btnLink } from '../../styles.js';

// `compact` hides the description (used on the dashboard and Kanban board).
// `showToggle` controls the Mark complete / Reopen button (the Kanban board moves tasks with its own buttons).
export default function TaskCard({ task, compact = false, showToggle = true }) {
  const { changeStatus } = useTasks();
  const { openEdit, openDetails, requestDelete } = useModals();

  const overdue = isOverdue(task);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <button
        type="button"
        onClick={() => openDetails(task)}
        className={`text-left text-sm font-semibold break-words hover:underline ${
          task.completed ? 'text-slate-500 line-through' : 'text-slate-900'
        }`}
      >
        {task.title}
      </button>

      {!compact && task.description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{task.description}</p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <CategoryBadge category={task.category} />
        {!compact && <StatusBadge status={task.status} />}
        <span className={`text-xs ${overdue ? 'font-semibold text-red-700' : 'text-slate-600'}`}>
          {overdue && 'Overdue: '}
          {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        {showToggle && (
          <button
            type="button"
            className={btnLink}
            onClick={() => changeStatus(task.id, task.completed ? 'todo' : 'done')}
          >
            {task.completed ? 'Reopen' : 'Mark complete'}
          </button>
        )}
        <button type="button" className={btnLink} onClick={() => openEdit(task)}>
          Edit
        </button>
        <button type="button" className={btnLink} onClick={() => requestDelete(task)}>
          Delete
        </button>
      </div>
    </article>
  );
}
