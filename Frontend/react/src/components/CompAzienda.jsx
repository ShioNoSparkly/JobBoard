import React from "react";

import { NavLink } from "react-router-dom";

import ImgAzienda from "../assets/img-azienda.webp";

function CompAzienda() {
  return (
    <>
      <div className="container col-xxl-7 px-4 py-2 w-100 border-top border-primary">
        <div className="row flex-lg-row-reverse align-items-center py-5">
          <div className="col-lg-7 offset-lg-1 text-start">
            <p className="fs-1 fw-bold text-dark lh-base mb-3">
              Visualizza potenziali talenti in target
            </p>

            <p className="text-dark fs-5 mb-5">
              Esplora una selezione curata di candidati pronti a trasformare le
              tue sfide in successi.
            </p>
          </div>

          <div className="col-lg-4">
            <img
              src={ImgAzienda}
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

export default CompAzienda;
