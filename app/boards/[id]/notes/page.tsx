import { getCurrentSession } from '@/app/login/lib/actions';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import NoteCard from './components/NoteCard';
import NoteModalForm from './components/NoteModalForm';
import NoteCardPlaceholder from './components/NotePlaceholder';
import { getNotes } from './lib/actions';

export default async function Notes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const { id } = await params;
  const notes = await getNotes(parseInt(id));

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Home > Notes" title="Notes">
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-sm-inline-block"
              data-bs-toggle="modal"
              data-bs-target="#new-note-modal"
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
              Create new note
            </a>
            <NoteModalForm
              boardId={parseInt(id)}
              modalId="new-note-modal"
              mode="create"
            ></NoteModalForm>
          </div>
        </PageHeader>
        <PageBody>
          <div className="row row-deck">
            {notes?.length == 0 ? (
              <div className="alert alert-info" role="alert">
                <h4 className="alert-title">Your notes are empty</h4>
                <div className="text-secondary">You can create a new note</div>
              </div>
            ) : (
              notes?.map((b) => (
                <div key={b.id} className="col-md-4 mb-3">
                  <Suspense fallback={<NoteCardPlaceholder></NoteCardPlaceholder>}>
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
