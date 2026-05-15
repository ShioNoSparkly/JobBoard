import React from "react";
import { NavLink } from "react-router-dom";
import PartnerImg from "../assets/img-partner.webp";

function Aziende() {
  return (
    <>
      <div className="container col-xxl-7 px-4 py-2 w-100">
        <div className="row flex-lg-row-reverse align-items-center py-5">
          <div className="col-lg-7 offset-lg-1 text-center text-lg-start">
            <p className="fs-1 fw-bold text-dark lh-base mb-3">
              Serietà, affidabilità e successo: <br/> il nostro impegno per le aziende
            </p>
            <p className="text-dark fs-5 mb-4 mb-lg-5">
              In un mercato in costante evoluzione, la nostra missione è fornire
              soluzioni strategiche che trasformino le sfide in opportunità
              concrete. Crediamo che la crescita di un'impresa passi attraverso
              una partnership basata sulla trasparenza e sulla competenza
              tecnica: per questo affianchiamo ogni cliente con un approccio su
              misura, garantendo il supporto necessario per consolidare il
              proprio successo e costruire un futuro solido e competitivo.
            </p>

            <div className="d-flex justify-content-center justify-content-md-start pt-lg-4 mb-5 mb-lg-0">
              <NavLink
                to="https://mail.google.com/mail/?view=cm&fs=1&to=contatti@jobboard-agency.it"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-4 py-2 px-lg-4 py-lg-3 fs-6 fs-lg-5 fw-bold w-auto"
                type="button"
              >
                CONTATTACI
              </NavLink>
            </div>
          </div>
          <div className="col-lg-4">
            <img
              src={PartnerImg}
              className="d-block mx-lg-auto img-fluid"
              alt="Partnership"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Aziende;
