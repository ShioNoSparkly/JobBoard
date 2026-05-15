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
import { FaSearch } from "react-icons/fa";


function Jobspage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const selectedCity = searchParams.get('city')
  const searchQuery = searchParams.get('search');

  const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 3;


const totalPages = Math.ceil(jobs.length / jobsPerPage);
const indexUltimo = currentPage * jobsPerPage;
const indexPrimo = indexUltimo - jobsPerPage;
const jobsPaginati = jobs.slice(indexPrimo, indexUltimo);


  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
  const filters = {};
  if (selectedCity) filters.city = selectedCity;
  if (searchQuery)  filters.search = searchQuery;
 jobsAPI.getAllJobs(filters)
    .then(data => { setJobs(data || []); setLoading(false); })
    .catch(err => { setError(err.message); setLoading(false); });

  }, [selectedCity, searchQuery]);

  // const filteredJobs = selectedCity
  //   ? jobs.filter(job => job.city?.toLowerCase() === selectedCity.toLowerCase())
  //   : jobs;

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

          {searchQuery && (
            <div className="d-flex fs-3 align-items-center gap-2 mb-4">
              <FaSearch className='fs-5 text-primary' />
              "{searchQuery}"
              <a href="/" className="btn btn-sm btn-outline-danger mx-2 fs-6">
                Rimuovi filtro
              </a>
            </div>
          )}
          
         <div className="row g-4">
    {jobsPaginati.length > 0 ? (
        jobsPaginati.map((job, index) => (
            <JobCard
                key={job.id}
                job={job}
                style={{ animationDelay: `${index * 0.08}s` }}
            />
        ))
    ) : (
        <p className="text-center text-muted">
            {selectedCity
                ? `Nessun annuncio disponibile a ${selectedCity}.`
                : searchQuery
                    ? `Nessun risultato per "${searchQuery}".`
                    : 'Nessun annuncio disponibile.'}
        </p>
    )}
</div>

{/* PAGINAZIONE */}
{totalPages > 1 && (
    <nav className="mt-5 d-flex justify-content-center">
        <ul className="pagination">

            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                    className="page-link"
                    onClick={() => setCurrentPage(p => p - 1)}
                >
                    &laquo;
                </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                    className="page-link"
                    onClick={() => setCurrentPage(p => p + 1)}
                >
                    &raquo;
                </button>
            </li>

        </ul>
    </nav>
)}
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
