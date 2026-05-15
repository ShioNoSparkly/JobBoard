import React from "react";
import { NavLink } from "react-router-dom";
import Muratore from "../assets/img-muratore.webp";
import FrontEnd from "../assets/img-front.webp";
import BackEnd from "../assets/img-back.webp";
import DataAnalyst from "../assets/img-data.webp";

function CosaPuoiTrovare() {
  const placeholderImg = "https://via.placeholder.com/600x400";

  return (
    <div className="container my-5 border-top border-primary mt-5 pt-5">
      <h2 className="pb-2 mb-5 text-dark fw-bold">Le tue opportunità</h2>
      <div className="row justify-content-center gap-xl-5">
        <div className="col-10 col-md-5 mx-auto mb-4">
          <div className="custom-card-wrapper shadow">
            <img
              src={Muratore}
              className="card-img-bg"
              alt="IL MURATOREEE"
            />


            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4 fw-medium">O' Fravecatore</h3>
            </div>
          </div>
        </div>
        <div className="col-10 col-md-5 mx-auto mb-4">
          <div className="custom-card-wrapper shadow">
            <img
              src={FrontEnd}
              className="card-img-bg"
              alt="Frontend"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4 fw-medium">Sviluppatore Back-End</h3>
              
            </div>
          </div>
        </div>
        <div className="col-10 col-md-5 mx-auto mb-4">
          <div className="custom-card-wrapper shadow">
            <img
              src={BackEnd}
              className="card-img-bg"
              alt="Backend"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4 fw-medium">Sviluppatore Front-End</h3>
            </div>
          </div>
        </div>
        <div className="col-10 col-md-5 mx-auto mb-4">

          <div className="custom-card-wrapper shadow">
            <img
              src={DataAnalyst}
              className="card-img-bg"
              alt="Data Analyst"
            />

            <div className="card-overlay-content text-white">
              <h3 className="text-uppercase fw-light mb-4 fw-medium">Data Analyst</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CosaPuoiTrovare;
