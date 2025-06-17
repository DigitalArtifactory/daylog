import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getCurrentSession } from './login/lib/actions';
import HomeTabs from './partials/HomeTabs';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  const t = await getTranslations('');

  const breadcrumbs = [{ name: t('navigation.home'), href: '/' }];

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader
          title={t('homePage.welcomeMessage', { name: user.name ?? ""})}
          breadcrumbs={breadcrumbs}
        ></PageHeader>
        <PageBody>
          <HomeTabs />
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
