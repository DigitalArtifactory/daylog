import Alerts from '@/components/Alerts';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { getNote } from '../lib/actions';
import Editor from './components/Editor';
import SaveNoteChanges from './partials/SaveNoteButton';

export default async function Home({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;
  const note = await getNote(parseInt(noteId));
  if (!note) {
    return <></>;
  }

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Notes" title={note.title}>
          <div className="btn-list">
            <SaveNoteChanges note={note} />
          </div>
        </PageHeader>
        <PageBody>
          <div className="container-xl">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                <Alerts />
                <div className="card">
                  <div className="card-body p-0 shadow-sm">
                    <img
                      className="card-img-top"
                      src="/samples/photos/search-bg.jpg"
                      alt="Book on the grass"
                    />
                  </div>
                  <div className="card-body p-0 border-0 h-auto">
                    <Editor content={note?.content ?? ''} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
