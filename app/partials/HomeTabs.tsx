'use client';

import Loader from '@/components/Loader';
import TimeDiff from '@/components/TimeDiff';
import { Board } from '@/prisma/generated/client';
import { stringToColor } from '@/utils/color';
import { getImageUrlOrFile } from '@/utils/image';
import { truncateWord } from '@/utils/text';
import { IconMoodSurprised, IconPlus } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNotes } from '../boards/[id]/notes/lib/actions';
import { getBoards } from '../boards/lib/actions';
import { NoteWithBoards } from '../boards/[id]/notes/lib/types';
import { motion } from 'framer-motion';

export default function HomeTabs({
  showFav: showFav = false,
}: {
  showFav?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [notes, setNotes] = useState<NoteWithBoards[] | null>([]);
  const [boards, setBoards] = useState<Board[] | null>([]);

  function setBackgroundImage(str: string): string {
    const color = stringToColor(str);
    return color;
  }

  const getBoardNotes = async () => {
    setLoadingNotes(true);
    const result = await getNotes(
      'created_desc',
      8
    );
    setNotes(result);
    setLoadingNotes(false);
  };

  useEffect(() => {
    const loadBoards = async () => {
      const result = await getBoards(
        'created_desc'
      );
      setLoading(false);
      if (result != null && result.length > 0) {
        let recentBoards = result;
        if (!showFav) {
          recentBoards = result.sort((a, b) => {
            return +b.favorite - +a.favorite;
          });
        } else {
          recentBoards = result.filter((board) => board.favorite);
        }
        setBoards(recentBoards);
        if (recentBoards.length > 0)
          getBoardNotes();
      } else {
        setBoards([]);
        setNotes([]);
      }
    };

    // Reset state on component mount
    setBoards([]);
    setNotes([]);
    setLoading(true);

    loadBoards();
    setIsClient(true);
  }, [showFav]);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h2 className="h2">Your Boards</h2>
        <a className='btn btn-ghost btn-primary' href={'/boards'}>View all</a>
      </div>
      {loading ? (
        <div className="text-center mt-5">
          <Loader caption="Loading boards..." />
        </div>
      ) : (
        <motion.ul
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.50 }}
          className="nav nav-pills flex-nowrap overflow-auto gap-4"
          id="boardTabs"
          role="tablist"
          style={{ whiteSpace: 'nowrap' }}
        >
          {isClient &&
            boards?.map((board) => (
              <li
                className={'nav-item rounded-4 shadow'}
                key={board.id}
                style={
                  board.imageUrl
                    ? {
                      minHeight: '80px',
                      minWidth: '180px',
                      objectFit: 'cover',
                      backgroundSize: '220px',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(20, 20, 20, 0.3)), url(${getImageUrlOrFile(
                        `${encodeURI(board.imageUrl)}`
                      )})`,
                    }
                    : {
                      minHeight: '80px',
                      minWidth: '180px',
                      backgroundColor: setBackgroundImage(board.title),
                    }
                }
              >
                <Link
                  className={`nav-link justify-content-start align-items-end fs-3 fw-bold h-100 text-light`}
                  style={{ minWidth: '180px', textShadow: '1px 1px 3px black' }}
                  href={`/boards/${board.id}/notes`}
                >
                  {truncateWord(board.title)}
                </Link>
              </li>
            ))}
          <li className="nav-item rounded-4 border-secondary overflow-hidden" style={{
            minHeight: '80px', minWidth: '180px', borderStyle: 'dashed', borderWidth: '2px'
          }}>
            <Link href={'/boards?openNew=true'} className="nav-link d-flex flex-column align-items-center justify-content-center w-full h-full">
              <IconPlus />
              New board
            </Link>
          </li>
        </motion.ul>)}
      <h2 className="h2 mt-4">Recent Notes</h2>
      {loadingNotes ? (
        <div className="text-center mt-5">
          <Loader caption="Loading notes..." />
        </div>
      ) : notes && notes.length > 0 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.50 }}
          className="row">
          {notes.map(
            (note) =>
              note.boardsId === note.boardsId && (
                <div className="col-6 col-md-4 col-lg-3 mb-2 mb-md-3" key={note.id}>
                  <div className="card overflow-hidden" style={{ minHeight: '200px', maxHeight: '200px' }}>
                    {note.imageUrl && (
                      <Link
                        href={`/boards/${note.boardsId}/notes/${note.id}`}
                        className="ratio ratio-21x9"
                      >
                        <Image
                          width={320}
                          height={180}
                          className="w-100 img-fluid"
                          src={getImageUrlOrFile(note.imageUrl)}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          alt={truncateWord(note.title, 20)}
                          priority={false}
                        />
                      </Link>
                    )}
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className='d-flex flex-column'>
                        <Link
                          href={`/boards/${note.boardsId}/notes/${note.id}`}
                          className="fw-bold line-clamp-1"
                        >
                          {note.title}
                        </Link>
                        {!note.imageUrl && <p className='text-secondary line-clamp-4'>
                          {note.content}
                        </p>}
                      </div>
                      <div className="d-flex align-items-center justify-content-between text-muted">
                        <TimeDiff updatedAt={note?.updatedAt} />
                        <Link href={`/boards/${note.boardsId}/notes`}>
                          <div className='badge' style={{ backgroundColor: stringToColor(note.boards?.title || ''), color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 3px black' }}>
                            {truncateWord(note.boards?.title || '', 10)}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </motion.div>
      ) : (
        EmptyNotes(showFav)
      )}
    </>
  );
}

function EmptyNotes(showFav: boolean) {
  return (
    <div className="text-center mt-5">
      <IconMoodSurprised />
      <div className="text-secondary">You don&apos;t have {showFav ? 'favorite' : null} notes yet...</div>
      <Link href='/boards'>
        Go to your boards and create one.
      </Link>
    </div>
  );
}
