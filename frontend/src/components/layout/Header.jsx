import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import { useModals } from '../../context/ModalContext.jsx';
import { btnPrimary, btnSecondary } from '../../styles.js';

// The search text lives in the URL (?q=...) so the header and the All Tasks page always agree.
export default function Header({ title, onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { openCreate } = useModals();

  const onTasksPage = pathname === '/tasks';
  const searchText = onTasksPage ? params.get('q') ?? '' : '';

  function handleSearch(text) {
    // Keep the other filters when already on All Tasks; otherwise jump there.
    const next = new URLSearchParams(onTasksPage ? params : undefined);
    if (text) next.set('q', text);
    else next.delete('q');
    const search = next.toString();
    navigate({ pathname: '/tasks', search: search ? `?${search}` : '' }, { replace: onTasksPage });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <button type="button" onClick={onMenuClick} className={`${btnSecondary} lg:hidden`} aria-label="Open navigation menu">
          Menu
        </button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        <div className="order-last w-full sm:order-none sm:ml-auto sm:w-72">
          <SearchBar value={searchText} onChange={handleSearch} />
        </div>
        <button type="button" onClick={openCreate} className={`${btnPrimary} ml-auto sm:ml-0`}>
          Add Task
        </button>
      </div>
    </header>
  );
}
