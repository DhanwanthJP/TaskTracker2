import { useId } from 'react';
import { inputClass } from '../../styles.js';

export default function SearchBar({ value, onChange, placeholder = 'Search tasks by title' }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Search tasks by title
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
