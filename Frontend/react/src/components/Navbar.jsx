import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import logo from "../assets/logo.webp";







function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="Logo Jobboard" style={{ width: "110px" }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="#">
                  Candidature
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Città
                </NavLink>

                <ul className="dropdown-menu dropdown-menu-dark shadow border-0 text-center w-75 mx-auto w-lg-auto mb-2">
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      Milano
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      Torino
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      Roma
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      Napoli
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      Palermo
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <form
              className="d-flex mx-auto ms-lg-auto me-lg-0 mt-2 mt-lg-0 mb-2"
              role="search"
              style={{ width: "fit-content" }}
            >
              <button
                className="btn btn-sm btn-outline-primary mx-2"
                type="button"
              >
                <AiFillStar className="mb-1" />
              </button>
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Cerca"
                aria-label="Search"
                style={{ width: "180px" }}
              />
              <button
                className="btn btn-sm btn-outline-primary me-2 d-flex align-items-center justify-content-center"
                type="submit"
              >
                <FaSearch style={{ fontSize: "0.8rem" }} />
              </button>
              <NavLink to="/login" className="btn btn-sm btn-outline-primary" type="button">
                Login
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
