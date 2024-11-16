export default function Header() {
  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none">
      <div className="container-xl">
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href="#">
            <img
              src="/logo.svg"
              width="110"
              height="32"
              alt="Tabler"
              className="navbar-brand-image"
            />
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0">
              <span
                className="avatar avatar-sm rounded-circle"
                style={{
                  backgroundImage:
                    'url(https://ui-avatars.com/api/?rounded=true&name=David+R)',
                }}
              ></span>
              <div className="d-none d-xl-block ps-2">
                <div>David R.</div>
                <div className="mt-1 small text-secondary">Web Developer</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
