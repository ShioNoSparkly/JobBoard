import { FaCookieBite, FaInfoCircle } from "react-icons/fa";

const CookiePage = () => {
  return (
    <>
      <section className="hero-section bg-img-cookie d-flex align-items-center py-5">
        <div className="overlay"></div>{" "}
        <div className="container py-5 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-white">Cookie Policy</h1>
          <p className="lead text-white fw-bold">
                Utilizziamo i cookie per migliorare la tua esperienza su
                JobBoard.
          </p>
        </div>
      </section>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-sm border-0 p-4 p-md-5">

              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h6 className="fw-bold text-primary">Tecnici</h6>
                    <p className="small text-muted mb-0">
                      Essenziali per il funzionamento del sito.
                    </p>
                    <span className="badge bg-success mt-2">Necessario</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h6 className="fw-bold text-primary">Analitici</h6>
                    <p className="small text-muted mb-0">
                      Per capire come usi la piattaforma.
                    </p>
                    <span className="badge bg-secondary mt-2">Opzionale</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h6 className="fw-bold text-primary">Profilazione</h6>
                    <p className="small text-muted mb-0">
                      Per annunci di lavoro pertinenti.
                    </p>
                    <span className="badge bg-secondary mt-2">Opzionale</span>
                  </div>
                </div>
              </div>

              <div className="alert alert-info border-0 shadow-sm">
                <FaInfoCircle className="mb-2 fs-4 d-block mx-auto" />
                <strong>Gestione:</strong> Puoi disabilitare i cookie dalle
                impostazioni del browser. Senza i cookie tecnici, alcune
                funzioni potrebbero non essere disponibili.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePage;
