import { useAuth } from '../context/AuthContext';

function Hero() {
  const {user} = useAuth();

  const heroContent = {
   candidato: {
      title: "Trova il lavoro dei tuoi sogni!",
      subtitle: "Scopri le migliori offerte disponibili per la tua carriera.",
    },

    azienda: {
      title: "Scopri i migliori talenti!",
      subtitle: "Pubblica offerte e seleziona i candidati ideali per la tua azienda.",
    },
  };

  const currentHero = user?.role === "azienda"
      ? heroContent.azienda
      : heroContent.candidato;


    return(
<>
 <section className="hero-section d-flex align-items-center py-5 bg-img-2">
        <div className= "overlay z-0"></div>
          <div className="container py-5 position-relative">
            <h1 className="display-3 fw-bold mb-3 text-dark z-1">
               {currentHero.title}
            </h1>
            <p className="lead text-dark fw-bold fs-4">
               {currentHero.subtitle}
            </p>
          </div>
      </section>
</>

    )
}

export default Hero