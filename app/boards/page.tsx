import BoardCard from '@/app/boards/components/BoardCard';
import BoardModalForm from '@/app/boards/components/BoardModalForm';
import CardPlaceholder from '@/app/boards/components/BoardPlaceholder';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentSession } from '../login/lib/actions';
import { getBoards } from './lib/actions';

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const boards = await getBoards();

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Boards" title="All boards">
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-sm-inline-block"
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
            ></BoardModalForm>
          </div>
        </PageHeader>
        <PageBody>
          <div className="row row-deck">
            {boards?.length == 0 ? (
              <div className="alert alert-info" role="alert">
                <h4 className="alert-title">Your boards are empty</h4>
                <div className="text-secondary">You can create a new board</div>
              </div>
            ) : (
              boards?.map((b) => (
                <div key={b.id} className="col-md-4 mb-3">
                  <Suspense fallback={<CardPlaceholder></CardPlaceholder>}>
                    <BoardCard boardId={b.id}></BoardCard>
                  </Suspense>
                </div>
              ))
            )}
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
