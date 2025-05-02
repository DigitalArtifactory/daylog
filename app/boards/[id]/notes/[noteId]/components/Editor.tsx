'use client';

import { MarkdownIcon } from '@/components/icons';
import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import { getNote } from '../../lib/actions';
import EditorToolbar from './EditorToolbar';

type EditorType = {
  noteId: number;
  onUpdate?: (content: string, callback: () => void) => void;
};

export default function Editor({ noteId, onUpdate }: EditorType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    saveContent(newContent);
  };

  function saveContent(content: string) {
    setMarkdown(content);
    setIsSaving(true);
    if (onUpdate)
      onUpdate(content, () => {
        setIsSaving(false);
      });
  }

  useEffect(() => {
    const loadNote = async () => {
      const note = await getNote(noteId);
      if (note) {
        marked.setOptions({ breaks: true });
        setMarkdown(note.content);
      }
      setIsClient(true);
    };
    loadNote();
  }, [noteId]);

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
              <EditorToolbar
                onExecute={(prefix, postfix, comm) => {
                  const textarea = textareaRef.current;
                  if (textarea) {
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value.substring(start, end);
                    let newText = text;

                    if (comm === 'unordered-list') {
                      newText = text
                        .split('\n')
                        .map((line) => `- ${line}`)
                        .join('\n');
                    } else if (comm === 'ordered-list') {
                      newText = text
                        .split('\n')
                        .map((line, index) => `${index + 1}. ${line}`)
                        .join('\n');
                    } else {
                      newText = `${prefix}${text}${postfix}`;
                    }

                    textarea.value =
                      textarea.value.substring(0, start) +
                      newText +
                      textarea.value.substring(end);

                    // Update the cursor position to the start of the new text
                    textarea.selectionStart = textarea.selectionEnd = start;

                    textarea.focus();
                    saveContent(textarea.value);
                  }
                }}
              />
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
                  ref={textareaRef}
                  rows={4}
                  style={{
                    height: '400px',
                    fontFamily: 'geistMono',
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
            <div className="markdown p-3" style={{ minHeight: 400 }}>
              <div
                dangerouslySetInnerHTML={renderMarkdownToHtml(markdown ?? '')}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex card-footer p-1 justify-content-between">
        <a
          href="https://commonmark.org/help/"
          className="btn btn-ghost-secondary btn-sm"
          target="_blank"
        >
          <MarkdownIcon />
          Markdown is supported
        </a>
        {isSaving && (
          <span className="d-flex badge bg-blue-lt align-items-center">
            <div
              className="spinner-border spinner-border-sm text-blue me-1"
              role="status"
            />
            Saving changes...
          </span>
        )}
      </div>
    </div>
  );
}
