function ModalCandidate({
    isOpen,
    onCancel,
    onSubmit,
    coverLetter, setCoverLetter,
    cvFile, setCvFile,
     error, setError
}) {

    if (!isOpen) return null;

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Invia candidatura
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onCancel}>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">
                                Lettera di presentazione
                            </label>
                            <textarea
                                className="form-control"
                                rows="5"
                                value={coverLetter}
                                onChange={(e) =>
                                    setCoverLetter(e.target.value)
                                }
                                placeholder="Scrivi la tua presentazione..." />

                                {(error && <small className='text-danger'>{error[0]}</small>)}
                        </div>


                        {/* <div className="mb-3">
                            <label className="form-label">
                                Carica CV
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    setCvFile(e.target.files[0])} />
                                    {(error && <small className='text-danger'>{error[1]}</small>)}
                        </div> */}
                          
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}>
                            Annulla
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={onSubmit}>
                            Invia candidatura
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCandidate;