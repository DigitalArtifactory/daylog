export default function Loader({ caption }: { caption: string }) {
  return (
    <div className="d-flex w-full justify-content-center">
      <div className="text-center w-50" style={{ maxWidth: '200px' }}>
        <div className="text-secondary mb-3">{caption}</div>
        <div className="progress progress-sm">
          <div className="progress-bar progress-bar-indeterminate"></div>
        </div>
      </div>
    </div>
  );
}
