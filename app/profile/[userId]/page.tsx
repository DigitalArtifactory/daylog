import { getSettings } from '@/app/admin/lib/actions';
import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../login/lib/actions';
import { getProfile } from './lib/actions';
import Backup from './partials/Backup';
import DangerZone from './partials/DangerZone';
import MultiFAAuth from './partials/MultiFAAuth';
import ProfileInfo from './partials/ProfileInfo';
import UpdatePass from './partials/UpdatePass';

export default async function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  // Get the profile of the user
  const profile = await getProfile(parseInt((await params).userId));

  if (profile === null) {
    return (
      <Page>
        <NavHeader></NavHeader>
        <NavMenu></NavMenu>
        <PageContainer>
          <div className="mt-3">No profile page found</div>
        </PageContainer>
      </Page>
    );
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    {
      name: profile?.name ?? '',
      href: `/profile/${(await params).userId}`,
    },
  ];

  const settings = await getSettings();

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader title="User data" breadcrumbs={breadcrumbs}></PageHeader>
        <PageBody>
          {user.role === 'admin' && user.id !== profile.id && (
            <div className="alert alert-important alert-primary" role="alert">
              You are impersonating this profile as an admin.
            </div>
          )}
          <ProfileInfo profile={profile} />
          <UpdatePass userId={user.id} profile={profile} />
          {settings?.mfa && <MultiFAAuth profile={profile}></MultiFAAuth>}
          {user.id === profile.id && <Backup profile={profile} />}
          <DangerZone profile={profile}></DangerZone>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
