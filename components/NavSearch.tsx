'use client';

import { search, SearchResult } from '@/app/lib/actions';
import { truncateWord } from '@/utils/text';
import {
  IconChalkboard,
  IconMoodCog,
  IconMoodPuzzled,
  IconMoodSpark,
  IconNote,
  IconSearch,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function NavSearch() {
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce search calls to avoid querying on every keystroke
  useEffect(() => {
    const DEBOUNCE_MS = 350;
    if (!query) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await search(query);
        if (!cancelled) setResults(res);
      } catch (e) {
        if (!cancelled) setResults([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query]);

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
      <button
        accessKey="k"
        data-bs-toggle="modal"
        data-bs-target="#searchModal"
        type='button'
        className="btn text-secondary rounded-pill justify-content-between"
      >
        <span className="d-flex align-items-center">
          <IconSearch size={20} style={{ marginRight: '5px' }} />
          Search
        </span>
        <div className="d-flex gap-1 ms-1 d-none d-md-inline-flex">
          <span className="badge badge-md border">Alt</span>
          +
          <span className="badge badge-md border">K</span>
        </div>
      </button>
      <div
        tabIndex={-1}
        ref={modalRef}
        id="searchModal"
        aria-hidden="true"
        className="modal modal-lg fade"
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className="input-icon-addon">
                  <IconSearch size={20} />
                </span>
              </div>
            </div>
            <div className="modal-body">
              {results.length === 0 ? (
                loading ? (
                  <div className="text-center text-secondary">
                    <span>
                      <IconMoodCog size={28} />
                    </span>
                    <div>Searching...</div>
                  </div>
                ) : (
                  <div className="text-center text-secondary">
                    <span>
                      <IconMoodPuzzled size={28} />
                    </span>
                    <div>Empty results</div>
                  </div>
                )
              ) : (
                <>
                  <div className="divide-y">
                    {results.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-auto">
                          {item.type === 'note' ? (
                            <span title="Note">
                              <IconNote
                                data-testid="note-icon"
                                color="orange"
                              />
                            </span>
                          ) : (
                            <span title="Board">
                              <IconChalkboard
                                data-testid="chalkboard-icon"
                                color="blue"
                              />
                            </span>
                          )}
                        </div>
                        <div className="col">
                          <Link
                            target='_top'
                            className="text-secondary focus-ring focus-ring-primary rounded py-1 px-2"
                            href={item.url}
                            aria-current="true"
                          >
                            {truncateWord(item.title, 120)}
                          </Link>
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
