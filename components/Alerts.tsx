'use client';

import { useSearchParams } from 'next/navigation';

export default function Alert () {
  const searchParams = useSearchParams();
  const saved = searchParams.get('saved');

  return (
    <>
      {saved == 'true' && (
        <div className="alert alert-success alert-dismissible" role="alert">
          <div className="d-flex">
            <div>
              <h4 className="alert-title">Saved changes</h4>
              <div className="text-secondary">Your changes has been saved!</div>
            </div>
          </div>
          <a
            role="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="close"
          ></a>
        </div>
      )}
    </>
  );
}
