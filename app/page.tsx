import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getSettings } from './admin/lib/actions';
import { getCurrentSession } from './login/lib/actions';
import HomeTabs from './partials/HomeTabs';

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  const settings = await getSettings();
  const breadcrumbs = [{ name: 'Home', href: '/' }];
  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader
          title={`Welcome ${user.name}`}
          breadcrumbs={breadcrumbs}
        ></PageHeader>
        <PageBody>
          <HomeTabs settings={settings}/>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
