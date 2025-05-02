import { getBoard } from '@/app/boards/lib/actions';
import { getCurrentSession } from '@/app/login/lib/actions';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { getImageUrlOrFile } from '@/utils/image';
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
  const board = await getBoard(parseInt((await params).noteId));
  const note = await getNote(parseInt((await params).noteId));
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Boards', href: '/boards' },
    { name: board?.title ?? 'Notes', href: `/boards/${note?.boardsId}/notes` },
    {
      name: note?.title ?? '',
      href: `/boards/${note?.boardsId}/notes/${note?.id}`,
    },
  ];

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader title={note?.title} breadcrumbs={breadcrumbs}></PageHeader>
        <PageBody>
          <div className="container-xl p-0 px-lg-2">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                <div className="card">
                  {note?.imageUrl && (
                    <div
                      className="card-body p-0 shadow-sm overflow-hidden"
                      style={{
                        maxHeight: 320,
                      }}
                    >
                      <Image
                        width={1920}
                        height={0}
                        className="card-img-top"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          width: 'auto',
                        }}
                        src={getImageUrlOrFile(note.imageUrl)}
                        alt={`Preview image of ${note.title}`}
                        priority={true}
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
