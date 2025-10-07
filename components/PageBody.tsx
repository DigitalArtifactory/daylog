'use client';

import { PropsWithChildren } from 'react';

export default function PageBody({ children }: PropsWithChildren) {
  return (
    <div className="page-body mt-0">
      <div className="container-xl">{children}</div>
    </div>
  );
}
