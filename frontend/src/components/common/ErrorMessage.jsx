import { btnSecondary } from '../../styles.js';

// `error` can be a string or an Error (ApiError may also carry a `details` list).
export default function ErrorMessage({ error, onRetry, onDismiss }) {
  const message = typeof error === 'string' ? error : error?.message ?? 'Something went wrong.';
  const details = typeof error === 'object' && Array.isArray(error?.details) ? error.details : [];

  return (
    <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-medium">{message}</p>
      {details.length > 0 && (
        <ul className="mt-1 list-disc pl-5">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {(onRetry || onDismiss) && (
        <div className="mt-3 flex gap-2">
          {onRetry && (
            <button type="button" onClick={onRetry} className={btnSecondary}>
              Try again
            </button>
          )}
          {onDismiss && (
            <button type="button" onClick={onDismiss} className={btnSecondary}>
              Dismiss
            </button>
          )}
        </div>
      )}
    </div>
  );
}
