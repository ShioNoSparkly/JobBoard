import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hero from '../components/Hero'


function UserPage() {

  // MOCK DATI (poi arriveranno dal backend)
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'Tech SRL',
      status: 'accettata'
    },
    {
      id: 2,
      jobTitle: 'Backend Developer',
      company: 'Web Agency',
      status: 'accettata'
    },
    {
      id: 3,
      jobTitle: 'UI Designer',
      company: 'Creative Studio',
      status: 'rifiutata'
    }
  ]);

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (

    <>
   <Hero/>

    <div className="container py-5">

      <h1 className="fw-bold mb-4">
        Area Candidato
      </h1>

      <div className="card shadow-sm border-0 p-4 mb-4">

        <h4 className="fw-bold mb-3 text-primary">
          Le tue candidature
        </h4>

        {applications.length === 0 ? (
          <p className="text-muted">
            Non hai ancora inviato candidature.
          </p>
        ) : (

          applications.map(app => (

            <div
              key={app.id}
              className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center"
            >

              <div>

                <h5 className="mb-1">{app.jobTitle}</h5>

                <small className="text-muted">
                  {app.company}
                </small>

                <div>
                  <span className={`badge mt-2 ${app.status === 'accettata' ? 'bg-success' : app.status === 'rifiutata' ? 'bg-danger': 'bg-warning text-dark'}`}>
                    {app.status}
                  </span>
                </div>
              </div>


              <div className='d-flex gap-2'>
                <NavLink
                  to="https://mail.google.com/mail/?view=cm&fs=1&to=contatti@jobboard-agency.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success btn-sm text-start d-flex align-items-center"
                  type="button">Contattaci
                </NavLink>



                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(app.id)}
                >
                  Rimuovi
                </button>

              </div>
            </div>

          ))

        )}

      </div>

      <button className="btn btn-primary">
        Torna alla home
      </button>

    </div>
     </>
  );
}

export default UserPage;