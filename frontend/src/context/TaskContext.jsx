import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as taskApi from '../services/taskApi.js';

const TaskContext = createContext(null);

// Holds the task list for the whole app and the functions that change it.
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await taskApi.getTasks());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // create / update / delete throw on failure so the form or dialog can show the error.
  const createTask = useCallback(async (values) => {
    const created = await taskApi.createTask(values);
    setTasks((prev) => [...prev, created]);
    return created;
  }, []);

  const updateTask = useCallback(async (id, values) => {
    const updated = await taskApi.updateTask(id, values);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    return updated;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Status changes come from buttons and drag-and-drop, so failures go to a page-level banner.
  const changeStatus = useCallback(async (id, status) => {
    setActionError(null);
    try {
      const updated = await taskApi.updateTaskStatus(id, status);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      setActionError(err);
    }
  }, []);

  const clearActionError = useCallback(() => setActionError(null), []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      actionError,
      loadTasks,
      createTask,
      updateTask,
      deleteTask,
      changeStatus,
      clearActionError,
    }),
    [tasks, loading, error, actionError, loadTasks, createTask, updateTask, deleteTask, changeStatus, clearActionError]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside <TaskProvider>');
  return context;
}
