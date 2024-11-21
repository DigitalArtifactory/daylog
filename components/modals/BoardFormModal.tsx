type BoardFormModalType = {
  boardId?: number | null;
  modalId: string;
  mode: 'update' | 'create';
};

export default function BoardFormModal({ ...props }: BoardFormModalType) {
  return (
    <div className="modal" id={props.modalId} tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.mode === 'create'
                ? 'Create board'
                : 'Update board'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" name="image" />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Your board title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Type any description"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn me-auto"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              {props.mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
