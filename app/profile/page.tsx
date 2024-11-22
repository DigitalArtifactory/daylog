import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';

export default function Profile() {
  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Profile" title="User">
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-none d-sm-inline-block"
              data-bs-toggle="modal"
              data-bs-target="#modal-report"
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M14 4l0 4l-6 0l0 -4" />
              </svg>
              Save changes
            </a>
            <a
              href="#"
              className="btn btn-primary d-sm-none btn-icon"
              data-bs-toggle="modal"
              data-bs-target="#modal-report"
              aria-label="Create new report"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </a>
          </div>
        </PageHeader>
        <PageBody>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Profile Information</h3>
              <div className="text-secondary">
                Update your account's profile information and email address.
              </div>
              <div className="d-flex align-items-center pt-4 mt-auto">
                <div className="w-full row">
                  <div className="col-md-4 ms-3">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name-input"
                        placeholder="Enter your nickname, name or fullname"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email-input"
                        placeholder="Enter your email for password recovery"
                      />
                    </div>
                  </div>
                </div>
                <div className="ms-auto"></div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h3 className="card-title">Update Password</h3>
              <div className="text-secondary">
                Ensure your account is using a long, random password to stay
                secure.
              </div>
              <div className="d-flex align-items-center pt-4 mt-auto">
                <div className="w-full row">
                  <div className="col-md-4 ms-3">
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name-input"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email-input"
                        placeholder="Enter your new secure password"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Pasword Confirmation</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email-input"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                </div>
                <div className="ms-auto"></div>
              </div>
            </div>
            <div className="card-body">
              <button className="btn btn-primary">
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                  <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 12l0 2.5" />
                </svg>
                Change Password
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h3 className="card-title">Backup</h3>
              <div className="text-secondary">
                Save or export all your data in a JSON file, depending of your
                data it may take a while, please don't refresh in this page
                until save file dialog appears.
              </div>
            </div>
            <div className="card-body">
              <button className="btn btn-primary">
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-file-export"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                </svg>
                Download Data
              </button>
            </div>
          </div>
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
