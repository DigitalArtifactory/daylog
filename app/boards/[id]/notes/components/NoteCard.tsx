import { getSettings } from '@/app/admin/lib/actions';
import TimeDiff from '@/components/TimeDiff';
import { getImageUrlOrFile } from '@/utils/image';
import { truncateWord } from '@/utils/text';
import { IconEdit } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
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

  const settings = await getSettings();

  return (
    <div className="card d-flex flex-column" style={{ overflow: 'clip' }}>
      {note?.imageUrl && (
        <Link
          className="ratio ratio-21x9"
          href={`/boards/${note.boardsId}/notes/${note.id}`}
        >
          <Image
            width={800}
            height={600}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            className="w-100 img-fluid"
            src={getImageUrlOrFile(note.imageUrl)}
            alt={`Image of ${note.title}`}
            priority={false}
          ></Image>
        </Link>
      )}
      <div className="card-body d-flex flex-column h-full">
        <h3 className="card-title">
          <Link href={`/boards/${note.boardsId}/notes/${note.id}`}>
            {truncateWord(note.title, 35)}
          </Link>
        </h3>
        <div
          className={`text-secondary ${
            note.imageUrl ? 'line-clamp-2' : 'line-clamp-8'
          }`}
        >
          {note.content}
        </div>
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
              <IconEdit />
            </a>
            <NoteModalForm
              note={note}
              boardId={note.boardsId!}
              modalId={`edit-board-modal-${note.id}}`}
              mode="update"
              isUnsplashAllowed={settings?.allowUnsplash}
            ></NoteModalForm>
            <NoteModalDelete note={note} />
            <NoteFavoriteButton note={note} />
          </div>
        </div>
      </div>
    </div>
  );
}
