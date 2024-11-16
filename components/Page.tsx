import { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return <div className="page">{children}</div>;
}
