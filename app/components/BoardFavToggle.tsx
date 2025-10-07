'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BoardFavSwitch({
  showFavParam = false,
}: {
  showFavParam?: boolean;
}) {
  const router = useRouter();

  const [showFav, setShowFav] = useState(showFavParam);

  const handleCheckFav = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const params = new URLSearchParams(window.location.search);

    params.set('showFav', isChecked ? 'true' : 'false');
    router.prefetch('/');
    router.push('?' + params.toString());

    setShowFav(isChecked);
  };

  return (
    <div className="btn-group w-fit ms-auto" role="group" aria-label="Favorites toggle">
      <button
        type="button"
        className={`btn btn-outline-primary ${!showFav ? 'active' : ''}`}
        onClick={() =>
          handleCheckFav({
            target: { checked: false },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        Show recent
      </button>
      <button
        type="button"
        className={`btn btn-outline-primary ${showFav ? 'active' : ''}`}
        onClick={() =>
          handleCheckFav({
            target: { checked: true },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        Favorites
      </button>
    </div>
  );
}
