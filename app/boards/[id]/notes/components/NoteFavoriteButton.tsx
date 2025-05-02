'use client';

import { HeartFilledIcon, HeartIcon } from '@/components/icons';
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
      {!note.favorite ? <HeartIcon /> : <HeartFilledIcon />}
    </a>
  );
}
