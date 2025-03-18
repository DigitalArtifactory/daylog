import { getBoard } from '@/app/boards/lib/actions';
import { getFileToBase64 } from '@/utils/base64';
import { stringToColor } from '@/utils/color';
import { truncateWord } from '@/utils/text';
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

  function setBackgroundImage(str: string): string {
    const color = stringToColor(str);
    return color;
  }

  return (
    <div className="card d-flex flex-column">
      {board.favorite && (
        <div className="ribbon ribbon-top ribbon-bookmark bg-yellow">
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
            className="icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
          </svg>
        </div>
      )}
      {board?.imageUrl ? (
        <a className="ratio ratio-21x9" href={`/boards/${board.id}/notes`}>
          <img
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            src={
              (await getFileToBase64(board.imageUrl)) ??
              '/samples/photos/search-bg.jpg'
            }
            alt={`Image of ${board.title}`}
          />
        </a>
      ) : (
        <a
          className="ratio ratio-21x9"
          href={`/boards/${board.id}/notes`}
          style={{ backgroundColor: setBackgroundImage(board.title) }}
        ></a>
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">
          <a href={`/boards/${board.id}/notes`}>
            {truncateWord(board.title, 35)}
          </a>
        </h3>
        <div className="text-secondary">{board.description}</div>
        <div className="d-flex align-items-center justify-content-between pt-4 mt-auto">
          <div className="text-secondary">
            <TimeDiff updatedAt={board?.updatedAt} />
          </div>
          <div className="d-block">
            <a
              href="#"
              className="icon ms-3 text-secondary"
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
            ></BoardModalForm>
            <BoardModalDelete board={board} />
            <BoardFavoriteButton board={board} />
          </div>
        </div>
      </div>
    </div>
  );
}
