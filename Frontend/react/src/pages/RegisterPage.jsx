import { useState } from "react";
import { NavLink } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("REGISTER DATA:", {
      email,
      password,
    });
  };
  return (
    <>
      <div className="bg-img-full d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-5 py-md-6 shadow-lg">
                  <h2 className="fw-bold mb-4 text-center">Registrati</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fs-5">Email</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Inserisci email"
                        />
                      </div>

                                            <div className="col-md-6 mb-3">
                        <label className="form-label fs-5">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Inserisci password"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fs-5">Nome</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Inserisci nome"
                        />
                      </div>


                      <div className="col-md-6 mb-3">
                        <label className="form-label fs-5">Ruolo</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          value={ruolo}
                          onChange={(e) => setRuolo(e.target.value)}
                          placeholder="Inserisci ruolo"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-50 mt-3"
                      type="submit"
                    >
                      Registrati
                    </button>
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

export default RegisterPage;
