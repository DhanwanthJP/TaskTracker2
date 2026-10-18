import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState.jsx';
import { btnPrimary } from '../styles.js';

export default function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      message="The page you are looking for does not exist."
      action={
        <Link to="/" className={btnPrimary}>
          Go to dashboard
        </Link>
      }
    />
  );
}
