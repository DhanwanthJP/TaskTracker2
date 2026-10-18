import { STATUS_LABELS } from '../../constants.js';

const base = 'inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset';

const PRIORITY_STYLES = {
  High: 'bg-red-50 text-red-700 ring-red-200',
  Medium: 'bg-amber-50 text-amber-800 ring-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

const STATUS_STYLES = {
  todo: 'bg-slate-100 text-slate-700 ring-slate-200',
  'in-progress': 'bg-blue-50 text-blue-700 ring-blue-200',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

// The dot plus the text means priority is never shown by colour alone.
export function PriorityBadge({ priority }) {
  return (
    <span className={`${base} ${PRIORITY_STYLES[priority]}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

export function StatusBadge({ status }) {
  return <span className={`${base} ${STATUS_STYLES[status]}`}>{STATUS_LABELS[status]}</span>;
}

export function CategoryBadge({ category }) {
  return <span className={`${base} bg-white text-slate-700 ring-slate-300`}>{category}</span>;
}
