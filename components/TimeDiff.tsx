'use client';
import { useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';

type TimeDiffType = {
  updatedAt: Date;
};

export default function TimeDiff({ updatedAt }: TimeDiffType) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <TimeAgo datetime={updatedAt}></TimeAgo> : <div className='placeholder'></div>;
}
