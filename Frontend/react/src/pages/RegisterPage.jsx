import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

    setError({});

    try {
      const BASE = 'http://localhost:3000';
      const res = await fetch(`${BASE}/api/auth/registra`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password, name, role})
    }) 
    if(!res.ok){
        const data = await res.json()
        throw new Error(data.errore || 'Errore registrazione')
    }
      setSuccess(true);
      setSuccessMessage("Registrazione avvenuta con successo!")
      setTimeout(() => { navigate("/login")
      }, 2000); 
      
      
    } catch (error) {
      setError({ email: error.message });
    }

  };


  return (
    <>
      <div className="bg-img-full d-flex align-items-center justify-content-center min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 px-4 px-md-0">
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-5 py-md-6 shadow-lg">
                  <h2 className="fw-bold mb-4 text-center">Registrati</h2>

                  {successMessage && (
                    <div className="alert alert-success text-center">
                      {successMessage}
                    </div>
                  )}

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
                        {error.email && (
                          <div className="text-danger mt-1">
                            {error.email}
                          </div>
                        )}
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
                        {error.password && (
                          <div className="text-danger mt-1">
                            {error.password}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fs-5">Nome</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Inserisci nome"
                        />
                        {error.name && (
                          <div className="text-danger mt-1">
                            {error.name}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label d-block fs-5 mb-4">Ruolo</label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="scelta1"
                            name="azienda"
                            value="azienda"
                            checked={role === "azienda"}
                            onChange={(e) => setRole(e.target.value)}
                          />

                          <label className="form-check-label" htmlFor="Azienda">
                            Azienda
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="scelta2"
                            name="candidato"
                            value="candidato"
                            checked={role === "candidato"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="Candidato">
                            Candidato
                          </label>
                        </div>
                        {error.role && (
                          <div className="text-danger mt-2">
                            {error.role}
                          </div>
                        )}
                      </div>
                    </div>
                   <button className="btn btn-primary btn-lg px-5 mt-3 text-nowrap" type="submit">Registrati</button>
                    <p className='mt-3'>Hai già un account?
                      <NavLink to='/login' className='text-decoration-none fw-semibold mx-2'>Accedi</NavLink></p>
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
