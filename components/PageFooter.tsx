import PageFooterSponsor from './PageFooterSponsor';

export default function PageFooter() {
  const showSponsor =
    !process.env.NEXT_PUBLIC_SHOW_SPONSOR ||
    process.env.NEXT_PUBLIC_SHOW_SPONSOR === 'true';
  return showSponsor ? (
    <PageFooterSponsor />
  ) : (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a
                  href="https://github.com/DavidArtifacts/daylog-next"
                  className="link-secondary"
                >
                  daylog
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/DavidArtifacts/daylog-next/releases"
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
