import { getSettings } from '@/app/admin/lib/actions';
import { getCurrentSession } from '@/app/login/lib/actions';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { IconInfoCircle, IconPlus } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getBoard } from '../../lib/actions';
import NoteCard from './components/NoteCard';
import NoteModalForm from './components/NoteModalForm';
import NoteCardPlaceholder from './components/NotePlaceholder';
import NoteSortSelector from './components/NoteSortSelector';
import { getNotes } from './lib/actions';

export default async function Notes({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const { id } = await params;
  const { sort = user.sortNotesBy || 'created_desc' } = await searchParams;
  const board = await getBoard(parseInt(id));
  const currentSort = sort as string;
  const notes = await getNotes(parseInt(id), currentSort);
  const settings = await getSettings();
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Boards', href: '/boards' },
    { name: board?.title ?? 'Notes', href: `/boards/${id}/notes` },
  ];

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader
          title={board?.title}
          imageUrl={board?.imageUrl}
          breadcrumbs={breadcrumbs}
        >
          <div
            className="d-flex align-items-center justify-content-between gap-3
          "
          >
            <NoteSortSelector
              sortingParam={currentSort}
              boardId={parseInt(id)}
            />
            <div className="btn-list">
              <button
                accessKey="n"
                id="new-note-button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#new-note-modal"
              >
                <IconPlus />
                <span className="ms-1">Create new note</span>
                <div className="d-flex gap-1 ms-1 d-none d-md-inline-flex">
                  <span className="badge bg-transparent badge-md border border-light text-light">
                    Alt
                  </span>
                  <span className="badge bg-transparent badge-md border border-light text-light">
                    N
                  </span>
                </div>
              </button>
              <NoteModalForm
                boardId={parseInt(id)}
                modalId="new-note-modal"
                mode="create"
                isUnsplashAllowed={settings?.allowUnsplash}
              ></NoteModalForm>
            </div>
          </div>
        </PageHeader>
        <PageBody>
          <div className="row row-deck">
            {notes?.length == 0 ? (
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Your notes are empty</h5>
                    <div className="d-flex flex-row gap-2">
                      <span>
                        <IconInfoCircle />
                      </span>
                      <p className="card-text">
                        Create a new one clicking{' '}
                        <strong>Create new note</strong> button or using{' '}
                        <span className="badge bg-info text-white">
                          Alt + N
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              notes?.map((b) => (
                <div key={b.id} className="col-md-4 mb-3">
                  <Suspense fallback={<NoteCardPlaceholder />}>
                    <NoteCard noteId={b.id}></NoteCard>
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
