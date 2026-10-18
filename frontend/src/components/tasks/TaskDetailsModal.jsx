import Modal from '../common/Modal.jsx';
import { PriorityBadge, CategoryBadge, StatusBadge } from '../common/Badges.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { formatDate, formatDateTime, isOverdue } from '../../utils/dates.js';
import { btnDanger, btnPrimary, btnSecondary } from '../../styles.js';

export default function TaskDetailsModal({ task, onClose, onEdit, onDelete }) {
  const { changeStatus } = useTasks();
  const overdue = isOverdue(task);

  return (
    <Modal title="Task details" onClose={onClose}>
      <h3 className={`text-lg font-semibold break-words ${task.completed ? 'text-slate-500 line-through' : ''}`}>
        {task.title}
      </h3>

      <div className="mt-2 flex flex-wrap gap-2">
        <PriorityBadge priority={task.priority} />
        <CategoryBadge category={task.category} />
        <StatusBadge status={task.status} />
      </div>

      <p className="mt-4 text-sm whitespace-pre-wrap text-slate-700">
        {task.description || 'No description added.'}
      </p>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-slate-600">Due date</dt>
        <dd className={overdue ? 'font-semibold text-red-700' : ''}>
          {formatDate(task.dueDate)}
          {overdue && ' (overdue)'}
        </dd>
        <dt className="text-slate-600">Created</dt>
        <dd>{formatDateTime(task.createdAt)}</dd>
        <dt className="text-slate-600">Last updated</dt>
        <dd>{formatDateTime(task.updatedAt)}</dd>
      </dl>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button type="button" className={btnDanger} onClick={() => onDelete(task)}>
          Delete
        </button>
        <button type="button" className={btnSecondary} onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          type="button"
          className={btnPrimary}
          onClick={() => changeStatus(task.id, task.completed ? 'todo' : 'done')}
        >
          {task.completed ? 'Reopen' : 'Mark complete'}
        </button>
      </div>
    </Modal>
  );
}
