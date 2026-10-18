// Deliberately static (no animation). Add `animate-spin` to the ring to make it spin.
export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-12 text-sm text-slate-600">
      <span aria-hidden="true" className="h-5 w-5 rounded-full border-2 border-slate-300 border-t-blue-600" />
      <span>{label}</span>
    </div>
  );
}
