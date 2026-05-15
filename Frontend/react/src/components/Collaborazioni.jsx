import React from "react";
import { NavLink } from "react-router-dom";
import Coop from "../assets/svg-coop.svg";
import Wind from "../assets/svg-wind.svg";
import AutoGrill from "../assets/svg-autogrill.svg";
import Conad from "../assets/svg-conad.svg";
import Enel from "../assets/svg-enel.svg";
import Fincantieri from "../assets/svg-fincantieri.svg";
import DHL from "../assets/svg-dhl.svg"
import Linkedin from "../assets/svg-linkedin.svg"


function Collaborazioni() {
  return (
    <>
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 text-dark fw-bold border-top border-primary pt-5 mb-3">
          Le nostre collaborazioni
        </h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center align-items-stretch g-4 py-5">
          <div className="col">
            <NavLink to="https://www.linkedin.com" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={Linkedin}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>{" "}
            </NavLink>
          </div>

          <div className="col">
            <NavLink to="https://www.coop.it" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={Coop}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>

          <div className="col">
            {" "}
            <NavLink to="https://www.windtre.it/" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={Wind}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>

          <div className="col">
            {" "}
            <NavLink to="https://www.autogrill.com" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={AutoGrill}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>

          <div className="col">
            <NavLink to="https://www.conad.it" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img 
                    src={Conad}
                    alt="Logo Azienda"
                    width="120"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="https://www.enel.com" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={Enel}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="https://www.fincantieri.com" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={Fincantieri}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="https://www.dhl.com" className="card-hover" target="_blank">
              <div className="card h-100 overflow-hidden rounded-2 shadow-sm border-0 bg-white">
                <div className="d-flex flex-column h-100 p-4 align-items-center justify-content-center text-dark">
                  <img
                    src={DHL}
                    alt="Logo Azienda"
                    width="150"
                    height="90"
                    className="mb-3"
                  />
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collaborazioni;
