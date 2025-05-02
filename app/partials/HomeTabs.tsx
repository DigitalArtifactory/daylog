'use client';

import { ConfusedIcon, SurprisedIcon } from '@/components/icons';
import Loader from '@/components/Loader';
import { stringToColor } from '@/utils/color';
import { getImageUrlOrFile } from '@/utils/image';
import { truncateWord } from '@/utils/text';
import { Board, Note } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
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
      const result = await getBoards();
      setBoards(result);
      setLoading(false);

      if (result != null && result.length > 0) {
        getBoardNotes(result[0].id);
      }
    };
    loadBoards();
    setIsClient(true);
  }, []);

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
      <ConfusedIcon />
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
                      minHeight: '90px',
                      minWidth: '220px',
                      objectFit: 'cover',
                      backgroundSize: '220px',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `${
                        index === selectedIndex
                          ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(20, 20, 20, 0.01))'
                          : 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(20, 20, 20, 0.3))'
                      }, url(${getImageUrlOrFile(
                        `${encodeURI(board.imageUrl)}`
                      )})`,
                    }
                  : {
                      minHeight: '90px',
                      minWidth: '220px',
                      backgroundColor: setBackgroundImage(board.title),
                    }
              }
            >
              <Link
                className={`nav-link justify-content-start align-items-start h-100 h3 ${
                  index === selectedIndex
                    ? 'active text-white border-white'
                    : 'text-light'
                }`}
                style={{ minWidth: '200px', textShadow: '1px 1px 3px black' }}
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
                  <Loader caption="Loading notes..." />
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
                                  width={320}
                                  height={180}
                                  src={getImageUrlOrFile(note.imageUrl)}
                                  className="card-img-top"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                  }}
                                  alt={note.title}
                                  priority={false}
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
      <SurprisedIcon />
      <div className="text-secondary">You don&apos;t have notes yet...</div>
      <Link href={`/boards/${boardId}/notes`}>
        Go to this board and create one.
      </Link>
    </div>
  );
}
