import { PropsWithChildren } from 'react';

export default async function PageBody({ children }: PropsWithChildren) {
  return (
    <div className="page-body">
      <div className="container-xl">{children}</div>
    </div>
  );
}
