'use client';

import '@github/relative-time-element';
import { useEffect, useRef } from 'react';

type TimeDiffType = {
  updatedAt: Date;
};

export default function TimeDiff({ updatedAt }: TimeDiffType) {
  const relativeTimeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (relativeTimeRef.current) {
      relativeTimeRef.current.setAttribute('datetime', updatedAt.toISOString());
    }
  }, [updatedAt, relativeTimeRef]);

  // @ts-expect-error: relative-time is a web component
  return <relative-time ref={relativeTimeRef}></relative-time>;
}
