'use client';

import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { updateNote } from '../lib/actions';

type NoteFavoriteButtonType = {
  note: Note;
};

export default function NoteFavoriteButton({ note }: NoteFavoriteButtonType) {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    note.favorite = !note.favorite;
    await updateNote(note);
    router.refresh();
  };

  return (
    <a
      href="#"
      onClick={() => handleFavoriteClick()}
      className="icon ms-3 text-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </svg>
    </a>
  );
}
