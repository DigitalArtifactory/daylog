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
import UsersTable from './partials/UsersTable';

export default async function Admin() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
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
                  <h3 className="card-title">Users</h3>
                  <div className="text-secondary">
                    Manage user accounts, and roles with ease.
                  </div>
                  <div className="pt-4">
                    <UsersTable></UsersTable>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-admin-2">
                  <h3 className="card-title">Security</h3>
                  <div className="text-secondary">
                    Customize your user accounts access and data security.
                  </div>
                  <div className="pt-4">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Force users to configure 2FA Authentication
                      </label>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-profile-ex1">
                  <h3 className="card-title">Database</h3>
                  <div className="text-secondary">
                    Choose your database engine or a third party integration
                    connection.
                  </div>
                  <div className="pt-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Database connection options
                      </label>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row g-2">
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="1"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/postgresql.svg"
                                    alt="Group of people sightseeing in the city"
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="2"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/supabase.svg"
                                    alt="Color Palette Guide. Sample Colors Catalog."
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="3"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/appwrite.svg"
                                    alt="Stylish workplace with computer at home"
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="4"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/mysql.svg"
                                    alt="Pink desk in the home office"
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="5"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/sqlite.svg"
                                    alt="Young woman sitting on the sofa and working on her laptop"
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="col-6 col-sm-4">
                              <label className="form-imagecheck w-full h-100 mb-2">
                                <input
                                  name="form-imagecheck-radio"
                                  type="radio"
                                  value="6"
                                  className="form-imagecheck-input"
                                />
                                <span className="d-flex align-items-center form-imagecheck-figure h-100 p-3">
                                  <img
                                    src="./images/logos/gdrive.svg"
                                    alt="Coffee on a table with other items"
                                    className="form-imagecheck-image mx-auto"
                                  />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Connection String
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-text-input"
                              placeholder="Input placeholder"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">User</label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Input placeholder"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Input placeholder"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Database</label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Input placeholder"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">API Key</label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Input placeholder"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">API Secret</label>
                            <input
                              type="text"
                              className="form-control"
                              name="example-password-input"
                              placeholder="Input placeholder"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn d-none d-sm-inline-block">
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-plug"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054z" />
                        <path d="M4 20l3.5 -3.5" />
                        <path d="M15 4l-3.5 3.5" />
                        <path d="M20 9l-3.5 3.5" />
                      </svg>
                      Verify Connection
                    </button>
                    <button
                      className="btn btn-primary"
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M14 4l0 4l-6 0l0 -4" />
                      </svg>
                      Save Changes
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
                          <div className="modal-status bg-warning"></div>
                          <div className="modal-body text-center py-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon mb-2 text-warning icon-lg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 9v2m0 4v.01" />
                              <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                            </svg>
                            <h3>Are you sure?</h3>
                            <div className="text-secondary">
                              Do you really want to change your database? This
                              action will copy all users data to the configured
                              database.
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
                                    className="btn btn-warning w-100"
                                    data-bs-dismiss="modal"
                                  >
                                    Yes, continue
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
              </div>
            </div>
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
