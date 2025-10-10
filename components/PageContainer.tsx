import { PropsWithChildren } from 'react';
import Template from './Template';

export default async function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="page-wrapper">
      <Template>{children}</Template>
    </div>
  );
}
