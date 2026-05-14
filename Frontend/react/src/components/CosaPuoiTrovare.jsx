import React from "react";
import { NavLink } from "react-router-dom";

function CosaPuoiTrovare() {
  // Se non hai un'immagine locale, puoi usare un URL o lasciarlo vuoto
  const placeholderImg = "https://via.placeholder.com/600x400";

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-6">
          <div className="custom-card-wrapper shadow">
            <img
              src="INSERISCI_QUI_IL_TUO_URL"
              className="card-img-bg"
              alt="Produzione"
            />


            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4">produzione</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="custom-card-wrapper shadow">
            <img
              src="INSERISCI_QUI_IL_TUO_URL"
              className="card-img-bg"
              alt="Produzione"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4">produzione</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="custom-card-wrapper shadow">
            <img
              src="INSERISCI_QUI_IL_TUO_URL"
              className="card-img-bg"
              alt="Produzione"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4">produzione</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">

          <div className="custom-card-wrapper shadow">
            <img
              src="INSERISCI_QUI_IL_TUO_URL"
              className="card-img-bg"
              alt="Produzione"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4">produzione</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="custom-card-wrapper shadow">
            <img
              src="INSERISCI_QUI_IL_TUO_URL"
              className="card-img-bg"
              alt="Produzione"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4">produzione</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CosaPuoiTrovare;
