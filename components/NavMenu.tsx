'use client';

import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const path = usePathname();

  const adminPattern = /^\/admin\/?$/;
  const homePattern = /^\/boards\/?$/;
  const profilePattern = /^\/profile\/?$/;
  const boardPattern = /^\/boards\/[a-zA-Z0-9_-]+\/notes$/;
  const notePattern = /^\/boards\/[a-zA-Z0-9_-]+\/notes\/[a-zA-Z0-9_-]+$/;

  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {homePattern.test(path) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#new-board-modal"
                      >
                        New board
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {boardPattern.test(path) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#new-board-modal"
                      >
                        New note
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {notePattern.test(path) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">Save changes</button>
                    </li>
                  </ul>
                </li>
              )}
              {profilePattern.test(path) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">Save changes</button>
                    </li>
                  </ul>
                </li>
              )}
              {adminPattern.test(path) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">Save changes</button>
                    </li>
                  </ul>
                </li>
              )}
              <li
                className={`nav-item ${
                  homePattern.test(path) ||
                  boardPattern.test(path) ||
                  notePattern.test(path)
                    ? 'active'
                    : ''
                }`}
              >
                <a
                  className={`nav-link ${
                    homePattern.test(path) ||
                    boardPattern.test(path) ||
                    notePattern.test(path)
                      ? 'active'
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                      <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                      <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                      <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Home</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  profilePattern.test(path) ? 'active' : ''
                }`}
              >
                <a
                  className={`nav-link ${
                    profilePattern.test(path) ? 'active' : ''
                  }`}
                  href="/profile"
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user"
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
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li
                className={`nav-item ${
                  adminPattern.test(path) ? 'active' : ''
                }`}
              >
                <a
                  className={`nav-link ${
                    adminPattern.test(path) ? 'active' : ''
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield"
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
            <form className="d-flex" role="search">
              <div className="input-icon">
                <input
                  type="text"
                  value=""
                  className="form-control form-control-rounded"
                  placeholder="Search…"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <span className="input-icon-addon">
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
