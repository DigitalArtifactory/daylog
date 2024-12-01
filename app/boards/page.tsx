'use client';

import BoardCard from '@/components/BoardCard';
import CardPlaceholder from '@/components/BoardPlaceholder';
import BoardModalForm from '@/components/modals/BoardModalForm';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { Board } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getBoards, getBoardsCount } from './lib/script';
 
// const getCount = unstable_cache(
//   async () => {
//     return await getBoardsCount();
//   },
//   ['count'],
//   { revalidate: 3600, tags: ['count'] }
// );

export default function Home() {
  const [boards, setBoards] = useState<Board[] | null>();
  const [count, setCount] = useState<number>(0);
  // const count = await getCount();

  const loadData = async () => {
    const count = await getBoardsCount();
    setCount(count);
    const boards = await getBoards();
    setBoards(boards);
  };

  const onUpdateBoard = (board: Board) => {
    loadData();
  };

  const createPlaceholders = () => {
    var placeholders = [];
    for (let i = 0; i < count; i++) {
      placeholders.push(
        <div key={i} className="col-md-4 justify-content-center">
          <CardPlaceholder></CardPlaceholder>
        </div>
      );
    }
    return placeholders;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Home" title="Boards">
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-none d-sm-inline-block"
              data-bs-toggle="modal"
              data-bs-target="#new-board-modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create new board
            </a>
            <BoardModalForm
              modalId="new-board-modal"
              mode="create"
              onSubmited={(b) => onUpdateBoard(b)}
            ></BoardModalForm>
          </div>
        </PageHeader>
        <PageBody>
          <div className="row row-deck">
            {boards
              ? boards?.map((b) => (
                  <div key={b.id} className="col-md-4 mb-3">
                    <BoardCard
                      board={b}
                      onUpdate={(b) => onUpdateBoard(b)}
                    ></BoardCard>
                  </div>
                ))
              : createPlaceholders()}
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
