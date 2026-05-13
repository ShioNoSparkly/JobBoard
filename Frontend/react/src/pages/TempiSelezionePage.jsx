import { FaClock, FaUserTie, FaEnvelopeOpenText } from "react-icons/fa";

import { RiQrScanLine } from "react-icons/ri";

const TempiSelezionePage = () => {
  return (
    <>
      <section className="hero-section bg-img-tempi d-flex align-items-center py-5">
        <div className="overlay"></div>{" "}
        <div className="container py-5 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-white">
            Tempi di Selezione
          </h1>
          <p className="lead text-white fw-bold">
            La tua sicurezza e la trasparenza dei dati.
          </p>
        </div>
      </section>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              <section className="mb-4">
                <RiQrScanLine className="text-primary fs-3 mb-2" />
                <h4 className="fw-bold text-dark">Screening Iniziale</h4>
                <p>
                  I nostri recruiter esaminano i profili entro{" "}
                  <strong>48-72 ore</strong> lavorative dall'invio.
                </p>
              </section>

              <section className="mb-4">
                <FaUserTie className="text-primary fs-3 mb-2" />
                <h4 className="fw-bold text-dark">Primo Contatto</h4>
                <p>
                  Se il tuo profilo è in linea, verrai contattato per un
                  colloquio conoscitivo telefonico o via webcam.
                </p>
              </section>

              <section className="mb-4">
                <FaEnvelopeOpenText className="text-primary fs-3 mb-2" />
                <h4 className="fw-bold text-dark">Esito Finale</h4>
                <p>
                  Generalmente l'intero processo si conclude entro{" "}
                  <strong>2 settimane</strong>.
                </p>
                <p>
                  Riceverai sempre un feedback, sia positivo che negativo,
                  tramite email.
                </p>
              </section>

              <div className="alert alert-info border-0 shadow-sm">
                <strong>Nota bene:</strong> Alcune posizioni molto richieste
                potrebbero richiedere tempi leggermente più lunghi per la
                valutazione.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempiSelezionePage;
