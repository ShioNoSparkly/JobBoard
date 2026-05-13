import { FaShieldAlt, FaUserLock, FaEnvelope } from "react-icons/fa";

const PrivacyPage = () => {
  return (
    <>
    <section className="hero-section bg-img-privacy d-flex align-items-center py-5">
        <div className="overlay"></div>{" "}
        <div className="container py-5 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-white">Privacy Policy</h1>
          <p className="lead text-white fw-bold">
            La tua sicurezza e la trasparenza dei dati.
          </p>
        </div>
      </section>
    <div className="container py-4">
      
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <div className="card shadow-sm border-0 p-4 p-md-5">
            <section className="mb-4">
              <h4 className="fw-bold text-primary">Titolare del Trattamento</h4>
              <p>
                Il titolare del trattamento dei dati è{" "}
                <strong>JobBoard Agency S.p.A.</strong>, con sede legale in
                Italia.
              </p>
              <p>
                Per qualsiasi domanda, puoi contattarci all'indirizzo dedicato:
              </p>
              <div className="bg-light p-3 rounded d-inline-flex align-items-center">
                <FaEnvelope className="me-2 text-primary" />
                <code className="text-dark">privacy@jobboard-agency.it</code>
              </div>
            </section>

            <section className="mb-4">
              <h4 className="fw-bold text-primary">Quali dati raccogliamo?</h4>
              <p className="mb-1">
                <strong>Dati identificativi:</strong> Nome.
              </p>
              <p className="mb-1">
                <strong>Dati di contatto:</strong> Email.
              </p>
              <p>
                <strong>Dati professionali:</strong> Curriculum Vitae.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="fw-bold text-primary">Finalità del trattamento</h4>
              <p className="mb-1">
                Candidatura agli annunci di lavoro presenti in piattaforma.
              </p>
              <p className="mb-1">
                Creazione e gestione del tuo profilo personale.
              </p>
              <p>
                Invio di notifiche su nuove opportunità in linea con le tue
                competenze.
              </p>
            </section>

            <section>
              <h4 className="fw-bold text-primary">I tuoi diritti</h4>
              <p>
                Ai sensi del GDPR, hai il diritto di accedere ai tuoi dati,
                chiederne la rettifica, la cancellazione o la limitazione in
                qualsiasi momento tramite le impostazioni del tuo profilo.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPage;
