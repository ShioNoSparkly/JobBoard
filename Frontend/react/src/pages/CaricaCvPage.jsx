import {
  FaFileUpload,
  FaSearch,
  FaMousePointer,
  FaCheckCircle,
} from "react-icons/fa";

const CaricaCVPage = () => {
  return (
    <>
      <section className="hero-section bg-img-ccv d-flex align-items-center py-5">
        <div className="overlay"></div>{" "}
        <div className="container py-5 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-white">
            Come inviare il tuo CV
          </h1>
          <p className="lead text-white fw-bold">
            {" "}
            Segui questi semplici passaggi per candidarti alle nostre offerte
          </p>
        </div>
      </section>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              <section className="mb-5">
                
                  <FaSearch className="text-primary fs-3 mb-2" />
                  <h4 className="fw-bold mb-0">1. Trova l'annuncio</h4>
               
                <p>
                  Dalla <strong>Home</strong>, esplora le posizioni aperte o usa
                  la barra di ricerca per trovare il lavoro più adatto a te.
                </p>
              </section>

              <section className="mb-5">
                
                  <FaMousePointer className="text-primary fs-3 mb-2" />
                  <h4 className="fw-bold mb-0">2. Accedi ai dettagli</h4>
               
                <p>
                  Clicca su dettagli sulla scheda del lavoro per leggere la descrizione
                  completa. Se è quello giusto, clicca sul pulsante azzurro{" "}
                  <strong>"Candidati ora"</strong>.
                </p>
              </section>

              <section className="mb-5">
                <FaFileUpload className="text-primary fs-3 mb-2" />
                <h4 className="fw-bold text-dark mb-3">3. Carica il file</h4>
                <p>
                  Si aprirà una finestra dove potrai selezionare il tuo CV dal
                  tuo dispositivo.
                </p>

                <div className="bg-light p-3 rounded d-inline-block mt-2">
                  <p className="small mb-1">
                    <strong>Formati accettati:</strong> PDF (consigliato), DOCX
                  </p>
                  <p className="small mb-0 text-muted">
                    Dimensione massima: 5MB
                  </p>
                </div>
              </section>

              <section className="mb-5">
                <h4 className="fw-bold text-primary">Conferma l'invio</h4>
                <p>
                  Dopo aver scelto il file, clicca su{" "}
                  <strong>"Invia Candidatura"</strong>. Riceverai un messaggio
                  di conferma a schermo e via email.
                </p>
              </section>

              <div className="alert alert-success border-0 shadow-sm d-inline-block px-4">
                <FaCheckCircle className="me-2" />
                <strong>Pronto!</strong> Il tuo profilo verrà inoltrato
                direttamente ai recruiter dell'annuncio.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaricaCVPage;
