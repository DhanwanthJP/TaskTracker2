import { tasks, getNextId } from '../data/tasks.js';
import { validateTaskInput, validateStatusInput } from '../utils/validators.js';
import { HttpError } from '../utils/HttpError.js';

// Finds a task's position in the array or throws 400 / 404.
function findTaskIndex(idParam) {
  if (!/^\d+$/.test(idParam)) throw new HttpError(400, 'Task id must be a number');
  const id = Number(idParam);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) throw new HttpError(404, `Task ${id} not found`);
  return index;
}

export function getAllTasks(req, res) {
  res.json(tasks);
}

export function getTaskById(req, res) {
  res.json(tasks[findTaskIndex(req.params.id)]);
}

export function createTask(req, res) {
  const { errors, value } = validateTaskInput(req.body);
  if (errors.length) throw new HttpError(400, 'Validation failed', errors);

  const now = new Date().toISOString();
  const task = {
    id: getNextId(),
    ...value,
    status: 'todo',
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  res.status(201).json(task);
}

// PUT updates the editable details only. Workflow status changes go through PATCH.
export function updateTask(req, res) {
  const index = findTaskIndex(req.params.id);
  const { errors, value } = validateTaskInput(req.body);
  if (errors.length) throw new HttpError(400, 'Validation failed', errors);

  tasks[index] = { ...tasks[index], ...value, updatedAt: new Date().toISOString() };
  res.json(tasks[index]);
}

export function updateTaskStatus(req, res) {
  const index = findTaskIndex(req.params.id);
  const { errors, value: status } = validateStatusInput(req.body);
  if (errors.length) throw new HttpError(400, 'Validation failed', errors);

  tasks[index] = {
    ...tasks[index],
    status,
    completed: status === 'done', // keep `completed` in sync with the workflow status
    updatedAt: new Date().toISOString(),
  };
  res.json(tasks[index]);
}

export function deleteTask(req, res) {
  const index = findTaskIndex(req.params.id);
  tasks.splice(index, 1);
  res.status(204).end();
}
