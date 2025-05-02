import getVersion from '@/app/lib/version';
import { GitHubIcon, HeartFilledIcon } from './icons';
import CupIcon from './icons/CupIcon';

export default function PageFooterSponsor() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a
                  href="https://github.com/DigitalArtifactory/daylog"
                  target="_blank"
                  className="link-secondary"
                  rel="noopener"
                >
                  <GitHubIcon /> Source code
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://buymeacoffee.com/davidartifacts"
                  target="_blank"
                  className="link-secondary"
                  rel="noopener"
                >
                  <CupIcon /> Buy me a Coffee
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Made with <HeartFilledIcon /> by{' '}
                <a
                  href="https://github.com/DavidArtifacts"
                  className="link-secondary"
                >
                  DavidArtifacts
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/DigitalArtifactory/daylog/releases"
                  className="link-secondary"
                  rel="noopener"
                >
                  {getVersion()}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
