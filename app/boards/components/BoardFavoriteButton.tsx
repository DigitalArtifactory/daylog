'use client';

import { updateBoard } from '@/app/boards/lib/actions';
import { Board } from '@/prisma/generated/client';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type BoardFavoriteButtonType = {
  board: Board;
};

export default function BoardFavoriteButton({
  board,
}: BoardFavoriteButtonType) {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    board.favorite = !board.favorite;
    await updateBoard(board);
    router.refresh();
  };

  return (
    <a
      href="#"
      onClick={() => handleFavoriteClick()}
      className="icon ms-3 text-danger"
    >
      {!board.favorite ? (
        <IconHeart />
      ) : (
        <IconHeartFilled data-testid="filled-heart" />
      )}
    </a>
  );
}
