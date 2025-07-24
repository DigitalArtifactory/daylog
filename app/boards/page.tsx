import BoardCard from '@/app/boards/components/BoardCard';
import BoardModalForm from '@/app/boards/components/BoardModalForm';
import BoardCardPlaceholder from '@/app/boards/components/BoardPlaceholder';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { IconPlus } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getSettings } from '../admin/lib/actions';
import { getCurrentSession } from '../login/lib/actions';
import BoardSortSelector from './components/BoardSortSelector';
import { getBoards } from './lib/actions';

export default async function Boards({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const { sort = user.sortBoardsBy || 'created_desc' } = await searchParams;
  const currentSort = sort as string;
  const boards = await getBoards(currentSort);
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
          <div
            className="d-flex align-items-center justify-content-between gap-3
          "
          >
            <BoardSortSelector sortingParam={currentSort} />
            <div className="btn-list">
              <button
                accessKey="n"
                id="new-board-button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#new-board-modal"
              >
                <IconPlus />
                <span className="ms-1">Create new board</span>
                <div className="d-flex gap-1 ms-1">
                  <span className="badge bg-transparent badge-md border border-light text-light">
                    Alt
                  </span>
                  <span className="badge bg-transparent badge-md border border-light text-light">
                    N
                  </span>
                </div>
              </button>
              <BoardModalForm
                modalId="new-board-modal"
                mode="create"
                isUnsplashAllowed={settings?.allowUnsplash}
              ></BoardModalForm>
            </div>
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
