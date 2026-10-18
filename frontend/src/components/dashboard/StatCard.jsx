const TONES = {
  default: 'text-slate-900',
  success: 'text-emerald-700',
  info: 'text-blue-700',
  danger: 'text-red-700',
};

export default function StatCard({ label, value, tone = 'default', hint }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-600">{label}</p>
      <p className={`mt-1 text-3xl font-semibold ${TONES[tone]}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}
