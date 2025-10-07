import { PropsWithChildren } from 'react';

export default async function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="page-wrapper">{children}</div>
  );
}
