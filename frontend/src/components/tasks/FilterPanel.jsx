import { useId } from 'react';
import { CATEGORIES, PRIORITIES, SORT_OPTIONS, STATUSES } from '../../constants.js';
import { btnSecondary, inputClass, labelClass } from '../../styles.js';

function Select({ label, value, onChange, options }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const withAll = (label, values) => [
  { value: 'all', label },
  ...values.map((v) => ({ value: v, label: v })),
];

// `filters` = { status, priority, category, sort }. `onChange(name, value)` is called for each change.
export default function FilterPanel({ filters, onChange, onClear, canClear }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Status"
          value={filters.status}
          onChange={(v) => onChange('status', v)}
          options={[{ value: 'all', label: 'All statuses' }, ...STATUSES]}
        />
        <Select
          label="Priority"
          value={filters.priority}
          onChange={(v) => onChange('priority', v)}
          options={withAll('All priorities', PRIORITIES)}
        />
        <Select
          label="Category"
          value={filters.category}
          onChange={(v) => onChange('category', v)}
          options={withAll('All categories', CATEGORIES)}
        />
        <Select label="Sort by" value={filters.sort} onChange={(v) => onChange('sort', v)} options={SORT_OPTIONS} />
      </div>
      <div className="mt-3 flex justify-end">
        <button type="button" onClick={onClear} disabled={!canClear} className={btnSecondary}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
