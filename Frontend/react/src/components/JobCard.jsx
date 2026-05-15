import { useNavigate } from 'react-router-dom';
import { RiCloseCircleLine } from "react-icons/ri"
import { useState } from 'react';
import ModalDelete from './ModalDelete';
import { useAuth } from '../context/AuthContext';
import { FcApproval } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";



function JobCard({ job, style, onDelete, onEdit, isOwner = false, colClass = "col-md-6 col-lg-4" }) {
  // ...}) {
  const { user } = useAuth();
  const navigate = useNavigate();
const [showModal, setShowModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [jobToEdit, setJobToEdit] = useState(null);

const handleConfirm = () => {
    onDelete(job.id);
    setShowModal(false);
  };


  return (

    <div className={`${colClass} job-card-animate`} style={style} >
      <div className="card h-100 border-0 shadow rounded-4 position-relative">

        <div className="card-body d-flex flex-column gap-2"> 
          <FcApproval className="fs-1 mx-auto"/>
          <h4 className="fw-bold mb-3">{job.title}</h4>

         <small className="text-muted mb-2">
   <span className="fs-6 fw-bold text-muted">{job.company_name}</span> 
</small>

          <div className="mb-3">
            <span className="badge bg-dark me-2">
              {job.city}
            </span>
            <span className="badge bg-primary">
              {job.contract_type}
            </span>
          </div>
          <p className="text-muted flex-grow-1"> {job.description}</p>
        
          <div className="d-flex justify-content-between align-items-center mt-3"><strong>{job.salary}</strong>
          <div className="d-flex gap-2">
            {isOwner && (
         <>
            <button
              className="btn btn-sm btn-outline-warning"
               onClick={() => onEdit(job)}
              title="Modifica annuncio"
            >
             Modifica
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(job.id)}
              title="Elimina annuncio"
            >
             Elimina
            </button>
         </>
        )}
            <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/jobs/${job.id}`, { state: job})}>
              Dettagli
            </button>
            </div>
          </div>
        </div>
      </div>
        {showModal && (
        <ModalDelete
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default JobCard;