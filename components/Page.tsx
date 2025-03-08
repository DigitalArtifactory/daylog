import { PropsWithChildren } from 'react';

export default async function Page({ children }: PropsWithChildren) {
  return <div className="page">{children}</div>;
}
