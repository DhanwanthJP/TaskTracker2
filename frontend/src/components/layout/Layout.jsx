import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Modal from '../common/Modal.jsx';
import ConfirmDialog from '../common/ConfirmDialog.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import TaskForm from '../tasks/TaskForm.jsx';
import TaskDetailsModal from '../tasks/TaskDetailsModal.jsx';
import { ModalContext } from '../../context/ModalContext.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { PAGE_TITLES } from '../../constants.js';

export default function Layout() {
  const { pathname } = useLocation();
  const { tasks, createTask, updateTask, deleteTask, actionError, clearActionError } = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // formTask: undefined = form closed, null = creating a new task, object = editing that task
  const [formTask, setFormTask] = useState(undefined);
  const [detailsId, setDetailsId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const title = PAGE_TITLES[pathname] ?? 'TaskTracker';
  useEffect(() => {
    document.title = `${title} | TaskTracker`;
  }, [title]);

  const modalApi = useMemo(
    () => ({
      openCreate: () => setFormTask(null),
      openEdit: (task) => setFormTask(task),
      openDetails: (task) => setDetailsId(task.id),
      requestDelete: (task) => setDeleteTarget(task),
    }),
    []
  );

  // Look the task up by id so the details dialog always shows the latest data.
  const detailsTask = tasks.find((task) => task.id === detailsId) ?? null;

  const closeForm = () => setFormTask(undefined);

  async function handleFormSubmit(values) {
    if (formTask) await updateTask(formTask.id, values);
    else await createTask(values);
    closeForm();
  }

  async function handleConfirmDelete() {
    await deleteTask(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <ModalContext.Provider value={modalApi}>
      <div className="min-h-screen lg:pl-60">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {actionError && (
            <div className="mb-4">
              <ErrorMessage error={actionError} onDismiss={clearActionError} />
            </div>
          )}
          <Outlet />
        </main>
      </div>

      {formTask !== undefined && (
        <Modal title={formTask ? 'Edit task' : 'Add task'} onClose={closeForm}>
          <TaskForm key={formTask?.id ?? 'new'} task={formTask} onSubmit={handleFormSubmit} onCancel={closeForm} />
        </Modal>
      )}

      {detailsTask && (
        <TaskDetailsModal
          task={detailsTask}
          onClose={() => setDetailsId(null)}
          onEdit={(task) => {
            setDetailsId(null);
            setFormTask(task);
          }}
          onDelete={(task) => {
            setDetailsId(null);
            setDeleteTarget(task);
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          confirmLabel="Delete task"
          danger
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </ModalContext.Provider>
  );
}
