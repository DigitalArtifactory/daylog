import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getBoards } from './boards/lib/actions';
import { getCurrentSession } from './login/lib/actions';
import HomeTabs from './partials/HomeTabs';

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
        <PageHeader preTitle="Home" title={`Welcome ${user.name}`}></PageHeader>
        <PageBody>
          <HomeTabs boards={boards} />
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
