'use client';

import Loader from '@/components/Loader';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getUsers, setAdmin as setRole } from '../lib/script';

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
                <a href={`/profile/${u.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
