import React from "react";
import { NavLink } from "react-router-dom";
import ImgUtente from "../assets/img-utente.webp";

function ComponenteDettaglio() {
  return (
    <>
      <div className="container col-xxl-7 px-4 py-2 w-100">
      
        <div className="row flex-lg-row-reverse align-items-center py-5">
        
          <div className="col-lg-7 offset-lg-1 text-start">
           
            <p className="fs-1 fw-bold text-dark lh-base mb-3">
             Il lavoro dei tuoi sogni ti sta aspettando
            </p>
            <p className="text-dark fs-5 mb-5">
            Ogni giorno nuove aziende pubblicano offerte di lavoro su JobBoard. 
      Che tu sia alla ricerca del tuo primo impiego o pronto per una nuova sfida, 
      qui trovi opportunità in tutta Italia — dal Nord al Sud, in ogni settore.
            </p>
          </div>
          <div className="col-lg-4">
          
            <img
              src="https://thumbs.dreamstime.com/b/recruitment-hiring-career-job-emplyment-concept-73027720.jpg"
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

export default ComponenteDettaglio;
