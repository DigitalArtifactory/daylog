'use client';

import { redirect } from 'next/navigation';
import { setUserNotesSort } from '../lib/actions';

export default function NoteSortSelector({
  sortingParam,
  boardId,
}: {
  sortingParam?: string;
  boardId: number;
}) {
  return (
    <select
      className="form-select"
      aria-label="Sort boards"
      defaultValue={sortingParam || 'created_desc'}
      onChange={async (e) => {
        const sort = e.target.value;
        if (sort) {
          await setUserNotesSort(sort);
          redirect(`/boards/${boardId}/notes?sort=${sort}`);
        } else {
          redirect('/boards/${boardId}/notes');
        }
      }}
    >
      <option value="created_desc">Created: Newest First</option>
      <option value="created_asc">Created: Oldest First</option>
      <option value="updated_desc">Updated: Newest First</option>
      <option value="updated_asc">Updated: Oldest First</option>
      <option value="title_asc">Title: A-Z</option>
      <option value="title_desc">Title: Z-A</option>
    </select>
  );
}
