'use client';

import { micromark } from 'micromark';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditorToolbar from './EditorToolbar';

export default function Editor({ content }: { content: string }) {
  const router = useRouter();

  const [markdown, setMarkdown] = useState(content);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setHtmlContent(micromark(markdown));
    setIsClient(true);
  }, []);

  return (
    <div className="card" style={{ minHeight: 160 }}>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
          {isClient ? (
            <>
              <li className="nav-item">
                <a
                  href="#tabs-write"
                  className="nav-link active"
                  data-bs-toggle="tab"
                >
                  Write
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#tabs-preview"
                  className="nav-link"
                  data-bs-toggle="tab"
                >
                  Preview
                </a>
              </li>
              <EditorToolbar />
            </>
          ) : (
            <div style={{ height: '37px' }}></div>
          )}
        </ul>
      </div>
      <div className="card-body p-0">
        <div className="tab-content">
          <div className="tab-pane active show" id="tabs-write">
            <div>
              <textarea
                rows={4}
                className="form-control p-3 border-0"
                placeholder="Here can be your description"
                defaultValue={markdown}
                onChange={(e) => {
                  setMarkdown(e.target.value);
                  router.refresh();
                }}
              />
            </div>
          </div>
          <div className="tab-pane" id="tabs-preview">
            <div className="markdown p-3">
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent ?? '' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer p-1">
        <a
          href="https://commonmark.org/help/"
          className="btn btn-ghost-secondary btn-sm"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-markdown"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M7 15v-6l2 2l2 -2v6" />
            <path d="M14 13l2 2l2 -2m-2 2v-6" />
          </svg>
          Markdown is supported
        </a>
      </div>
    </div>
  );
}
