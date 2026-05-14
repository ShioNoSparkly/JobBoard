import { useState, useEffect } from 'react';
import JobCard from "../components/JobCard"
import Hero from '../components/Hero'
import Collaborazioni from '../components/Collaborazioni';
import Aziende from '../components/Aziende';
import CosaPuoiTrovare from '../components/CosaPuoiTrovare';
import CompAzienda from '../components/CompAzienda';
import CompUtente from '../components/CompUtente';


function Jobspage() {
  const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

   useEffect(() => {
   
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:3000/api/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
  console.log('STATUS:', res.status);
  return res.json();
})
.then(data => {
  console.log('DATA:', data);
  setJobs(data.data || []);
  setLoading(false);
})
      .catch(err => {
        setError('Errore nel caricamento dei lavori');
        setLoading(false);
      });
  }, []);

 if (loading) return <p className="text-center mt-5">Caricamento...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  // const heroContent = {
  //   candidate: {
  //     title: "Trova il lavoro dei tuoi sogni!",
  //     subtitle: "Scopri le migliori offerte disponibili per la tua carriera.",
  //   },

  //   company: {
  //     title: "Scopri i migliori talenti!",
  //     subtitle: "Pubblica offerte e seleziona i candidati ideali per la tua azienda.",
  //   },
  // };

  // const currentHero =
  //   user.role === "company"
  //     ? heroContent.company
  //     : heroContent.candidate;



  return (
    <>
    <Hero/>
      {/* <section className="hero-section d-flex align-items-center py-5 bg-img-2">
        <div className= "overlay z-0"></div>
          <div className="container py-5 position-relative">
            <h1 className="display-3 fw-bold mb-3 text-dark z-1">
               {currentHero.title}
            </h1>
            <p className="lead text-dark fw-bold fs-4">
               {currentHero.subtitle}
            </p>
          </div>
      </section> */}

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
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
