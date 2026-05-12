function ModalDelete({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onCancel} />
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Elimina annuncio</h5>
                            <button type="button" className="btn-close" onClick={onCancel} />
                        </div>
                        <div className="modal-body">
                            <p>Sei sicuro di voler eliminare questo annuncio?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={onConfirm}>Elimina</button>
                            <button className="btn btn-secondary" onClick={onCancel}>Annulla</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}



export default ModalDelete