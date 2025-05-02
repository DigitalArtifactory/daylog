import { getSettings } from '@/app/admin/lib/actions';
import { getBoard } from '@/app/boards/lib/actions';
import { EditIcon } from '@/components/icons';
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
              <EditIcon />
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
