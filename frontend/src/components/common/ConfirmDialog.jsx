import { useState } from 'react';
import Modal from './Modal.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { btnDanger, btnPrimary, btnSecondary } from '../../styles.js';

// Asks the user to confirm an action. `onConfirm` may be async; if it throws, the error is shown here.
export default function ConfirmDialog({ title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleConfirm() {
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-slate-700">{message}</p>
      {error && (
        <div className="mt-3">
          <ErrorMessage error={error} />
        </div>
      )}
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={btnSecondary} disabled={busy}>
          Cancel
        </button>
        <button type="button" onClick={handleConfirm} className={danger ? btnDanger : btnPrimary} disabled={busy}>
          {busy ? 'Working…' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
