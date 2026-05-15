import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <footer className="py-5 bg-custom-footer border-top mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h4 className="fw-bold text-primary">Contatti</h4>
            <ul className="nav flex-column">
              <li className="nav-item">Chiamaci: +39 123 456 7891</li>
              <li className="nav-item">Email: contatti@jobboard-agency.it</li>
              <li className="nav-item">
                Sede principale: Via Roma 1, 00100 Roma&nbsp;(RM)
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h4 className="fw-bold text-primary">Agenzia</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  to="/privacy"
                  className="nav-link p-0 small fw-bold mb-2 footer-link-custom text-muted"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cookie"
                  className="nav-link p-0 small fw-bold mb-2 footer-link-custom text-muted"
                >
                  Cookie
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/termini"
                  className="nav-link p-0 small fw-bold mb-2 footer-link-custom text-muted"
                >
                  Termini e Condizioni
                </NavLink>
                <NavLink
                  to="/chi-siamo"
                  className="nav-link p-0 small fw-bold mb-2 footer-link-custom text-muted"
                >
                  Chi siamo
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4 offset-md-1 mb-3">
            <h5 className="fw-bold">Hai dubbi? Consulta le FAQ</h5>
            <p className="text-muted small">
              Abbiamo raccolto le domande più frequenti per aiutarti subito.
            </p>

            <div
              className="dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                className="btn btn-primary dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                type="button"
              >
                Seleziona un argomento...
              </button>

              <ul
                className={`dropdown-menu w-100 shadow border-0 ${showDropdown ? "show" : ""}`}
              >
                <li>
                  <NavLink to="/carica-cv" className="dropdown-item py-2">
                    Come caricare il CV?
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/come-candidarsi" className="dropdown-item py-2">
                    Come candidarsi a un annuncio?
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tempi-selezione" className="dropdown-item py-2">
                    Quali sono i tempi di selezione?
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between mt-2 py-3 border-top">
          <p className="text-muted small mb-0">
            © 2026 JobBoard. Tutti i diritti riservati.
          </p>
          <ul className="list-unstyled d-flex align-items-start mb-0 mt-3 mt-sm-0">
            <li className="ms-3">
              <a
                className="link-dark p-0 d-flex align-items-center"
                href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Dit_IT"
                style={{ lineHeight: "1" }}
                target="_blank"
              >
                <FaFacebook className="fs-3" style={{ color: "#1877F2" }} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="link-dark p-0 d-flex align-items-center"
                href="https://www.linkedin.com/home?originalSubdomain=it"
                style={{ lineHeight: "1" }}
                target="_blank"
              >
                <FaLinkedin className="fs-3" style={{ color: "#0560bb" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
