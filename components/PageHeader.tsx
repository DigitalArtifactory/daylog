import { PropsWithChildren } from 'react';

type PageHeader = {
  preTitle: string;
  title: string;
}

export default function PageHeader({ ...props }: PropsWithChildren<PageHeader>) {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <div className="page-pretitle">{props.preTitle}</div>
          <h2 className="page-title">{props.title}</h2>
        </div>
        <div className="col-auto ms-auto">{props.children}</div>
      </div>
    </div>
  );
}
