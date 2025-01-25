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

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Profile" title="User"></PageHeader>
        <PageBody>
          <ProfileInfo profile={profile} />
          <UpdatePass userId={user.id} profile={profile} />
          <Backup profile={profile} />
          <div className="card mt-3">
            <div className="card-body">
              <h3 className="card-title text-danger">Danger Zone</h3>
              <div className="text-secondary">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
              </div>
            </div>
            <div className="card-body">
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                Delete Account
              </button>
              <div className="modal" id="delete-modal" tabIndex={-1}>
                <div className="modal-dialog modal-sm" role="document">
                  <div className="modal-content">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <div className="modal-status bg-danger"></div>
                    <div className="modal-body text-center py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon mb-2 text-danger icon-lg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 9v2m0 4v.01" />
                        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                      </svg>
                      <h3>Are you sure?</h3>
                      <div className="text-secondary">
                        Do you really want to delete your account? What you've
                        done cannot be undone.
                      </div>
                      <div className="mt-4">
                        <input
                          type="password"
                          className="form-control"
                          name="password-delete-input"
                          placeholder="Your password is required"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="w-100">
                        <div className="row">
                          <div className="col">
                            <a
                              href="#"
                              className="btn w-100"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </a>
                          </div>
                          <div className="col">
                            <a
                              href="#"
                              className="btn btn-danger w-100"
                              data-bs-dismiss="modal"
                            >
                              Yes, delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
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
