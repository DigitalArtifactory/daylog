'use client';

import { User } from '@/prisma/generated/client';
import {
  IconChalkboard,
  IconCircleMinus,
  IconHome,
  IconUser,
  IconUserShield
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signout } from '@/app/lib/actions';
import { motion } from 'framer-motion';

export default function NavBar({ user }: { user: User }) {
  const path = usePathname();
  const adminPattern = /^\/admin\/?$/;
  const homePattern = /^\/$/;
  const profilePattern = /^\/profile\/[a-zA-Z0-9_-]+\/?$/;
  const boardPattern = /^\/boards(\/[a-zA-Z0-9_-]+)?\/?$/;
  const notePattern = /^\/boards\/[a-zA-Z0-9_-]+\/notes(\/[a-zA-Z0-9_-]+)?\/?$/;

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav pt-lg-3 px-lg-3 gap-2">
        <motion.li
          animate={{ 
            scale: homePattern.test(path) ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
          className={`nav-item rounded-pill overflow-hidden ${homePattern.test(path) ? 'text-bg-primary' : ''}`}
        >
          <Link
            className={`nav-link ${homePattern.test(path) ? 'text-bg-primary' : ''}`}
            href="/"
            prefetch={true}
          >
            <span className={`nav-link-icon d-md-none d-lg-inline-block ${homePattern.test(path) ? 'text-bg-primary' : ''}`}>
              <IconHome />
            </span>
            <span className="nav-link-title">Home</span>
          </Link>
        </motion.li>  
        <motion.li
          animate={{ 
            scale: (boardPattern.test(path) || notePattern.test(path)) ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
          className={`nav-item rounded-pill overflow-hidden ${boardPattern.test(path) || notePattern.test(path) ? 'text-bg-primary' : ''}`}
        >
          <Link
            className={`nav-link ${boardPattern.test(path) || notePattern.test(path) ? 'text-bg-primary' : ''}`}
            href="/boards"
            prefetch={true}
          >
            <span className={`nav-link-icon d-md-none d-lg-inline-block ${boardPattern.test(path) || notePattern.test(path) ? 'text-bg-primary' : ''}`}>
              <IconChalkboard />
            </span>
            <span className="nav-link-title">Boards</span>
          </Link>
        </motion.li>
        <motion.li
          animate={{ 
            scale: profilePattern.test(path) ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
          className={`nav-item rounded-pill overflow-hidden ${profilePattern.test(path) ? 'text-bg-primary' : ''}`}
        >
          <Link
            className={`nav-link ${profilePattern.test(path) ? 'text-bg-primary' : ''}`}
            href={`/profile/${user?.id}`}
            prefetch={true}
          >
            <span className={`nav-link-icon d-md-none d-lg-inline-block ${profilePattern.test(path) ? 'text-bg-primary' : ''}`}>
              <IconUser />
            </span>
            <span className="nav-link-title">Profile</span>
          </Link>
        </motion.li>
        {user?.role === 'admin' && (
          <motion.li
            animate={{ 
              scale: adminPattern.test(path) ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              scale: { duration: 0.3, ease: "easeInOut" }
            }}
            className={`nav-item rounded-pill overflow-hidden ${adminPattern.test(path) ? 'text-bg-primary' : ''}`} data-testid="admin-nav"
          >
            <Link
              className={`nav-link ${adminPattern.test(path) ? 'text-bg-primary' : ''}`}
              href="/admin"
              prefetch={true}
            >
              <span className={`nav-link-icon d-md-none d-lg-inline-block ${adminPattern.test(path) ? 'text-bg-primary' : ''}`}>
                <IconUserShield />
              </span>
              <span className="nav-link-title">Admin</span>
            </Link>
          </motion.li>
        )}
        <motion.li className='nav-item rounded-pill overflow-hidden mt-lg-auto mb-4'>
          <a className="nav-link text-danger" role='button' onClick={() => signout()}>
            <span className='nav-link-icon d-md-none d-lg-inline-block'>
              <IconCircleMinus />
            </span>
            <span className="nav-link-title">Logout</span>
          </a>
        </motion.li>
      </ul>
    </div>
  );
}
