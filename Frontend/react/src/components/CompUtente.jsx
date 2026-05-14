import React from "react";
import { NavLink } from "react-router-dom";
import ImgUtente from "../assets/img-utente.webp";

function CompUtente() {
  return (
    <>
      <div className="container col-xxl-7 px-4 py-2 w-100">
      
        <div className="row flex-lg-row-reverse align-items-center py-5">
        
          <div className="col-lg-7 offset-lg-1 text-start">
           
            <p className="fs-1 fw-bold text-dark lh-base mb-3">
              Esplora posizioni su misura per il tuo profilo
            </p>
            <p className="text-dark fs-5 mb-5">
              Trova le aziende che cercano proprio il tuo talento. La nostra
              missione è connetterti con realtà che valorizzino la tua
              trasparenza e competenza.
            </p>
          </div>
          <div className="col-lg-4">
          
            <img
              src={ImgUtente}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
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

export default CompUtente;
