'use client';

import { search, SearchResult } from '@/app/lib/actions';
import { truncateWord } from '@/utils/text';
import { useEffect, useRef, useState } from 'react';

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
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          Search
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="modal-body">
              {results.length === 0 ? (
                <div className="text-center">
                  <span>
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
                      className="icon icon-tabler text-secondary icon-lg icons-tabler-outline icon-tabler-mood-puzzled mb-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" />
                      <path d="M10 10h.01" />
                      <path d="M14 8h.01" />
                      <path d="M12 15c1 -1.333 2 -2 3 -2" />
                      <path d="M20 9v.01" />
                      <path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                    </svg>
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
                                className="icon icon-tabler text-yellow icons-tabler-outline icon-tabler-note"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M13 20l7 -7" />
                                <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                              </svg>
                            </span>
                          ) : (
                            <span title="Board">
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
                                className="icon icon-tabler text-blue icons-tabler-outline icon-tabler-chalkboard"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" />
                                <path d="M11 16m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                              </svg>
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
