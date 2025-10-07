import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import BoardFavSwitch from './components/BoardFavToggle';
import { getBoardsCount } from './lib/actions';
import { getCurrentSession } from './login/lib/actions';
import HomeTabs from './partials/HomeTabs';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  const boardsCount = await getBoardsCount();
  const { showFav = 'false' } = await searchParams;

  const breadcrumbs = [{ name: 'Home', href: '/' }];
  return (
    <Page>
      <NavMenu></NavMenu>
      <NavHeader></NavHeader>
      <PageContainer>
        <PageHeader title={`Welcome ${user.name}`}
          breadcrumbs={breadcrumbs}
          description={`Here is a quick look of your ${showFav == 'true' ? 'favorite' : 'recent'} boards`}>
          {boardsCount > 0 && (
            <div className="d-flex w-full justify-content-end">
              <BoardFavSwitch showFavParam={showFav == 'true'} />
            </div>
          )}
        </PageHeader>
        <PageBody>
          <HomeTabs showFav={showFav == 'true'} />
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
