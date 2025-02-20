import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../login/lib/actions';
import AdminTabs from './partials/AdminTabs';
import SecurityTab from './partials/SecurityTab';
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

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Admin" title="Configuration"></PageHeader>
        <PageBody>
          <div className="card">
            <div className="card-header">
              <AdminTabs />
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane active show" id="tabs-home-ex1">
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
                <div className="tab-pane" id="tabs-admin-2">
                  <SecurityTab />
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
