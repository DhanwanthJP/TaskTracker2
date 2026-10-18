import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tasks', label: 'All Tasks' },
  { to: '/my-day', label: 'My Day' },
  { to: '/kanban', label: 'Kanban Board' },
];

// Fixed on large screens; on smaller screens it opens as a drawer from the Menu button.
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 border-r border-slate-200 bg-white ${
          open ? 'block' : 'hidden'
        } lg:block`}
      >
        <div className="border-b border-slate-200 px-5 py-4 text-lg font-semibold text-slate-900">TaskTracker</div>
        <nav aria-label="Main" className="space-y-1 p-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
