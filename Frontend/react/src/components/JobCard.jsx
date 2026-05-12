import { useNavigate } from 'react-router-dom';
import { RiCloseCircleLine } from "react-icons/ri"
import { useState } from 'react';
import ModalDelete from './ModalDelete';

function JobCard({ job }) {

  const navigate = useNavigate();
const [users , setUsers] = useState([])
const [showModal, setShowModal] = useState(false);
const handleConfirm = () => {
    onDelete(id);
    setShowModal(false);
  };

  return (

    <div className="col-md-6 col-lg-4">
      <div className="card h-100 border-0 shadow rounded-4 position-relative">
        {users.role !== 'user' &&(
        <div className='d-flex justify-content-end'>
        <button className='position-absolute bg-transparent text-danger border-0 fs-2 btn-elimina' 
      onClick={() => setShowModal(true)}><RiCloseCircleLine /></button>
      <ModalDelete isOpen={showModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}/>
      </div>
      )}


        <div className="card-body d-flex flex-column"> 
          <h4 className="fw-bold mb-3">
            {job.title}
          </h4>

          <small className="text-muted mb-2">
            Company ID: {job.company_id}
          </small>

          <div className="mb-3">
            <span className="badge bg-dark me-2">
              {job.city}
            </span>
            <span className="badge bg-primary">
              {job.contract_type}
            </span>
          </div>

          <p className="text-muted flex-grow-1">
            {job.description}
          </p>

          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <strong>
              {job.salary}
            </strong>

            <button className="btn btn-primary btn-sm" onClick={() => navigate(`/jobs/${job.id}`, { state: job})}>
              Dettagli
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;