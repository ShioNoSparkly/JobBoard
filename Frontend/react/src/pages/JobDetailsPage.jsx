import { useParams, useLocation } from 'react-router-dom';


function JobDetailsPage(){
const {id} = useParams()
const location = useLocation()
const job = location.state

if (!job) {
    job = jobs.find(j => j.id === Number(id));
  }

if(!job){
    return (
       <>
       <div className= "container py5">
        <h2>Job non disponibile</h2> 
        <p>ID: {id}</p>
       </div>
       </> 
    )
}


return (
<>
<div className="container py-5">

      <div className="row g-4 g-4 align-items-stretch">

         <div className="col-lg-8 d-flex flex-column gap-4">

      <div className="card shadow-sm border-0 p-4">
        <h1 className="fw-bold">{job.title}</h1>
        <p>📍 {job.city}</p>
        <p>💼 {job.contract_type}</p>
        <p>💰 {job.salary}</p>
      </div>

      <div className="card shadow-sm border-0 p-4 flex-grow-1">
        <h4>Descrizione lavoro</h4>
        <p>{job.description}</p>
      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="col-lg-4">

      <div
        className="card shadow-sm border-0 p-4 h-100 sticky-top"
        style={{ top: '20px' }}
      >

        <button className="btn btn-primary w-100 mb-2">
          Candidati ora
        </button>

        <button className="btn btn-outline-secondary w-100 mb-2">
          Salva lavoro
        </button>

        <button className="btn btn-outline-dark w-100">
          Condividi
        </button>

        <hr />

        <small className="text-muted">
          Pubblicato recentemente • 10 candidati
        </small>

      </div>

    </div>

  </div>

</div>

</>

)

}

export default JobDetailsPage