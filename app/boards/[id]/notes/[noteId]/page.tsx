import { getCurrentSession } from '@/app/login/lib/actions';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getNote } from '../lib/actions';
import NoteEditorClientWrapper from './partials/NoteEditorClientWrapper';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  const note = await getNote(parseInt((await params).noteId));

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader
          preTitle={`Home > Notes > ${note?.title}`}
          title={note?.title}
        ></PageHeader>
        <PageBody>
          <div className="container-xl p-0 px-lg-2">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                <div className="card">
                  {note?.imageUrl && (
                    <div className="card-body p-0 shadow-sm">
                      <Image
                        className="card-img-top"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top',
                          maxHeight: 420,
                        }}
                        src={`/api/v1/images?filePath=${note.imageUrl}`}
                        alt="Book on the grass"
                      />
                    </div>
                  )}
                  <div className="card-body p-0 border-0 h-auto">
                    {note && <NoteEditorClientWrapper note={note} />}
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
