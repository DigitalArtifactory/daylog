'use client';

import { IconFileSmile, IconMarkdown } from '@tabler/icons-react';
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
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    localStorage.setItem(`note-${noteId}`, newContent);
    if (newContent === markdown) return;
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

    window.addEventListener('storage', (event) => {
      if (event.key === `note-${noteId}`) {
        const storedContent = localStorage.getItem(`note-${noteId}`);
        if (storedContent !== null) {
          setMarkdown(storedContent);
          if (textareaRef.current) {
            textareaRef.current.value = storedContent;
          }
        }
      }
    });
  }, [noteId]);

  const renderMarkdownToHtml = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
    <div className="card">
      <div className="card-header pt-2">
        <ul className="nav nav-tabs card-header-tabs">
          {isClient ? (
            <>
              <li className="nav-item d-block d-md-none">
                <button
                  className="nav-link"
                  title={isPreviewVisible ? 'Editor' : 'Preview'}
                  onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                >
                  {isPreviewVisible ? 'Editor' : 'Preview'}
                </button>
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
        <div className="row m-0">
          <div
            className={`col px-1 ${
              isPreviewVisible ? 'd-none d-md-block' : ''
            }`}
          >
            {isClient && (
              <textarea
                ref={textareaRef}
                rows={4}
                style={{
                  minHeight: '400px',
                  fontFamily: 'geistMono',
                  fontSize: '14px',
                }}
                name="content"
                className="form-control p-3 border-0 rounded-0 h-full"
                placeholder="Here can be your description"
                defaultValue={markdown ?? ''}
                onChange={handleChange}
              />
            )}
          </div>
          <div
            className={`col ${
              isPreviewVisible &&
              !window.matchMedia('(min-width: 768px)').matches
                ? ''
                : 'd-none d-md-block'
            }`}
          >
            <div className="w-full h-full p-3">
              {markdown ? (
                <div className="markdown" style={{ minHeight: 400 }}>
                  <div
                    dangerouslySetInnerHTML={renderMarkdownToHtml(
                      markdown ?? ''
                    )}
                  ></div>
                </div>
              ) : (
                <div className="d-flex h-full align-items-center justify-content-center text-secondary opacity-25">
                  <IconFileSmile size={70} />
                </div>
              )}
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
          <IconMarkdown />
          <span className="ms-1">Markdown is supported</span>
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
