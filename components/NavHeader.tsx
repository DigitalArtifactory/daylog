'use client';

import signout from '@/app/lib/actions';
import { getCurrentSession } from '@/app/login/lib/actions';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function NavHeader() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loadUser = async () => {
      const { user } = await getCurrentSession();

      if (user !== null) {
        setUser(user);
      }
    };

    loadUser();
  }, []);

  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none">
      <div className="container-xl">
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href="/">
            <img
              src="/logo.svg"
              width="110"
              height="32"
              alt="daylog"
              className="navbar-brand-image"
            />
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <li className="nav-item dropdown">
            <a
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
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href={`/profile/${user?.id}`}>
                  Profile
                </a>
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
