import { useAuth } from '../context/AuthContext';

function Hero() {
  const { user } = useAuth();

  const heroContent = {

    candidato: {
      title: user ? `Ciao ${user.name}!` : "Trova il lavoro dei tuoi sogni!",
      subtitle: "Scopri le migliori offerte disponibili per la tua carriera.",
      paragrafo: "Inizia subito a esplorare gli annunci più adatti a te."
    },
    azienda: {
      title: user ? `Ciao, ${user.name}!` : "Pubblica le tue offerte di lavoro!",
      subtitle: "Seleziona i candidati ideali per la tua azienda.",
      paragrafo: "Gestisci le tue offerte e trova i profili migliori."
    },
    guest: {
      title: "Benvenuto su Jobboard!",
      subtitle: "Il portale che connette talenti e aziende.",
      paragrafo: "Accedi o registrati per iniziare."
    }
  };
  const currentHero = user?.role === "azienda"
    ? heroContent.azienda
    : heroContent.candidato;


  return (
    <>
        <section className="hero-section d-flex align-items-center py-5 bg-img-2">
          <div className="overlay z-0"></div>
          <div className="container py-5 position-relative">
            <h1 className="display-2 fw-bold mb-3 text-dark z-1 job-card-animate">
              {currentHero.title}
            </h1>
            <h3 className="lead text-dark fw-bold fs-2 mb-4 z-1 job-card-animate">
              {currentHero.subtitle}
            </h3>
            <p className="text-dark ead text-dark fw-bold fs-4 job-card-animate">
              {currentHero.paragrafo}
            </p>
          </div>
        </section>
    </>

  )
}

export default Hero