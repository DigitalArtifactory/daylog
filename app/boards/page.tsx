import BoardCard from '@/app/boards/components/BoardCard';
import BoardModalForm from '@/app/boards/components/BoardModalForm';
import BoardCardPlaceholder from '@/app/boards/components/BoardPlaceholder';
import { AddIcon } from '@/components/icons';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getSettings } from '../admin/lib/actions';
import { getCurrentSession } from '../login/lib/actions';
import { getBoards } from './lib/actions';

export default async function Boards() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const boards = await getBoards();
  const settings = await getSettings();
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Boards', href: '/boards' },
  ];

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader title="All boards" breadcrumbs={breadcrumbs}>
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-sm-inline-block"
              data-bs-toggle="modal"
              data-bs-target="#new-board-modal"
            >
              <AddIcon />
              Create new board
            </a>
            <BoardModalForm
              modalId="new-board-modal"
              mode="create"
              isUnsplashAllowed={settings?.allowUnsplash}
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
                  <Suspense
                    fallback={<BoardCardPlaceholder></BoardCardPlaceholder>}
                  >
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
