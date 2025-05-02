'use client';

import { truncateWord } from '@/utils/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type PageHeader = {
  title?: string | null;
  breadcrumbs?: Array<{ name: string; href: string }>;
};

export default function PageHeader({
  ...props
}: PropsWithChildren<PageHeader>) {
  const pathname = usePathname();

  async function isCurrentUrl(href: string): Promise<boolean> {
    return href === pathname;
  }

  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          {props.breadcrumbs && (
            <ol className="breadcrumb breadcrumb-muted">
              {props.breadcrumbs.map(async (item, index) => (
                <li
                  className={`breadcrumb-item ${
                    (await isCurrentUrl(item.href)) ? 'active' : null
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
          <h2 className="page-title" title={props.title ?? ''}>
            {truncateWord(props.title ?? '', 50) ?? (
              <div className="text-secondary">
                Loading<span className="animated-dots"></span>
              </div>
            )}
          </h2>
        </div>
        <div className="col-auto ms-auto">{props.children}</div>
      </div>
    </div>
  );
}
