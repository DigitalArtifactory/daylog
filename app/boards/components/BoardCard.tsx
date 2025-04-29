import { getSettings } from '@/app/admin/lib/actions';
import { getBoard } from '@/app/boards/lib/actions';
import { stringToColor } from '@/utils/color';
import { getImageUrlOrFile } from '@/utils/image';
import { truncateWord } from '@/utils/text';
import Image from 'next/image';
import Link from 'next/link';
import TimeDiff from '../../../components/TimeDiff';
import BoardFavoriteButton from './BoardFavoriteButton';
import BoardModalDelete from './BoardModalDelete';
import BoardModalForm from './BoardModalForm';

export type BoardCardType = {
  boardId: number;
};

export default async function BoardCard({ boardId }: BoardCardType) {
  const board = await getBoard(boardId);
  if (!board) {
    return <></>;
  }

  const settings = await getSettings();

  function setBackgroundImage(str: string): string {
    const color = stringToColor(str);
    return color;
  }

  return (
    <div className="card d-flex flex-column" style={{ overflow: 'clip' }}>
      {board?.imageUrl ? (
        <Link className="ratio ratio-21x9" href={`/boards/${board.id}/notes`}>
          <Image
            width={800}
            height={600}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            className="w-100 img-fluid"
            src={getImageUrlOrFile(board.imageUrl)}
            alt={`Image of ${board.title}`}
            priority={false}
          ></Image>
        </Link>
      ) : (
        <Link
          data-testid={`board-${board.id}`}
          className="ratio ratio-21x9"
          href={`/boards/${board.id}/notes`}
          style={{ backgroundColor: setBackgroundImage(board.title) }}
        ></Link>
      )}
      <div
        className="position-absolute card-body d-flex flex-column w-full h-full"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(20, 20, 20, 0.3))',
          pointerEvents: 'none',
        }}
      >
        <h3 className="card-title text-white">
          {truncateWord(board.title, 35)}
        </h3>
        <div className="text-light line-clamp-2">{board.description}</div>
        <div className="d-flex align-items-center justify-content-between pt-4 mt-auto">
          <div className="text-light">
            <TimeDiff updatedAt={board?.updatedAt} />
          </div>
          <div className="d-block" style={{ pointerEvents: 'all' }}>
            <a
              href="#"
              className="icon ms-3 text-light"
              data-bs-toggle="modal"
              data-bs-target={`#edit-board-modal-${board.id}}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </a>
            <BoardModalForm
              board={board}
              modalId={`edit-board-modal-${board.id}}`}
              mode="update"
              isUnsplashAllowed={settings?.allowUnsplash}
            ></BoardModalForm>
            <BoardModalDelete board={board} />
            <BoardFavoriteButton board={board} />
          </div>
        </div>
      </div>
    </div>
  );
}
