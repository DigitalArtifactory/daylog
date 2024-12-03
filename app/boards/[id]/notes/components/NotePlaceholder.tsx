export default function CardPlaceholder() {
  return (
    <>
      <div className="card placeholder-glow">
        <div className="ratio ratio-21x9 card-img-top placeholder"></div>
        <div className="card-body pt-3 mt-1">
          <div className="placeholder col-9 mb-3"></div>
          <div className="placeholder placeholder-sm col-10 my-2"></div>
          <div className="w-100 mb-1"></div>
          <div className="placeholder placeholder-xs col-3 mt-4"></div>
          <div className="placeholder placeholder-xs col-4 offset-5 mt-4 py-2"></div>
          <div className="mt-2"></div>
        </div>
      </div>
    </>
  );
}
