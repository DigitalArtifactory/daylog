import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../login/lib/actions';
import { getSettings } from './lib/actions';
import AdminTabs from './partials/AdminTabs';
import PreferencesTab from './partials/PreferencesTab';
import UserModal from './partials/UserModal';
import UsersTable from './partials/UsersTable';

export default async function Admin() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }
  if (user.role !== 'admin') {
    return redirect('/');
  }
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Admin', href: '/admin' },
  ];

  const initialSettings = await getSettings();

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader
          title="Configuration"
          breadcrumbs={breadcrumbs}
        ></PageHeader>
        <PageBody>
          <div className="card">
            <div className="card-header">
              <AdminTabs />
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane active show" id="tabs-admin-users">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="card-title">Users</h3>
                      <div className="text-secondary">
                        Manage user accounts, and roles with ease.
                      </div>
                    </div>
                    <div>
                      <UserModal />
                    </div>
                  </div>
                  <div className="pt-4">
                    <UsersTable currentUserId={user.id}></UsersTable>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-admin-preferences">
                  <PreferencesTab initialSettings={initialSettings} />
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
