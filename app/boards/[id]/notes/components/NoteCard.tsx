import TimeDiff from '@/components/TimeDiff';
import { getNote } from '../lib/actions';
import NoteFavoriteButton from './NoteFavoriteButton';
import NoteModalDelete from './NoteModalDelete';
import NoteModalForm from './NoteModalForm';

type NoteCardType = {
  noteId: number;
};

export default async function NoteCard({ noteId }: NoteCardType) {
  const note = await getNote(noteId);
  if (!note) {
    return <></>;
  }
  return (
    <div className="card d-flex flex-column">
      {note.favorite && (
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
      {note?.imageUrl && (
        <a
          className="ratio ratio-21x9"
          href={`/boards/${note.boardsId}/notes/${note.id}`}
        >
          <img
            style={{ objectFit: 'cover' }}
            src={note.imageUrl ?? '/samples/photos/search-bg.jpg'}
            alt="Book on the grass"
          />
        </a>
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">
          <a href={`/boards/${note.boardsId}/notes/${note.id}`}>{note.title}</a>
        </h3>
        <div className="text-secondary line-clamp-2">{note.content}</div>
        <div className="d-flex align-items-center justify-content-between pt-4 mt-auto">
          <div className="text-secondary">
            <TimeDiff updatedAt={note?.updatedAt} />
          </div>
          <div className="d-block">
            <a
              href="#"
              className="icon ms-3 text-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#edit-board-modal-${note.id}}`}
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
            <NoteModalForm
              note={note}
              boardId={note?.boardsId}
              modalId={`edit-board-modal-${note.id}}`}
              mode="update"
            ></NoteModalForm>
            <NoteModalDelete note={note} />
            <NoteFavoriteButton note={note} />
          </div>
        </div>
      </div>
    </div>
  );
}
