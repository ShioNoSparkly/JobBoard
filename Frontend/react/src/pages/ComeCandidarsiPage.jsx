import { FaPaperPlane, FaSearchLocation, FaMousePointer } from "react-icons/fa";
import { RiMailSendFill } from "react-icons/ri";

const CandidaturaPage = () => {
  return (
    <>
      <section className="hero-section bg-img-candidarsi d-flex align-items-center py-5">
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
              <div className="mb-4">
                <FaSearchLocation className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold">Trova l'offerta</h5>
                <p>
                  Utilizza la barra di ricerca nella Home per filtrare le
                  offerte per posizione o città.
                </p>
              </div>

              <div className="mb-4">
                <FaMousePointer className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold">Seleziona e Leggi</h5>
                <p>
                  Clicca sul titolo dell'annuncio per leggere i requisiti e i
                  dettagli dell'offerta.
                </p>
              </div>

              <div className="mb-4">
                <RiMailSendFill className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold text-dark">Invia la candidatura</h5>
                <p>
                  Clicca sul tasto azzurro "Candidati Ora" presente in fondo
                  alla pagina dell'annuncio.
                </p>
                <p>
                  Riceverai una mail di conferma non appena la tua richiesta
                  sarà inoltrata.
                </p>
              </div>

              <div className="p-3 bg-light rounded ">
                <p className="small text-muted mb-0">
                  Puoi monitorare lo stato delle tue candidature direttamente
                  dalla tua Dashboard personale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidaturaPage;
