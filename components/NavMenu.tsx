import { getCurrentSession } from '@/app/login/lib/actions';
import { redirect } from 'next/navigation';
import NavBar from './NavBar';

export default async function NavMenu() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none sticky-top">
      <div className="container-xl">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavBar user={user} />
        </div>
      </div>
    </header>
  );
}
