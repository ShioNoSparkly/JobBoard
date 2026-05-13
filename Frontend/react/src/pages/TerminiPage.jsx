import {
  FaFileSignature,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsersCog,
} from "react-icons/fa";

const TerminiPage = () => {
  return (
    <>
      <section className="hero-section bg-img-termini d-flex align-items-center py-5">
        <div className="overlay"></div>{" "}
        <div className="container py-5 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-white">Termini e condizioni</h1>
          <p className="lead text-white fw-bold">
            Tutto ciò che c'è da sapere per navigare sulla nostra piattaforma in modo sicuro e consapevole.
          </p>
        </div>
      </section>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              <div className="mb-4">
                <FaCheckCircle className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold">Registrazione e Account</h5>
                <p>
                  L'utente si impegna a fornire informazioni veritiere. È tua
                  responsabilità mantenere segrete le tue credenziali di
                  accesso.
                </p>
              </div>

              <div className="mb-4">
                <FaExclamationTriangle className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold">Uso consentito</h5>
                <p>
                  È vietato utilizzare il sito per scopi illeciti o caricare
                  documenti falsi. Ogni abuso comporterà la sospensione
                  dell'account.
                </p>
              </div>

              <div className="mb-4">
                <FaUsersCog className="text-primary fs-3 mb-2" />
                <h5 className="fw-bold text-dark">Responsabilità</h5>
                <p>
                  JobBoard agisce come intermediario. Non siamo responsabili per
                  l'esito dei colloqui o per discrepanze nelle descrizioni
                  aziendali.
                </p>
              </div>

              <div className="p-3 bg-light rounded mt-3">
                <p className="small text-muted mb-0 italic">
                  Ci riserviamo il diritto di modificare questi termini. L'uso
                  del sito costituisce accettazione automatica delle nuove
                  clausole.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminiPage;
