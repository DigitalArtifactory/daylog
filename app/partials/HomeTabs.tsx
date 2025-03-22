'use client';

import Loader from '@/components/Loader';
import { stringToColor } from '@/utils/color';
import { truncateWord } from '@/utils/text';
import { Board, Note } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import NoteCardPlaceholderSimple from '../boards/[id]/notes/components/NotePlaceholderSimple';
import { getNotes } from '../boards/[id]/notes/lib/actions';
import { getBoards } from '../boards/lib/actions';

export default function HomeTabs() {
  const [loading, setLoading] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notes, setNotes] = useState<Note[] | null>([]);
  const [boards, setBoards] = useState<Board[] | null>([]);

  function setBackgroundImage(str: string): string {
    const color = stringToColor(str);
    return color;
  }

  useEffect(() => {
    const loadBoards = async () => {
      if (boards == null || boards.length === 0) {
        const result = await getBoards();
        setBoards(result);
        setLoading(false);

        if (result != null && result.length > 0) {
          getBoardNotes(result[0].id);
        }
      }
    };
    loadBoards();
    setIsClient(true);
  }, [boards]);

  const getBoardNotes = async (boardId: number) => {
    setLoadingNotes(true);
    const result = await getNotes(boardId);
    setNotes(result);
    setLoadingNotes(false);
  };

  return loading ? (
    <Loader caption="Loading boards..." />
  ) : boards == null || boards?.length === 0 ? (
    <div className="text-center">
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
        className="icon icon-tabler icon-lg text-secondary icons-tabler-outline icon-tabler-mood-confuzed mb-1"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 10l.01 0" />
        <path d="M15 10l.01 0" />
        <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
      </svg>
      <div className="text-secondary">You don&apos;t have boards yet...</div>
      <Link href={'/boards'}>Go to your boards and create one.</Link>
    </div>
  ) : (
    <>
      <ul
        className="nav nav-pills flex-nowrap overflow-auto gap-3"
        id="boardTabs"
        role="tablist"
        style={{ whiteSpace: 'nowrap' }}
      >
        {isClient &&
          boards.map((board, index) => (
            <li
              className={'nav-item rounded shadow'}
              key={board.id}
              style={
                board.imageUrl
                  ? {
                      backgroundSize: '180px',
                      backgroundPosition: 'top',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `${
                        index === selectedIndex
                          ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(20, 20, 20, 0.01))'
                          : 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(20, 20, 20, 0.3))'
                      }, url(${`/api/v1/images?filePath=${encodeURI(
                        board.imageUrl
                      )}`})`,
                    }
                  : {
                      backgroundColor: setBackgroundImage(board.title),
                    }
              }
            >
              <Link
                className={`nav-link justify-content-center px-5 py-3 ${
                  index === selectedIndex
                    ? 'active text-white border-white'
                    : 'text-light'
                }`}
                style={{ minWidth: '150px', textShadow: '1px 1px 3px black' }}
                id={`tab-${board.id}`}
                data-bs-toggle="tab"
                href={`#board-${board.id}`}
                role="tab"
                aria-controls={`board-${board.id}`}
                aria-selected={index === 0 ? 'true' : 'false'}
                onClick={() => {
                  getBoardNotes(board.id);
                  setSelectedIndex(index);
                }}
              >
                {truncateWord(board.title)}
              </Link>
            </li>
          ))}
      </ul>
      <div className="tab-content mt-3" id="boardTabsContent">
        {boards !== null &&
          boards.length > 0 &&
          boards.map((board, index) => (
            <div
              className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
              id={`board-${board.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${board.id}`}
              key={board.id}
            >
              <div className="row">
                {loadingNotes ? (
                  <>
                    <div className="col-md-3">
                      <NoteCardPlaceholderSimple />
                    </div>
                    <div className="col-md-3">
                      <NoteCardPlaceholderSimple />
                    </div>
                    <div className="col-md-3">
                      <NoteCardPlaceholderSimple />
                    </div>
                  </>
                ) : notes && notes.length > 0 ? (
                  notes.map(
                    (note) =>
                      note.boardsId === board.id && (
                        <div className="col-md-3" key={note.id}>
                          <div className="card mb-2">
                            {note.imageUrl && (
                              <Link
                                href={`/boards/${note.id}/notes/${note.id}`}
                                className="stretched-link text-secondary"
                              >
                                <Image
                                  width={240}
                                  height={120}
                                  src={`/api/v1/images?filePath=${note.imageUrl}`}
                                  className="card-img-top"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                  }}
                                  alt={note.title}
                                />
                              </Link>
                            )}
                            <div className="card-body">
                              <Link
                                href={`/boards/${note.id}/notes/${note.id}`}
                                className="stretched-link text-secondary"
                              >
                                {note.title}
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <Fragment key={board.id}>{EmptyNotes(board.id)}</Fragment>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

function EmptyNotes(boardId: number) {
  return (
    <div className="text-center mt-5">
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
        className="icon icon-tabler icon-lg text-secondary icons-tabler-outline icon-tabler-mood-surprised mb-1"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 9l.01 0" />
        <path d="M15 9l.01 0" />
        <path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      </svg>
      <div className="text-secondary">You don&apos;t have notes yet...</div>
      <Link href={`/boards/${boardId}/notes`}>
        Go to this board and create one.
      </Link>
    </div>
  );
}
