import { PropsWithChildren } from 'react';

export default function PageBody({ children }: PropsWithChildren) {
  return (
    <div className="page-body">
      <div className="container-xl">{children}</div>
    </div>
  );
}
