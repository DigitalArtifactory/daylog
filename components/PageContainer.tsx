import { PropsWithChildren } from 'react';

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="container-xl">
      <div className="page-wrapper">{children}</div>
    </div>
  );
}
