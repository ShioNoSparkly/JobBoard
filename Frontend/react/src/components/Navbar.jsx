import { NavLink, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import logo from "../assets/logo.webp";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";




function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/company" || location.pathname === "/user";
  const isHome = location.pathname === "/";
  const [searchParams] = useSearchParams();
const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? "");



  const handleLogout = () => {
    logout();
    navigate("/");
  };

   const handleSearch = (e) => {
    e.preventDefault(); 
   if (searchQuery.trim()) {
    navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
  } else {
    navigate('/');
  }
  };

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

                <NavLink
                  className="nav-link active fs-4"
                  aria-current="page"
                  to={
                    isDashboard ? "/" :
                      user?.role === "azienda" ? "/company" : user?.role === "candidato" ? "/user" : "/"} >
                  {isDashboard ? "Home" : user?.role === "azienda" || user?.role === "candidato" ? "Dashboard" : "Home"}
                </NavLink>

              </li>
              {isHome && (
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
                    {["Milano", "Torino", "Roma", "Napoli", "Palermo"].map((city) => (
                      <li key={city}>
                        <NavLink className="dropdown-item" to={`/?city=${city}`}>
                          {city}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>

            <form
              className="d-flex ms-lg-auto mt-2 mt-lg-0 mb-2 gap-1"
              role="search" onSubmit={handleSearch}
            >
              <input
                className="form-control form-control-sm me-2 w-75 fs-5"
                type="search"
                placeholder="Cerca"
                aria-label="Search"
                 value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-primary me-2 d-flex align-items-center justify-content-center"
                type="submit"
              >
                <FaSearch className="fs-5" />
              </button>

              {user ? (
                <button className="btn btn-outline-danger fs-5" onClick={handleLogout}>
                  Esci
                </button>
              ) : (
                <NavLink to="/login" className="btn btn-outline-primary fs-5">
                  Accedi
                </NavLink>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
