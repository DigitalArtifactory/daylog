'use client';
import TimeAgo from 'timeago-react';

type TimeDiffType = {
  updatedAt: Date;
};

export default function TimeDiff({ updatedAt }: TimeDiffType) {
  return <TimeAgo datetime={updatedAt}></TimeAgo>;
}
