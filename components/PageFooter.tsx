export default function PageFooter() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a
                  href="https://tabler.io/docs"
                  target="_blank"
                  className="link-secondary"
                  rel="noopener"
                >
                  Documentation
                </a>
              </li>
              <li className="list-inline-item">
                <a href="./license.html" className="link-secondary">
                  License
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/tabler/tabler"
                  target="_blank"
                  className="link-secondary"
                  rel="noopener"
                >
                  Source code
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/sponsors/codecalm"
                  target="_blank"
                  className="link-secondary"
                  rel="noopener"
                >
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
                    className="icon text-pink icon-filled icon-inline"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                  </svg>
                  Sponsor
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright © 2024
                <a href="." className="link-secondary">
                  {' '}
                  Digital Artifactory
                </a>
                . Released under the AGPL-v3 License.
              </li>
              <li className="list-inline-item">
                <a
                  href="./changelog.html"
                  className="link-secondary"
                  rel="noopener"
                >
                  v1.0.0-beta1
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
