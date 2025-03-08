import { PropsWithChildren } from 'react';

type PageHeader = {
  preTitle: string;
  title?: string | null;
};

export default async function PageHeader({
  ...props
}: PropsWithChildren<PageHeader>) {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="page-pretitle">{props.preTitle}</h1>
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
