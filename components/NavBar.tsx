'use client';

import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavSearch from './NavSearch';
import { AdminUserIcon, BoardIcon, HomeIcon, UserIcon } from './icons';

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
          <Link
            className={`nav-link ${
              homePattern.test(path) ? 'active text-primary' : ''
            }`}
            href="/"
          >
            <span
              className={`nav-link-icon d-md-none d-lg-inline-block ${
                homePattern.test(path) ? 'text-primary' : ''
              }`}
            >
              <HomeIcon />
            </span>
            <span className="nav-link-title">Home</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            boardPattern.test(path) || notePattern.test(path)
              ? 'active text-primary'
              : ''
          }`}
        >
          <Link
            className={`nav-link ${
              boardPattern.test(path) || notePattern.test(path)
                ? 'active text-primary'
                : ''
            }`}
            href="/boards"
          >
            <span
              className={`nav-link-icon d-md-none d-lg-inline-block ${
                boardPattern.test(path) || notePattern.test(path)
                  ? 'text-primary'
                  : ''
              }`}
            >
              <BoardIcon />
            </span>
            <span className="nav-link-title">Boards</span>
          </Link>
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
            <span
              className={`nav-link-icon d-md-none d-lg-inline-block ${
                profilePattern.test(path) ? 'text-primary' : ''
              }`}
            >
              <UserIcon />
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
              <span
                className={`nav-link-icon d-md-none d-lg-inline-block ${
                  adminPattern.test(path) ? 'text-primary' : ''
                }`}
              >
                <AdminUserIcon />
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
