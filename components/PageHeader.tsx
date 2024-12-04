import { PropsWithChildren } from 'react';

type PageHeader = {
  preTitle: string;
  title?: string | null;
};

export default function PageHeader({
  ...props
}: PropsWithChildren<PageHeader>) {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <div className="page-pretitle">{props.preTitle}</div>
          <h2 className="page-title">
            {props.title ?? (
              <div className='text-secondary'>
                Loading<span className="animated-dots"></span>
              </div>
            )}
          </h2>
        </div>
        <div className="col-auto ms-auto">{props.children}</div>
      </div>
    </div>
  );
}
