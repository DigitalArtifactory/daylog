'use client';

import { redirect } from 'next/navigation';
import { setUserBoardsSort } from '../lib/actions';

export default function BoardSortSelector({
  sortingParam,
}: {
  sortingParam?: string;
}) {
  return (
    <select
      className="form-select"
      aria-label="Sort boards"
      defaultValue={sortingParam || 'created_desc'}
      onChange={async (e) => {
        const sort = e.target.value;
        if (sort) {
          await setUserBoardsSort(sort);
          redirect(`/boards?sort=${sort}`);
        } else {
          redirect('/boards');
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
