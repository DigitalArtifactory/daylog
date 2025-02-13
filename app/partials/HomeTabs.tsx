'use client';

import { Board, Note } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNotes } from '../boards/[id]/notes/lib/actions';

export default function HomeTabs({ boards }: { boards: Board[] | null }) {
  const [isClient, setIsClient] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notes, setNotes] = useState<Note[] | null>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (boards !== null) {
      const getBoardNotes = async (boardId: number) => {
        const result = await getNotes(boardId);
        setNotes(result);
      };
      const board = boards[selectedIndex];
      if (board) getBoardNotes(board.id);
    }
  }, [selectedIndex]);

  return boards == null || boards?.length === 0 ? (
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
      <div className="text-secondary">You don't have boards yet...</div>
      <Link href={'/boards'}>Go to your boards and create one.</Link>
    </div>
  ) : (
    <>
      <ul className="nav nav-bordered" id="boardTabs" role="tablist">
        {isClient &&
          boards.map((board, index) => (
            <li className="nav-item" key={board.id}>
              <a
                className={`nav-link ${index === 0 ? 'active' : ''}`}
                id={`tab-${board.id}`}
                data-bs-toggle="tab"
                href={`#board-${board.id}`}
                role="tab"
                aria-controls={`board-${board.id}`}
                aria-selected={index === 0 ? 'true' : 'false'}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                {board.title}
              </a>
            </li>
          ))}
      </ul>
      <div className="tab-content mt-3" id="boardTabsContent">
        {notes?.map((note, index) => (
          <div
            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
            id={`board-${note.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${note.id}`}
            key={note.id}
          >
            <div className="row">
              {notes.map((board) => (
                <div className="col-md-3" key={board.id}>
                  <div className="card">
                    {board.imageUrl && (
                      <a
                        href={`/boards/${board.id}/notes/${note.id}`}
                        className="stretched-link text-secondary"
                      >
                        <img
                          src={board.imageUrl}
                          className="card-img-top"
                          alt={board.title}
                        />
                      </a>
                    )}
                    <div className="card-body">
                      <a
                        href={`/boards/${board.id}/notes/${note.id}`}
                        className="stretched-link text-secondary"
                      >
                        {board.title}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
