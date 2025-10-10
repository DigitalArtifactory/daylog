'use client';

import { IconChalkboard, IconHome, IconLibraryPlus, IconSquarePlus, IconUser } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { User } from '@/prisma/generated/client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileNavMenu({ user }: { user: User }) {
  const theme = useTheme();
  const pathname = usePathname()

  const homePattern = /^\/$/;
  const profilePattern = /^\/profile\/[a-zA-Z0-9_-]+\/?$/;
  const boardPattern = /^\/boards(\/[a-zA-Z0-9_-]+)?\/?$/;
  const notePattern = /^\/boards\/[a-zA-Z0-9_-]+\/notes(\/[a-zA-Z0-9_-]+)?\/?$/;

  const [clickedAdd, setClickedAdd] = useState(false);


  return (
    <div className='d-block d-md-none position-fixed bottom-0 end-0 p-2' style={{ zIndex: 1000 }}>
      <div className={`fixed-bottom d-block d-md-none p-2 py-3 shadow-lg border-top rounded-top-4 overflow-hidden  ${theme.resolvedTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
        <div className="d-flex justify-content-between px-5">
          <Link className={`nav-link ${profilePattern.test(pathname) && !clickedAdd ? 'text-primary' : ''}`} href={"/profile/" + user.id} onClick={() => setClickedAdd(false)}>
            <IconUser size={24} />
          </Link>
          <Link className={`nav-link ${homePattern.test(pathname) && !clickedAdd ? 'text-primary' : ''}`} href="/" onClick={() => setClickedAdd(false)}>
            <IconHome size={24} />
          </Link>
          <Link className={`nav-link ${boardPattern.test(pathname) && !clickedAdd || notePattern.test(pathname) && !clickedAdd ? 'text-primary' : ''}`} href="/boards" onClick={() => setClickedAdd(false)}>
            <IconChalkboard size={24} />
          </Link>
          {RegExp('/boards/\\d+/notes$').test(pathname) ?
            <Link className={`nav-link ${clickedAdd ? 'text-primary' : ''}`} href={`${pathname}?openNew=true`} onClick={() => setClickedAdd(true)}>
              <IconLibraryPlus size={24} />
            </Link>
            : <Link className={`nav-link ${clickedAdd ? 'text-primary' : ''}`} href="/boards?openNew=true" onClick={() => setClickedAdd(true)}>
              <IconSquarePlus size={24} />
            </Link>}
        </div>
      </div>
    </div>
  );
}