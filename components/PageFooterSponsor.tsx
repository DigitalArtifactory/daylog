import getVersion from '@/app/lib/version';
import { GitHubIcon, HeartFilledIcon } from './icons';
import CupIcon from './icons/CupIcon';
import { useTranslations } from 'next-intl';

export default function PageFooterSponsor() {
  const t = useTranslations('footer');

  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                {t.rich('sourceCode', {
                  icon: () => <GitHubIcon />,
                  link: (chunks) => (
                    <a
                      href="https://github.com/DigitalArtifactory/daylog"
                      target="_blank"
                      rel="noopener"
                      className="link-secondary"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </li>
              <li className="list-inline-item">
                {t.rich('buyMeCoffee', {
                  icon: () => <CupIcon />,
                  link: (chunks) => (
                    <a
                      href="https://buymeacoffee.com/davidartifacts"
                      target="_blank"
                      rel="noopener"
                      className="link-secondary"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                {t.rich('madeWithBy', {
                  icon: () => <HeartFilledIcon />,
                  link: (chunks) => (
                    <a
                      href="https://github.com/DavidArtifacts"
                      className="link-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chunks}
                    </a>
                  ),
                })}
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
