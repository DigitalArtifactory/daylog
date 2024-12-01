'use client';

import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getUsers } from '../lib/script';

export default function UsersTable() {
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const loadData = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    loadData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
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
              <td className="text-secondary text-capitalize">{u.role}</td>
              <td>
                <a href="#">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
