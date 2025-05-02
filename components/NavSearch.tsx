'use client';

import { search, SearchResult } from '@/app/lib/actions';
import { truncateWord } from '@/utils/text';
import { useEffect, useRef, useState } from 'react';
import { ChalkboardIcon, NoteIcon, PuzzledIcon, SearchIcon } from './icons';

export default function NavSearch() {
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);

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
          className="btn text-secondary rounded-pill justify-content-start px-4"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <SearchIcon /> Search
        </button>
      </div>
      <div
        ref={modalRef}
        className="modal modal-lg fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header px-2">
              <div className="input-icon w-full">
                <input
                  ref={searchInput}
                  type="text"
                  className="form-control form-control-rounded"
                  placeholder="Search…"
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
                            className="text-secondary"
                            href={item.url}
                            aria-current="true"
                          >
                            {truncateWord(item.title, 120)}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">Search for boards and notes</div>
          </div>
        </div>
      </div>
    </>
  );
}
