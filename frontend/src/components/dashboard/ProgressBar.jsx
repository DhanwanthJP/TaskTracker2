export default function ProgressBar({ value, label = 'Task completion' }) {
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
    >
      <div className="h-full bg-blue-600" style={{ width: `${percent}%` }} />
    </div>
  );
}
