import { signout } from '@/app/lib/actions';
import { getCurrentSession } from '@/app/login/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NavThemeToggle from './NavThemeToggle';

export default async function NavHeader() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none">
      <div className="container-xl">
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <Link href="/">
            <Image
              src="/daylog.svg"
              alt="daylog"
              width="0"
              height="0"
              className="navbar-brand-image"
              style={{ width: '110px', height: 'auto' }}
              priority={true}
            />
          </Link>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <NavThemeToggle />
          <li className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link dropdown-toggle d-flex lh-1 text-reset p-0"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href={`/profile/${user?.id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <form action={signout}>
                  <button className="dropdown-item">Sign out</button>
                </form>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </header>
  );
}
