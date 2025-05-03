'use client';

import { useEffect, useState } from 'react';

export default function AdminTabs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ul className="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
      {isClient ? (
        <>
          <li className="nav-item">
            <a
              href="#tabs-admin-1"
              className="nav-link active"
              data-bs-toggle="tab"
            >
              Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#tabs-admin-2" className="nav-link" data-bs-toggle="tab">
              Preferences
            </a>
          </li>
        </>
      ) : (
        <div
          data-testid="admin-tabs-placeholder"
          style={{ height: '37px' }}
        ></div>
      )}
    </ul>
  );
}
