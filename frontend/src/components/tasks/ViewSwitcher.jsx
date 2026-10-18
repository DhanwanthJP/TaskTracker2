const VIEWS = [
  { value: 'list', label: 'List' },
  { value: 'kanban', label: 'Kanban' },
];

// Calendar view is planned as a later extension: add { value: 'calendar', label: 'Calendar' } here.
export default function ViewSwitcher({ value, onChange }) {
  return (
    <div role="group" aria-label="Choose view" className="inline-flex overflow-hidden rounded-md border border-slate-300 bg-white">
      {VIEWS.map((view) => (
        <button
          key={view.value}
          type="button"
          aria-pressed={value === view.value}
          onClick={() => onChange(view.value)}
          className={`px-4 py-2 text-sm font-medium ${
            value === view.value ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
