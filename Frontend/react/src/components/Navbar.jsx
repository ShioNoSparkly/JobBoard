import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import logo from "../assets/logo.webp";
import { useState } from "react";






function Navbar() {
  const [user, setUser] = useState(null)

  const logout = () => { setUser(null); };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="Logo Jobboard" style={{ width: "200px" }} />
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <NavLink className="nav-link active fs-4" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown d-flex">
                <NavLink
                  className="nav-link dropdown-toggle fs-4"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                > Città
                </NavLink>

                <ul className="dropdown-menu shadow border-0 text-center w-75 mx-auto w-lg-auto mb-2 fs-5">
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
              className="d-flex mx-auto ms-lg-auto me-lg-0 mt-2 mt-lg-0 mb-2 gap-1"
              role="search">
              <input
                className="form-control form-control-sm me-2 w-75 fs-5"
                type="search"
                placeholder="Cerca"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary me-2 d-flex align-items-center justify-content-center"
                type="submit"
              >
                <FaSearch className='fs-5' />
              </button>
              <NavLink to="/login" className="btn btn-outline-primary fs-5" type="button">
                Accedi
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
