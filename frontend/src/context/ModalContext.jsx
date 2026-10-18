import { createContext, useContext } from 'react';

// Lets any component open the create/edit form, the details dialog or the delete confirmation.
// The Layout component owns the state and renders the dialogs.
export const ModalContext = createContext(null);

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModals must be used inside <Layout>');
  return context;
}
