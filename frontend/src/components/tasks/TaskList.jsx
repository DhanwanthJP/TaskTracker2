import TaskCard from './TaskCard.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function TaskList({ tasks, compact = false, emptyTitle, emptyMessage, emptyAction }) {
  if (tasks.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />;
  }
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} compact={compact} />
        </li>
      ))}
    </ul>
  );
}
