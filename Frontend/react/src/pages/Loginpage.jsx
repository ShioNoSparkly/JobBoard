import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

function Loginpage() {
   const navigate = useNavigate()


   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState([]);

   const handleSubmit = (e) => {
      e.preventDefault();
      // MOMENTANEA PER TEST SENZA DATI BACKEND
      let user = [
         {
            id: 1,
            email: "admin@admin.it",
            password: "Password123!",
            name: "Pippo",
            role: "azienda"
         },
         {
            id: 2,
            email: "user@user.it",
            password: "Password123!",
            name: "PippoUser",
            role: "candidato"
         }
      ]

      const foundEmail = user.find(u => u.email === email);

      const foundPsw = foundEmail ? foundEmail.password === password : false;


      let errorEmail = !foundEmail ? "Email non valida" : "";
      let errorPsw = !foundPsw ? "Password non valida" : "";

      let errors = []
      errors.push(errorEmail)
      errors.push(errorPsw)

      setError(errors)


      if (foundEmail && foundPsw) {

         if (foundEmail.role === 'azienda') {
            navigate('/company');
         } else {
            navigate('/user');
         }
         //---------------------------------------------//
      };
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
