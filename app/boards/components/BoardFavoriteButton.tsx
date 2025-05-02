'use client';

import { updateBoard } from '@/app/boards/lib/actions';
import { HeartFilledIcon, HeartIcon } from '@/components/icons';
import { Board } from '@prisma/client';
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
      {!board.favorite ? <HeartIcon /> : <HeartFilledIcon />}
    </a>
  );
}
