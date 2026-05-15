import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api'

function Loginpage() {
   const navigate = useNavigate()
   const { login } = useAuth();


   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState();
   const [success, setSuccess] = useState(false);
   const [caricamento, setCaricamento] = useState(false)

   async function handleSubmit(e) {
      e.preventDefault();
      setCaricamento(true);
      setError("");


      try {
         const { token, user } = await authAPI.login(email, password);
         login(user, token);

         if (user.role === "azienda") {
            navigate("/company", { replace: true })
         } else { navigate("/", { replace: true }) }

      } catch (err) {
         setError(err.message)
      } finally {
         setCaricamento(false)
      }
   }

   return (
      <>
         <div className="bg-img-full d-flex align-items-center justify-content-center">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-6">
                     <div className="card shadow border-0 rounded-4">
                        <div className="card-body p-4">
                           <h2 className="fw-bold mb-4 text-center">
                              Login
                           </h2>
                           <form onSubmit={handleSubmit}>
                              <div className="mb-3 d-flex row justify-content-center">
                                 <label className="form-label">
                                    Email
                                 </label>
                                 <input
                                    type="email"
                                    className="form-control w-75"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Inserisci email" />
                              </div>

                              <div className="mb-3 d-flex row justify-content-center">
                                 <label className="form-label">
                                    Password
                                 </label>
                                 <input
                                    type="password"
                                    className="form-control w-75"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Inserisci password" />
                              </div>
                              {error && (<div className="text-danger text-center mb-2">
                                 <small>{error}</small></div>
                              )}
                              <button
                                 className="btn btn-primary mt-4 px-4 text-nowrap"
                                 type="submit"
                                 disabled={caricamento}>
                                 {caricamento ? 'Accesso...' : 'Accedi'}
                              </button>
                              <p className='mt-3'>Non hai un account?
                                 <NavLink to='/register' className='text-decoration-none fw-semibold mx-2'>Registrati</NavLink></p>
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
