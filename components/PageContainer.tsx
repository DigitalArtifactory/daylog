import { PropsWithChildren } from 'react';

export default async function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="container-xl">
      <div className="page-wrapper">{children}</div>
    </div>
  );
}
