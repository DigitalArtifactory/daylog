'use client';

import Loader from '@/components/Loader';
import Image from 'next/image';
import { useState } from 'react';

type UnsplashImage = {
  id: string;
  description: string | null;
  user: { name: string; username: string };
  urls: { small: string; regular: string; thumb: string };
  links: { download: string };
};

export default function UnsplashImagesDropdown({
  imageSelected,
}: {
  imageSelected: (imageUrl: string) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selection, setSelection] = useState<string>('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const debounceSearch = (
    keyword: string,
    page: number,
    time: number = 1000 // Waits for 1 second of inactivity before searching
  ) => {
    // Clear the previous timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set a new timer
    const timeout = setTimeout(async () => {
      await fetchImages(keyword, page);
    }, time);

    setDebounceTimer(timeout);
  };

  const fetchImages = async (keyword: string, page: number) => {
    if (!keyword || keyword.length < 2) {
      setImages([]);
      return;
    }

    setLoading(true);
    const res = await fetch(
      `/api/v1/images/unsplash?keyword=${keyword}&page=${page}&per_page=9`
    ).finally(() => {
      setKeyword(keyword);
      setLoading(false);
      setPage(page);
    });
    const images = await res.json();

    setImages(images.results);
  };

  const selectedImage = images.find((image) => image.id === selection);

  return (
    <div className="dropdown">
      <button
        className={`btn w-full ${
          imageUrl ? 'btn-success' : 'btn'
        } dropdown-toggle`}
        type="button"
        id="unsplashImagesDropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Search Unsplash images
      </button>
      <div className="dropdown-menu p-3">
        <div className="mb-3">
          <label className="form-label">Search by keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type any keyword"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                debounceSearch(e.currentTarget.value, 1, 0);
              }
            }}
            onChange={async (e) => {
              debounceSearch(e.target.value, 1);
            }}
          />
        </div>
        <div className="d-flex flex-wrap pt-2" style={{ width: '456px' }}>
          {loading && <Loader caption="Loading images..."></Loader>}
          {!loading && images.length === 0 && (
            <div className="text-secondary w-full text-center py-4">
              No images found
            </div>
          )}
          {images.map((image) => (
            <div key={image.id} className="col-6 col-sm-4 p-1">
              <label className="form-imagecheck h-100">
                <input
                  name="form-imagecheck-radio"
                  type="radio"
                  value={image.id}
                  className="form-imagecheck-input"
                  checked={selection === image.id}
                  onChange={() => {
                    setSelection(image.id);
                    setImageUrl(image.urls.regular);
                    imageSelected(image.urls.regular);
                  }}
                />
                <span className="form-imagecheck-figure h-100">
                  <Image
                    title={'Photo by ' + image.user.name + ' on Unsplash'}
                    src={image.urls.thumb}
                    alt={image.description || 'Unsplash image'}
                    width={150}
                    height={0}
                    style={{
                      width: 'auto',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                    className="form-imagecheck-image h-100"
                    priority
                  />
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className="d-flex flex-row gap-1 justify-content-between pb-2">
          {selectedImage && (
            <a
              href={`https://unsplash.com/@${selectedImage?.user.username}`}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="btn btn-sm btn-link text-secondary"
            >
              Photo by {selectedImage?.user.name} on Unsplash
            </a>
          )}
          {(images.length > 0 || loading) && (
            <div className="d-flex flex-row w-full justify-content-end gap-1">
              <button
                type="button"
                disabled={loading}
                className="btn btn-sm"
                onClick={async () => {
                  await fetchImages(keyword, page - 1);
                }}
              >
                {'<'} Previous
              </button>
              <button
                type="button"
                disabled={loading}
                className="btn btn-sm"
                onClick={async () => {
                  await fetchImages(keyword, page + 1);
                }}
              >
                Next {'>'}
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-link text-secondary mt-1"
          onClick={async () => {
            setImageUrl('');
            setSelection('');
            imageSelected('');
          }}
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
            className="icon icon-tabler icon-tabler-trash icons-tabler-outline"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          Clear selection
        </button>
      </div>
    </div>
  );
}
