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
   const [error, setError] = useState([]);
   const [success, setSuccess] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
   const [caricamento, setCaricamento] = useState(false)

   async function handleSubmit(e) {
      e.preventDefault();
      setCaricamento(true);
      setError([])


      try {
         const { token, user } = await authAPI.login(email, password);
         login(user,token); 
         navigate('/', { replace: true });
      } catch (err) {
         setError(err.message)
      } finally {
         setCaricamento(false)
      }
   }










   //        try {
   //       const BASE = 'http://localhost:3000';
   //       const res = await fetch(`${BASE}/api/auth/login`, {
   //         method: 'POST',
   //         headers: {'Content-Type' : 'application/json'},
   //         body: JSON.stringify({email, password})
   //     }) 

   //     const data = await res.json();

   //     if(!res.ok){
   //   throw new Error(data.errore || 'Errore login')
   //     }
   // login(data.user, data.token);

   //       setSuccess(true);
   //       setSuccessMessage("Login avvenuto con successo!") 
   //       navigate('/jobs');


   //     } catch (error) {
   //       setError({ email: error.message });
   //     }


   //    }

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
                                 {(error && <small className='text-danger mt-2'>{error[0]}</small>)}
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
                                 {(error && <small className='text-danger mt-2'>{error[1]}</small>)}
                              </div>
                              <button
                                 className="btn btn-primary mt-4 w-25"
                                 type="submit">
                                 Accedi
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
