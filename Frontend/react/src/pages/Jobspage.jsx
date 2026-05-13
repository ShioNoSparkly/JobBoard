import JobCard from "../components/JobCard";

function Jobspage() {
  // const [jobs, setJobs] = useState([]);

  //    useEffect(() => {
  //   axios.get('/jobs')
  //     .then(res => setJobs(res.data));
  // }, []);


//esempio  utente loggato
  const user = {
    role: "user", // "candidate" oppure "company"
  };

  const jobs = [
    {
      id: 1,
      company_id: 101,
      title: "Frontend Developer",
      description: "Cerchiamo uno sviluppatore React motivato.",
      contract_type: "Full Time",
      city: "Milano",
      salary: "30000€",
    },

    {
      id: 2,
      company_id: 102,
      title: "Backend Developer",
      description: "Esperienza con Node.js e PostgreSQL.",
      contract_type: "Part Time",
      city: "Roma",
      salary: "28000€",
    },

    {
      id: 3,
      company_id: 103,
      title: "UI/UX Designer",
      description: "Esperienza con Figma richiesta.",
      contract_type: "Hybrid",
      city: "Torino",
      salary: "32000€",
    },
  ];


  const heroContent = {
    candidate: {
      title: "Trova il lavoro dei tuoi sogni!",
      subtitle: "Scopri le migliori offerte disponibili per la tua carriera.",
    },

    company: {
      title: "Scopri i migliori talenti!",
      subtitle: "Pubblica offerte e seleziona i candidati ideali per la tua azienda.",
    },
  };

  const currentHero =
    user.role === "company"
      ? heroContent.company
      : heroContent.candidate;



  return (
    <>
      <section className="hero-section d-flex align-items-center py-5 bg-img-2">
        <div className= "overlay z-0"></div>
          <div className="container py-5 position-relative">
            <h1 className="display-3 fw-bold mb-3 text-dark z-1">
               {currentHero.title}
            </h1>
            <p className="lead text-dark fw-bold fs-4">
               {currentHero.subtitle}
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

export default Jobspage;
