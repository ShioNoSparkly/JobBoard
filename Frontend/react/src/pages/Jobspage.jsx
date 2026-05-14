import { useState, useEffect } from 'react';
import JobCard from "../components/JobCard"
import Hero from '../components/Hero'
import { jobsAPI } from '../services/api'

function Jobspage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  if (loading) return <p className="text-center mt-5">Caricamento...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <Hero />
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobspage;
