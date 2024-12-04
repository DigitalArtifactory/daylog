'use client';

import { marked } from 'marked';
import { useEffect, useState } from 'react';
import EditorToolbar from './EditorToolbar';

type EditorType = {
  content?: string | null | undefined;
  onUpdate?: (content: string) => void | null;
};

export default function Editor({ content, onUpdate }: EditorType) {
  const [markdown, setMarkdown] = useState<string>('');

  const [isClient, setIsClient] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setMarkdown(newContent);
    if (onUpdate) onUpdate(newContent); // Llama a la función pasada como prop con el texto plano
  };

  useEffect(() => {
    marked.setOptions({ breaks: true });
    setMarkdown(content ?? '');
    setIsClient(true);
  }, [content]);

  const renderMarkdownToHtml = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
    <div className="card">
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
            <div
              className="d-flex align-items-center"
              style={{ height: '37px' }}
            >
              <div className="spinner-border text-secondary"></div>
            </div>
          )}
        </ul>
      </div>
      <div className="card-body p-0">
        <div className="tab-content">
          <div className="tab-pane active show" id="tabs-write">
            <div>
              {isClient ? (
                <textarea
                  rows={4}
                  style={{
                    height: '200px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                  }}
                  name="content"
                  className="form-control p-3 border-0"
                  placeholder="Here can be your description"
                  defaultValue={markdown ?? ''}
                  onChange={handleChange}
                />
              ) : (
                <div
                  className="d-flex justify-content-center pt-4"
                  style={{ height: '37px' }}
                >
                  <div className="spinner-border text-secondary"></div>
                </div>
              )}
            </div>
          </div>
          <div className="tab-pane" id="tabs-preview">
            <div className="markdown p-3" style={{ minHeight: 200 }}>
              <div
                dangerouslySetInnerHTML={renderMarkdownToHtml(markdown)}
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
