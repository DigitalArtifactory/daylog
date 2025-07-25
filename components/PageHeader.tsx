'use client';

import { getImageUrlOrFile } from '@/utils/image';
import { truncateWord } from '@/utils/text';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type PageHeader = {
  title?: string | null;
  imageUrl?: string | null;
  breadcrumbs?: Array<{ name: string; href: string }>;
};

export default function PageHeader({
  ...props
}: PropsWithChildren<PageHeader>) {
  const pathname = usePathname();

  function isCurrentUrl(href: string): boolean {
    return href === pathname;
  }

  return (
    <>
      <div className={`page-header ${props.imageUrl ? 'text-white' : ''}`}>
        <div className="row align-items-center">
          <div className="col">
            {props.breadcrumbs && (
              <ol className="breadcrumb breadcrumb-muted">
                {props.breadcrumbs.map(async (item, index) => (
                  <li
                    className={`breadcrumb-item ${
                      isCurrentUrl(item.href) ? 'active' : null
                    }`}
                    key={index}
                  >
                    <Link href={item.href} title={item.name}>
                      {truncateWord(item.name, 30)}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="d-flex flex-column flex-md-row gap-1 align-items-start">
            <h2 className="page-title" title={props.title ?? ''}>
              {truncateWord(props.title ?? '', 50) ?? (
                <div className="text-secondary">
                  Loading<span className="animated-dots"></span>
                </div>
              )}
            </h2>
            <div className="ms-auto">{props.children}</div>
          </div>
        </div>
      </div>
      {props.imageUrl && (
        <div className="position-absolute z-n1 start-0 border-bottom">
          <Image
            width={1920}
            height={0}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              overflowX: 'clip',
              minWidth: '100%',
              maxHeight: '130px',
            }}
            src={getImageUrlOrFile(props.imageUrl)}
            alt={`Preview image of ${props.title}`}
            priority={true}
          />
          <div
            className="position-absolute start-0 top-0"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(30, 30, 50, 0.6), rgba(255, 255, 255, 0))',
              pointerEvents: 'none',
              height: '100%',
              width: '100%',
            }}
          ></div>
        </div>
      )}
    </>
  );
}
