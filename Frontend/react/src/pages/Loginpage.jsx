import { useState } from 'react';

function Loginpage() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')

   const handleSubmit = (e) => {
      e.preventDefault();

      console.log('LOGIN DATA:', {
         email,
         password
      });
   }
   return (
      <>
         <div className="container py-5">
            <div className="row justify-content-center">
               <div className="col-md-6">
                  <div className="card shadow border-0 rounded-4">
                     <div className="card-body p-4">
                        <h2 className="fw-bold mb-4 text-center">
                           Login
                        </h2>
                        <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                              <label className="form-label">
                                 Email
                              </label>
                              <input
                                 type="email"
                                 className="form-control"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="Inserisci email" />
                           </div>

                           <div className="mb-3">
                              <label className="form-label">
                                 Password
                              </label>
                              <input
                                 type="password"
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Inserisci password" />
                           </div>
                           <button
                              className="btn btn-primary w-100"
                              type="submit">
                              Accedi
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Loginpage;