import { useState } from "react";
import { NavLink } from "react-router-dom";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("LOGIN DATA:", {
      email,
      password,
    });
  };
  return (
    <>
      <div className="bg-img-full d-flex align-items-center justify-content-center">
        {/* Overlay integrato via CSS per non complicare l'HTML */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {" "}
              {/* Leggermente più stretto per eleganza */}
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-4 p-md-5">
                  {" "}
                  {/* Più padding interno */}
                  <h2 className="fw-bold mb-4 text-center">Accedi</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fs-5">Email</label>
                      <input
                        type="email"
                        className="form-control form-control-lg" /* Input più grandi */
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Inserisci email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fs-5">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Inserisci password"
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-100 mt-3"
                      type="submit"
                    >
                      Accedi
                    </button>
                    <p className="fs-5 mt-2">
                      Non hai un account?{" "}
                      <NavLink
                        to="/register"
                        className="text-decoration-none fw-bold"
                        type="button"
                      >
                        Registrati
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
