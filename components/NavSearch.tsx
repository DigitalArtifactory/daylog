'use client';

import { search, SearchResult } from '@/app/lib/actions';
import { truncateWord } from '@/utils/text';
import { useEffect, useRef, useState } from 'react';
import { ChalkboardIcon, NoteIcon, PuzzledIcon, SearchIcon } from './icons';

export default function NavSearch() {
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);

  const handleKeyDown = (key: string) => {
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        '#searchModal a.text-secondary'
      )
    );
    const active = document.activeElement as HTMLAnchorElement | null;
    const currentIndex = anchors.findIndex((a) => a === active);

    if (key === 'ArrowDown') {
      const nextIndex =
        currentIndex < anchors.length - 1 ? currentIndex + 1 : 0;
      anchors[nextIndex]?.focus();
    } else if (key === 'ArrowUp') {
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : anchors.length - 1;
      anchors[prevIndex]?.focus();
    } else if (key === 'Backspace') {
      searchInput.current?.focus();
    }
  };

  useEffect(() => {
    if (modalRef) {
      modalRef.current?.addEventListener('shown.bs.modal', () => {
        searchInput.current?.focus();
      });
    }
  }, [modalRef]);

  return (
    <>
      <div className="input-icon">
        <button
          accessKey="k"
          className="btn text-secondary rounded-pill justify-content-start px-2"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <SearchIcon /> Search
          <div className="d-flex gap-1 mx-1">
            <span className="badge badge-md border">Alt</span>
            <span className="badge badge-md border">K</span>
          </div>
        </button>
      </div>
      <div
        ref={modalRef}
        className="modal modal-lg fade"
        id="searchModal"
        tabIndex={-1}
        aria-hidden="true"
        aria-labelledby="searchModalLabel"
        onKeyDown={(e) => {
          handleKeyDown(e.key);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header px-2">
              <div className="input-icon w-full">
                <input
                  ref={searchInput}
                  type="text"
                  className="form-control form-control-rounded"
                  placeholder="Press [Backspace] to return to search input"
                  onChange={async (e) => {
                    const results = await search(e.target.value);
                    setResults(results);
                  }}
                />
                <span className="input-icon-addon">
                  <SearchIcon />
                </span>
              </div>
            </div>
            <div className="modal-body">
              {results.length === 0 ? (
                <div className="text-center">
                  <span>
                    <PuzzledIcon />
                  </span>
                  <div className="text-secondary">Empty results</div>
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {results.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-auto">
                          {item.type === 'note' ? (
                            <span title="Note">
                              <NoteIcon />
                            </span>
                          ) : (
                            <span title="Board">
                              <ChalkboardIcon />
                            </span>
                          )}
                        </div>
                        <div className="col">
                          <a
                            className="text-secondary focus-ring focus-ring-primary rounded py-1 px-2"
                            href={item.url}
                            aria-current="true"
                          >
                            {truncateWord(item.title, 120)}
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="row text-secondary">
                      <div className="col">
                        Press
                        <span className="badge badge-md border mx-1">
                          Enter
                        </span>
                        to open the selected result.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer text-secondary">
              <div className="d-flex gap-1 mx-1 my-0">
                Use
                <span className="badge badge-md border">Arrow Up</span>
                and
                <span className="badge badge-md border">Arrow Down</span>
                to navigate results.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
