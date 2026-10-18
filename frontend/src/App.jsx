import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext.jsx';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AllTasks from './pages/AllTasks.jsx';
import MyDay from './pages/MyDay.jsx';
import KanbanBoard from './pages/KanbanBoard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<AllTasks />} />
          <Route path="my-day" element={<MyDay />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TaskProvider>
  );
}
