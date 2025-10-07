'use client';

import { truncateWord } from '@/utils/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type PageHeader = {
  title?: string | null;
  description?: string | null;
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
    <div className="page-header mt-0">
      <div className="container-xl pt-3">
        <div className="row align-items-center">
          <div className="col">
            {props.breadcrumbs && (
              <ol className="breadcrumb">
                {props.breadcrumbs.map((item, index) => (
                  <li
                    className={`breadcrumb-item ${isCurrentUrl(item.href) ? 'active' : null}`}
                    key={index}
                  >
                    <Link href={item.href} title={item.name}>
                      {truncateWord(item.name, 30)}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
            <div className="py-3">
              <h1 className="page-title" title={props.title ?? ''}>
                {truncateWord(props.title ?? '', 50) ?? (
                  <div className="text-secondary">
                    Loading<span className="animated-dots"></span>
                  </div>
                )}
              </h1>
              <p className="text-muted">{props.description}</p>
            </div>
          </div>
          <div className="col">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
