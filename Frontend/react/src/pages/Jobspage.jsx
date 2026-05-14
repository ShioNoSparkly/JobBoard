import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from "../components/JobCard"
import Hero from '../components/Hero'
import { jobsAPI } from '../services/api'
import Collaborazioni from '../components/Collaborazioni';
import Aziende from '../components/Aziende';
import CosaPuoiTrovare from '../components/CosaPuoiTrovare';
import CompAzienda from '../components/CompAzienda';
import CompUtente from '../components/CompUtente';
import { SiGooglemaps } from "react-icons/si";


function Jobspage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const selectedCity = searchParams.get('city')


  useEffect(() => {
    
 jobsAPI.getAllJobs()
    .then(data => {
      setJobs(data || []);
      setLoading(false);
      })
      .catch(err => {
         setError(err.message || 'Errore nel caricamento dei lavori');
        setLoading(false);
      });
  }, []);

  const filteredJobs = selectedCity
    ? jobs.filter(job => job.city?.toLowerCase() === selectedCity.toLowerCase())
    : jobs;

  if (loading) return <p className="text-center mt-5">Caricamento...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <Hero />
      <section className="py-5 bg-light">
        <div className="container">

          {selectedCity && (
            <div className="d-flex fs-3 align-items-center gap-2 mb-4">
              <SiGooglemaps className='fs-3 text-danger' />
                 {selectedCity}
              
              <a href="/" className="btn btn-sm btn-outline-danger mx-2 fs-6">
                Rimuovi filtro
              </a>
            </div>
          )}
          
         <div className="row g-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="text-center text-muted">
                Nessun annuncio disponibile a {selectedCity}.
              </p>
            )}
          </div>
        </div>
      </section>
      <Aziende/>
      <Collaborazioni/>
      <CosaPuoiTrovare/>
      <CompAzienda/>
      <CompUtente/>

      
    </>
  );
}

export default Jobspage;
