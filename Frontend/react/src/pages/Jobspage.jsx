import JobCard from '../components/JobCard'

function Jobspage() {
   // const [jobs, setJobs] = useState([]);

   //    useEffect(() => {
   //   axios.get('/jobs')
   //     .then(res => setJobs(res.data));
   // }, []);


   const jobs = [
      {
         id: 1,
         company_id: 101,
         title: 'Frontend Developer',
         description: 'Cerchiamo uno sviluppatore React motivato.',
         contract_type: 'Full Time',
         city: 'Milano',
         salary: '30000€'
      },

      {
         id: 2,
         company_id: 102,
         title: 'Backend Developer',
         description: 'Esperienza con Node.js e PostgreSQL.',
         contract_type: 'Part Time',
         city: 'Roma',
         salary: '28000€'
      },

      {
         id: 3,
         company_id: 103,
         title: 'UI/UX Designer',
         description: 'Esperienza con Figma richiesta.',
         contract_type: 'Hybrid',
         city: 'Torino',
         salary: '32000€'
      }
   ];

   return (
      <>
         <section className="bg-dark text-white py-5">
            <div className="container py-5">
               <h1 className="display-3 fw-bold mb-3">
                  Trova il lavoro perfetto
               </h1>
               <p className="lead">
                  Scopri le migliori offerte disponibili.
               </p>
            </div>
         </section>


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


export default Jobspage