'use client';

import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import NavSearch from './NavSearch';

export default function NavBar({ user }: { user: User }) {
  const path = usePathname();
  const adminPattern = /^\/admin\/?$/;
  const homePattern = /^\/$/;
  const profilePattern = /^\/profile\/[a-zA-Z0-9_-]+\/?$/;
  const boardPattern = /^\/boards(\/[a-zA-Z0-9_-]+)?\/?$/;
  const notePattern = /^\/boards\/[a-zA-Z0-9_-]+\/notes(\/[a-zA-Z0-9_-]+)?\/?$/;

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li
          className={`nav-item ${
            homePattern.test(path) ? 'active text-primary' : ''
          }`}
        >
          <a
            className={`nav-link ${
              homePattern.test(path) ? 'active text-primary' : ''
            }`}
            href="/"
          >
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`icon icon-tabler ${
                  homePattern.test(path) ? 'text-primary' : ''
                } icons-tabler-outline icon-tabler-home`}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
            </span>
            <span className="nav-link-title">Home</span>
          </a>
        </li>
        <li
          className={`nav-item ${
            boardPattern.test(path) || notePattern.test(path)
              ? 'active text-primary'
              : ''
          }`}
        >
          <a
            className={`nav-link ${
              boardPattern.test(path) || notePattern.test(path)
                ? 'active text-primary'
                : ''
            }`}
            href="/boards"
          >
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`icon icon-tabler ${
                  boardPattern.test(path) || notePattern.test(path)
                    ? 'text-primary'
                    : ''
                } icons-tabler-outline icon-tabler-layout-dashboard`}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
              </svg>
            </span>
            <span className="nav-link-title">Boards</span>
          </a>
        </li>
        <li
          className={`nav-item ${
            profilePattern.test(path) ? 'active text-primary' : ''
          }`}
        >
          <a
            className={`nav-link ${
              profilePattern.test(path) ? 'active text-primary' : ''
            }`}
            href={`/profile/${user?.id}`}
          >
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`icon icon-tabler ${
                  profilePattern.test(path) ? 'text-primary' : ''
                } icons-tabler-outline icon-tabler-user`}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            <span className="nav-link-title">Profile</span>
          </a>
        </li>
      </ul>
      {user?.role === 'admin' && (
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li
            className={`nav-item ${
              adminPattern.test(path) ? 'active text-primary' : ''
            }`}
          >
            <a
              className={`nav-link ${
                adminPattern.test(path) ? 'active text-primary' : ''
              }`}
              href="/admin"
            >
              <span className="nav-link-icon d-md-none d-lg-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`icon icon-tabler ${
                    adminPattern.test(path) ? 'text-primary' : ''
                  } icons-tabler-outline icon-tabler-user-shield`}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
                  <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                </svg>
              </span>
              <span className="nav-link-title">Admin</span>
            </a>
          </li>
        </ul>
      )}
      <NavSearch />
    </div>
  );
}
