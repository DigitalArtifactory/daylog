'use client';

import Loader from '@/components/Loader';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { deleteUser, getUsers, setAdmin as setRole } from '../lib/actions';

export default function UsersTable({
  currentUserId,
}: {
  currentUserId: number;
}) {
  const [users, setUsers] = useState<User[] | null>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const users = await getUsers();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClickRole = async (userId: number, role: string) => {
    await setRole(userId, role === 'user' ? 'admin' : 'user');
    await loadData();
  };

  return loading ? (
    <Loader caption="Loading users..." />
  ) : (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
            <th>Role</th>
            <th className="w-1"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td className="text-secondary">
                <a href="#" className="text-reset">
                  {u.email}
                </a>
              </td>
              <td>
                {u.role === 'user' ? (
                  <button
                    onClick={() => handleClickRole(u.id, u.role)}
                    className="btn btn-link"
                  >
                    Set as Admin
                  </button>
                ) : (
                  u.id !== currentUserId && (
                    <button
                      onClick={() => handleClickRole(u.id, u.role)}
                      className="btn btn-link"
                    >
                      Set as User
                    </button>
                  )
                )}
              </td>
              <td className="text-secondary text-capitalize">{u.role}</td>
              <td>
                <div className="d-flex gap-3">
                  <a href={`/profile/${u.id}`}>Edit</a>
                  {u.id !== currentUserId && (
                    <>
                      <a
                        role="button"
                        className="text-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete-modal-${u.id}`}
                      >
                        Delete
                      </a>
                      <div
                        className="modal"
                        id={`delete-modal-${u.id}`}
                        tabIndex={-1}
                      >
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 9v2m0 4v.01" />
                                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                              </svg>
                              <h3>Are you sure?</h3>
                              <div className="w-full bg-light p-3 rounded mb-3">
                                <div className="badge bg-danger text-light mb-1">
                                  Delete
                                </div>
                                <div className="text-secondary">{u.name}</div>
                                <div>{u.email}</div>
                              </div>
                              <div className="text-secondary">
                                Do you really want to delete this user? What
                                you&apos;ve done cannot be undone.
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
                                    <button
                                      onClick={async () => {
                                        const deleted = await deleteUser(u.id);
                                        if (deleted) {
                                          window.location.reload();
                                        }
                                        await loadData();
                                      }}
                                      type="submit"
                                      className="btn btn-danger w-full"
                                    >
                                      Yes, delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
