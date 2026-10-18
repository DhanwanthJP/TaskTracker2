import { isValidDateString } from './dateUtils.js';

export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Work', 'Personal', 'Study', 'Other'];
export const STATUSES = ['todo', 'in-progress', 'done'];

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// Validates the editable fields of a task (used by POST and PUT).
// Returns { errors: string[], value: cleanedFields }.
export function validateTaskInput(body) {
  if (!isPlainObject(body)) {
    return { errors: ['Request body must be a JSON object'], value: null };
  }

  const errors = [];

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) errors.push('title is required');
  else if (title.length > 100) errors.push('title must be 100 characters or fewer');

  let description = '';
  if (body.description !== undefined && body.description !== null) {
    if (typeof body.description !== 'string') {
      errors.push('description must be a string');
    } else if (body.description.trim().length > 500) {
      errors.push('description must be 500 characters or fewer');
    } else {
      description = body.description.trim();
    }
  }

  if (!PRIORITIES.includes(body.priority)) {
    errors.push(`priority must be one of: ${PRIORITIES.join(', ')}`);
  }
  if (!CATEGORIES.includes(body.category)) {
    errors.push(`category must be one of: ${CATEGORIES.join(', ')}`);
  }

  let dueDate = null;
  if (body.dueDate !== undefined && body.dueDate !== null && body.dueDate !== '') {
    if (isValidDateString(body.dueDate)) dueDate = body.dueDate;
    else errors.push('dueDate must be a valid date in YYYY-MM-DD format');
  }

  return {
    errors,
    value: { title, description, priority: body.priority, category: body.category, dueDate },
  };
}

// Validates the body of PATCH /api/tasks/:id/status.
export function validateStatusInput(body) {
  if (!isPlainObject(body)) {
    return { errors: ['Request body must be a JSON object'], value: null };
  }
  if (!STATUSES.includes(body.status)) {
    return { errors: [`status must be one of: ${STATUSES.join(', ')}`], value: null };
  }
  return { errors: [], value: body.status };
}
