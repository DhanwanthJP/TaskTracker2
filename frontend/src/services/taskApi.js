// All communication with the Express API lives here.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Cannot reach the server. Check your connection and that the backend is running.', 0);
  }

  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The response had no JSON body (for example, the proxy could not reach the backend).
  }

  if (!response.ok) {
    const fallback =
      response.status >= 500
        ? 'The server is not responding. Make sure the backend is running on port 4000.'
        : `Request failed (${response.status}).`;
    throw new ApiError(data?.error || fallback, response.status, data?.details);
  }
  return data;
}

export const getTasks = () => request('/tasks');
export const getTask = (id) => request(`/tasks/${id}`);
export const createTask = (task) => request('/tasks', { method: 'POST', body: task });
export const updateTask = (id, task) => request(`/tasks/${id}`, { method: 'PUT', body: task });
export const updateTaskStatus = (id, status) =>
  request(`/tasks/${id}/status`, { method: 'PATCH', body: { status } });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
export const getDashboardStats = () => request('/dashboard/stats');
