'use client';

import Link from 'next/link';
import { IconChalkboard, IconClipboardPlusFilled, IconHome, IconLibraryPlus, IconPlus, IconSquarePlus, IconUser } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { User } from '@/prisma/generated/client';
import { usePathname } from 'next/navigation';

export default function MobileNavMenu({ user }: { user: User }) {
  const theme = useTheme();
  const pathname = usePathname()

  return (
    <div className='d-block d-md-none position-fixed bottom-0 end-0 p-2' style={{ zIndex: 1000 }}>
      <div className={`fixed-bottom d-block d-md-none p-2 py-3 shadow-lg border-top rounded-top-4 overflow-hidden  ${theme.resolvedTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
        <div className="d-flex justify-content-between px-5">
          <Link className="nav-link" href={"/profile/" + user.id}>
            <IconUser size={24} />
          </Link>
          <Link className="nav-link" href="/">
            <IconHome size={24} />
          </Link>
          <Link className="nav-link" href="/boards">
            <IconChalkboard size={24} />
          </Link>
          {RegExp('/boards/\\d+/notes$').test(pathname) ?
            <Link className="nav-link" href={`${pathname}?openNew=true`}>
              <IconLibraryPlus size={24} />
            </Link>
            : <Link className="nav-link" href="/boards?openNew=true">
              <IconSquarePlus size={24} />
            </Link>}


        </div>
      </div>
    </div>
  );
}