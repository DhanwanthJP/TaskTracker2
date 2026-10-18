import { useId, useState } from 'react';
import ErrorMessage from '../common/ErrorMessage.jsx';
import { CATEGORIES, PRIORITIES } from '../../constants.js';
import { btnPrimary, btnSecondary, inputClass, labelClass } from '../../styles.js';

// Used for both creating (task is null) and editing. `onSubmit` is async and throws on failure.
export default function TaskForm({ task, onSubmit, onCancel }) {
  const uid = useId();
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState(task?.priority ?? 'Medium');
  const [category, setCategory] = useState(task?.category ?? 'Work');
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [titleError, setTitleError] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Enter a title for the task.');
      return;
    }

    setTitleError('');
    setSubmitError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title: trimmedTitle,
        description: description.trim(),
        priority,
        category,
        dueDate: dueDate || null,
      });
    } catch (err) {
      setSubmitError(err);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {submitError && <ErrorMessage error={submitError} />}

      <div>
        <label htmlFor={`${uid}-title`} className={labelClass}>
          Title
        </label>
        <input
          id={`${uid}-title`}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          autoFocus
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? `${uid}-title-error` : undefined}
          className={inputClass}
        />
        {titleError && (
          <p id={`${uid}-title-error`} className="mt-1 text-sm text-red-700">
            {titleError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className={labelClass}>
          Description (optional)
        </label>
        <textarea
          id={`${uid}-description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={500}
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-priority`} className={labelClass}>
            Priority
          </label>
          <select
            id={`${uid}-priority`}
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className={inputClass}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-category`} className={labelClass}>
            Category
          </label>
          <select
            id={`${uid}-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-due`} className={labelClass}>
          Due date (optional)
        </label>
        <input
          id={`${uid}-due`}
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className={btnSecondary} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className={btnPrimary} disabled={submitting}>
          {submitting ? 'Saving…' : task ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  );
}
