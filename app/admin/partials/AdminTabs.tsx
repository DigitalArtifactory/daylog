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
              href="#tabs-home-ex1"
              className="nav-link active"
              data-bs-toggle="tab"
            >
              Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#tabs-admin-2" className="nav-link" data-bs-toggle="tab">
              Security
            </a>
          </li>
        </>
      ) : (
        <div style={{ height: '37px' }}></div>
      )}
    </ul>
  );
}
