import { getCurrentSession } from '@/app/login/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NavThemeToggle from './NavThemeToggle';
import NavSearch from './NavSearch';
import SignOutButton from './SignOutButton';

export default async function NavHeader() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <header className="navbar navbar-expand-sm d-none d-lg-flex d-print-none navbar-transparent pt-2">
      <div className="container-xl">
        <div className="navbar-nav">
          <div className='nav-item'>
            <NavSearch />
          </div>
        </div>
        <div className="navbar-nav">
          <NavThemeToggle />
          <li className="nav-item">
            <Link
              href={`/profile/${user?.id}`}
              className="nav-link d-flex lh-1 text-reset p-0"
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
              <div className="d-none d-xl-block ps-2">
                {user ? (
                  <>
                    <div>{user?.name}</div>
                    <div className="mt-1 small text-secondary text-capitalize">
                      {user?.role}
                    </div>{' '}
                  </>
                ) : (
                  <div className="d-flex flex-column placeholder-glow">
                    <div
                      className="placeholder mb-1"
                      style={{ width: 75 }}
                    ></div>
                    <div className="placeholder" style={{ width: 40 }}></div>
                  </div>
                )}
              </div>
            </Link>
          </li>
          <li className='nav-item ps-3'>
            <SignOutButton />
          </li>
        </div>
      </div>
    </header>
  );
}
