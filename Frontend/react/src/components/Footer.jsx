import { NavLink } from 'react-router-dom';
import '../assets/logo.webp';


function Footer() {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        {" "}
        <p className="col-md-4 mb-0 text-body-secondary">
          © 2025 Company, Inc
        </p>{" "}
        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
          {" "}
          <svg className="bi me-2" width="40" height="32" aria-hidden="true">
            <use xlink:href="#bootstrap"></use>
          </svg>{" "}
        </a>{" "}
        <ul className="nav col-md-4 justify-content-end">
          {" "}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-body-secondary" to="/">
              Home
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-body-secondary" to="/features">
              Features
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-body-secondary" to="/pricing">
              Pricing
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-body-secondary" to="/faqs">
              FAQs
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-body-secondary" to="/about">
              About
            </NavLink>
          </li>{" "}
        </ul>{" "}
      </footer>
    </>
  );
}

export default Footer;
