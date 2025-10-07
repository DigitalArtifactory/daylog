import { getCurrentSession } from '@/app/login/lib/actions';
import { redirect } from 'next/navigation';
import NavBar from './NavBar';
import Link from 'next/link';
import Image from 'next/image';
import MobileNavMenu from './MobileNavMenu';
import NavThemeToggle from './NavThemeToggle';

export default async function NavMenu() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <>
      <aside className="navbar navbar-vertical navbar-expand-sm d-print-none">
        <div className="container-fluid">
          <h1 className="navbar-brand navbar-brand-autodark my-1">
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
          <div className="navbar-nav ms-auto d-flex d-md-none justify-content-center me-4">
            <NavThemeToggle />
          </div>
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
      </aside>
      <MobileNavMenu user={user} />
    </>
  );
}
