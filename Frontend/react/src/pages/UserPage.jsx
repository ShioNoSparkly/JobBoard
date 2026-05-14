import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { useAuth } from '../context/AuthContext';
import { applicationAPI } from '../services/api';
import { jobsAPI } from '../services/api';
import CompUtente from '../components/CompUtente'; 

function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const headers = { 'Authorization': `Bearer ${token}` };

    // fetch jobs in evidenza e candidature in parallelo
    Promise.all([
      jobsAPI.getAllJobs(),
      applicationAPI.getMyApplications()
    ])

      .then(([jobs, apps]) => {
        setFeaturedJobs(Array.isArray(jobs) ? jobs.slice(0, 3) : []);
        setApplications(Array.isArray(apps) ? apps : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  if (loading) return <p className="text-center mt-5">Caricamento...</p>;

  return (

    <>
      <div className='w-50 justify-content-center mx-auto text-center shadow-sm bg-black rounded-4  '>
        <h1 className="display-4 fw-semibold text-info  mb-3 mt-3 p-3">Workspace Utente</h1>
      </div>


      <Hero />

      <div className="container py-5 ">
        <div className="card shadow-sm border-0 p-4 mb-4">
          <h4 className="fw-bold mb-3 text-info job-card-animate fs-1">Le tue candidature</h4>
          {applications.length === 0 ? (
            <p className="text-muted">Non hai ancora inviato candidature.</p>
          ) : (
            applications.map(app => (
              <div key={app.id}
                className="border rounded p-3 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                <div className="text-start">
                  <h5 className="mb-1">{app.job_title}</h5>
                  <small className="text-muted">{app.company_name} • {app.city}</small>

                </div>
                <div className='d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto justify-content-end'>
                  <span className={`btn btn-sm d-flex align-items-center fs-6 justify-content-center disabled ${app.status === 'accettata' ? 'btn-outline-primary' :
                    app.status === 'rifiutata' ? 'btn-outline-danger' :
                      'btn-outline-success'}`}>
                    {app.status}
                  </span>
                  <NavLink
                    to="https://mail.google.com/mail/?view=cm&fs=1&to=contatti@jobboard-agency.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center">
                    Contattaci
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>

       
        <div className="card shadow-sm border-0 p-4 mb-4 bg-light">
          <h4 className="fw-bold mb-1 text-info fs-1">Annunci in evidenza</h4>
          <p className="text-muted mb-4">Scopri le ultime offerte disponibili e candidati ora!</p>

          <div id="jobCarousel" className="carousel slide rounded-4 overflow-hidden" data-bs-ride="carousel">


            <div className="carousel-indicators">
              {featuredJobs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#jobCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? 'active' : ''}
                />
              ))}
            </div>

          
            <div className="carousel-inner">
              {featuredJobs.map((job, i) => (
                <div key={job.id} className={`carousel-item ${i === 0 ? 'active' : ''} carousel-item-${i + 1}`}>
                  <div className="carousel-overlay">
                    <span className="badge bg-primary mb-3 fs-6">{job.contract_type}</span>
                    <h2 className="fw-bold mb-2">{job.title}</h2>
                    <p className="mb-1 fs-5">📍 {job.city} &nbsp;|&nbsp; 💶 {job.salary}€</p>
                    <p className="carousel-caption-text mb-4">
                      {job.description.slice(0, 120)}...
                    </p>
                    <button
                      className="btn btn-primary btn-lg px-5"
                      onClick={() => navigate(`/jobs/${job.id}`, { state: job })}>
                      Candidati ora
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* frecce */}
            <button className="carousel-control-prev" type="button" data-bs-target="#jobCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#jobCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" />
            </button>

          </div>

          <div className="text-center mt-4">
            <NavLink to="/" className="btn btn-outline-info">
              Vedi tutti gli annunci
            </NavLink>
          </div>
        </div>

<CompUtente/>


        <NavLink to="/" className="text-black d-block mx-auto mt-4">
          Torna alla home
        </NavLink>
      </div>
    </>
  );
}

export default UserPage;