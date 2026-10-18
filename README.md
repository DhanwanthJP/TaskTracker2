# TaskTracker: Personal Productivity Dashboard

A full-stack task manager built with **React + Vite + Tailwind CSS** (frontend) and **Node.js + Express** (backend).
Tasks live in an in-memory array on the server. There is no database, so **all changes reset when the backend restarts**.

## Prerequisites

- Node.js **22 LTS** or newer (Vite 7 needs Node 20.19+ or 22.12+)
- npm (installed together with Node)

## Run it locally

Open **two terminal windows**.

**Terminal 1: backend (http://localhost:4000)**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2: frontend (http://localhost:5173)**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

The Vite dev server forwards every `/api` request to the Express server, so no extra configuration is needed.

## Project structure

```
tasktracker/
├── backend/
│   ├── app.js                     Express setup, CORS, JSON parsing, error handling
│   ├── routes/                    taskRoutes.js, dashboardRoutes.js
│   ├── controllers/               taskController.js, dashboardController.js
│   ├── data/tasks.js              In-memory task array (+ sample data)
│   ├── middleware/errorHandler.js 404 handler and central error handler
│   └── utils/                     validators.js, dateUtils.js, HttpError.js
└── frontend/
    ├── vite.config.js             React + Tailwind plugins and the /api proxy
    └── src/
        ├── components/
        │   ├── layout/            Layout, Sidebar, Header, SearchBar
        │   ├── dashboard/         StatCard, ProgressBar
        │   ├── tasks/             TaskCard, TaskList, TaskForm, FilterPanel, ViewSwitcher,
        │   │                      KanbanBoard, TaskDetailsModal
        │   └── common/            Modal, ConfirmDialog, EmptyState, LoadingSpinner,
        │                          ErrorMessage, Badges
        ├── pages/                 Dashboard, AllTasks, MyDay, KanbanBoard, NotFound
        ├── context/               TaskContext (data + actions), ModalContext (dialogs)
        ├── services/taskApi.js    All fetch() calls to the API
        └── utils/                 dates.js, filterTasks.js
```

## REST API

| Method | Endpoint                  | Purpose                                      |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/api/tasks`              | List all tasks                               |
| GET    | `/api/tasks/:id`          | Get one task                                 |
| POST   | `/api/tasks`              | Create a task (status starts as `todo`)      |
| PUT    | `/api/tasks/:id`          | Update title, description, priority, category, due date |
| PATCH  | `/api/tasks/:id/status`   | Change status: `todo`, `in-progress`, `done` |
| DELETE | `/api/tasks/:id`          | Delete a task (204 No Content)               |
| GET    | `/api/dashboard/stats`    | Totals, completion %, overdue, due today, recent |

Errors are returned as JSON: `{ "error": "message", "details": ["..."] }` with status 400 (validation, bad id, invalid JSON),
404 (unknown task or route) or 500 (unexpected error).

Try it with curl:

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete React assignment","description":"Finish component implementation","priority":"High","category":"Study","dueDate":"2026-10-20"}'

curl -X PATCH http://localhost:4000/api/tasks/1/status \
  -H "Content-Type: application/json" -d '{"status":"done"}'
```

## Useful options

- **Start with no sample tasks:** `SEED_DATA=false npm run dev` (in `backend/`)
- **Change the API port:** `PORT=4001 npm run dev`, then update the proxy target in `frontend/vite.config.js`
- **Production build of the frontend:** `npm run build` in `frontend/` (output in `frontend/dist`)

## Design notes

- `completed` is derived from `status`: a task is completed exactly when its status is `done`.
- Dashboard statistics are calculated from the task array on every request; there are no separate counters.
- Search, filters, sort and the List/Kanban view are stored in the URL (`/tasks?q=java&category=Study&view=kanban`).
- The design is intentionally plain with no animations. The loading indicator is static; add `animate-spin` in
  `LoadingSpinner.jsx` if you want it to spin.
- Kanban drag-and-drop uses the browser's built-in API. The arrow buttons under each card work with keyboard and touch.

## Not included yet

- **Calendar view** (listed in the requirements as a later extension). Add it as a third option in `ViewSwitcher.jsx`.
