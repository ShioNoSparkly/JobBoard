import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            Navbar
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

                <ul className="dropdown-menu dropdown-menu-dark shadow border-0 text-center w-75 mx-auto w-lg-auto">
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
              className="d-flex mx-auto ms-lg-auto me-lg-0 mt-2 mt-lg-0"
              role="search"
              style={{ width: "fit-content" }}
            >
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
              <button className="btn btn-sm btn-outline-primary" type="button">
                LogIn
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
