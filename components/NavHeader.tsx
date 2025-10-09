import { getCurrentSession } from '@/app/login/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NavThemeToggle from './NavThemeToggle';
import NavSearch from './NavSearch';

export default async function NavHeader() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <header className="navbar navbar-expand-sm d-none d-md-flex d-print-none navbar-transparent pt-2">
      <div className="container-xl">
        <div className="navbar-nav w-100">
          <div className="nav-item w-50">
            <NavSearch />
          </div>
        </div>
        <div className="navbar-nav">
          <NavThemeToggle />
          <li className="nav-item rounded-pill overflow-hidden">
            <Link
              href={`/profile/${user?.id}`}
              className="nav-link d-flex gap-1"
            >
              {user?.name ? (
                <span
                  className="avatar avatar-sm rounded-circle"
                  style={{
                    backgroundImage: `url(https://ui-avatars.com/api/?rounded=true&name=${encodeURI(
                      user?.name ?? ''
                    )})`,
                  }}
                ></span>
              ) : (
                <div className="placeholder-glow">
                  <span className="avatar avatar-sm rounded-circle placeholder"></span>
                </div>
              )}
              {user ? (
                <div className="d-flex flex-column">
                  <div className="text-nowrap">{user?.name}</div>
                  <div className={`rounded-pill ${user?.role === 'admin' ? 'text-bg-primary' : 'text-bg-secondary'} text-capitalize px-2 fs-6 ms-auto`}>
                    {user?.role}
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column placeholder-glow">
                  <div
                    className="placeholder mb-1"
                    style={{ width: 75 }}
                  ></div>
                  <div className="placeholder" style={{ width: 40 }}></div>
                </div>
              )}
            </Link>
          </li>
        </div>
      </div>
    </header>
  );
}
