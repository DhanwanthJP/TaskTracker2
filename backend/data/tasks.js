import { dateOffset } from '../utils/dateUtils.js';

// In-memory storage. There is no database: everything resets when the server restarts.
export const tasks = [];

let lastId = 0;
export const getNextId = () => ++lastId;

// Sample data so the dashboard has something to show on first run.
// Start with an empty list instead by running:  SEED_DATA=false npm run dev
const SAMPLE_TASKS = [
  { title: 'Finish React assignment', description: 'Complete the component implementation and routing.', priority: 'High', category: 'Study', due: 0, status: 'in-progress' },
  { title: 'Prepare weekly status report', description: 'Summarise progress for the team meeting.', priority: 'Medium', category: 'Work', due: 0, status: 'todo' },
  { title: 'Pay electricity bill', description: '', priority: 'High', category: 'Personal', due: -2, status: 'todo' },
  { title: 'Write unit tests for the API', description: 'Cover validation and error handling.', priority: 'Medium', category: 'Study', due: -1, status: 'in-progress' },
  { title: 'Review pull requests', description: '', priority: 'Medium', category: 'Work', due: 1, status: 'todo' },
  { title: 'Read Express routing docs', description: 'Focus on Router and error-handling middleware.', priority: 'Low', category: 'Study', due: 3, status: 'todo' },
  { title: 'Book dentist appointment', description: '', priority: 'Low', category: 'Personal', due: null, status: 'todo' },
  { title: 'Set up project repository', description: 'Create the repo and add a README.', priority: 'High', category: 'Work', due: -5, status: 'done' },
  { title: 'Plan weekend trip', description: 'Pick a destination and check train times.', priority: 'Low', category: 'Other', due: 7, status: 'todo' },
];

function seed() {
  const now = Date.now();
  SAMPLE_TASKS.forEach((sample, i) => {
    // Stagger timestamps so "recently updated" has a sensible order.
    const stamp = new Date(now - (SAMPLE_TASKS.length - i) * 60 * 60 * 1000).toISOString();
    tasks.push({
      id: getNextId(),
      title: sample.title,
      description: sample.description,
      priority: sample.priority,
      category: sample.category,
      dueDate: sample.due === null ? null : dateOffset(sample.due),
      status: sample.status,
      completed: sample.status === 'done',
      createdAt: stamp,
      updatedAt: stamp,
    });
  });
}

if (process.env.SEED_DATA !== 'false') seed();
