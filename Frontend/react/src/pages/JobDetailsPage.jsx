import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalDelete from '../components/ModalDelete';
import ModalCandidate from '../components/ModalCandidate';
import { SiGooglemaps } from "react-icons/si";
import { MdOutlineEuro } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { AiFillStar } from "react-icons/ai";


function JobDetailsPage() {
    const [jobs, setJobs]= useState([])


    const { id } = useParams()
    const location = useLocation()
    let job = location.state
    const user = { role: 'user' }
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const handleConfirm = () => { onDelete(id); setShowModal(false); };
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [error, setError] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleCandidateSubmit = () => {
        let errorText = null;
        let errorFile = null;

        setError([]);
        if (!coverLetter.trim()) {
            errorText = 'Devi inserire una lettera di presentazione';
        }
        if (!cvFile) {
            errorFile = 'Non è stato inserito nessun file allegato';
        }
        if (errorText || errorFile) {
            let errors = []
            errors.push(errorText)
            errors.push(errorFile)
            return setError(errors)
        }

        console.log({
            jobId: job.id,
            coverLetter,
            cvFile
        });

        setShowCandidateModal(false);

       
        setCoverLetter('');
        setCvFile(null);

      
        setShowSuccessModal(true);

     
        setTimeout(() => {
            setShowSuccessModal(false);
        }, 3000);



        const toastEl = document.getElementById('candidateToast');
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();

        setShowCandidateModal(false);

        setCoverLetter('');
        setCvFile(null);


        setShowSuccessModal(true);


        setTimeout(() => {
            setShowSuccessModal(false);
        }, 2500);

    };

//     useEffect(() => {
//     const fetchJobs = async () => {
//         try {
//             const response = await axios.get(
//                 'http://localhost:3000/jobs'
//             );
//             setJobs(response.data);
//         } catch (error) {
//         }
//     };
//     fetchJobs();
// }, []);

const handleShare = async () => {

    try {

        await navigator.share({
            title: job.title,
            text: `Guarda questa offerta di lavoro: ${job.title}`,
            url: window.location.href
        });

    } catch (error) {

        console.log('Condivisione annullata');

    }
};

    if (!job) {
        job = jobs.find(j => j.id === Number(id));
    }

    if (!job) {
        return (
            <>
                <div className="container py5">
                    <h2>Job non disponibile</h2>
                    <p>ID: {id}</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container py-5">
                <div className="row g-4 align-items-stretch">
                    <div className="col-lg-8 d-flex flex-column gap-4">
                        <div className="card shadow-sm border-0 p-4">
                            <h1 className="fw-bold mb-5">{job.title}</h1>
                            <p><SiGooglemaps className='fs-5 text-danger mb-1 mx-2'/> {job.city}</p>
                            <p><MdWorkHistory className='fs-5 text-primary mb-1 mx-3'/>{job.contract_type}</p>
                            <p><MdOutlineEuro className='fs-5 text-success mb-1 mx-2' /> {job.salary}</p>
                        </div>
                        <div className="card shadow-sm border-0 p-4 flex-grow-1 align-items-center">
                            <GrNotes className='fs-2 text-primary mb-4 mx-2' />
                            <h4  className="fw-semibold mb-5">Descrizione lavoro</h4>
                            <p>{job.description}</p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 p-4 h-100 sticky-top">
                            {user.role === 'company' && (
                                <div className='d-flex justify-content-end'>
                                    <button className='btn btn-danger w-100 mb-2'
                                        onClick={() => setShowModal(true)}>Elimina Annuncio</button>
                                    <ModalDelete isOpen={showModal}
                                        onConfirm={handleConfirm}
                                        onCancel={() => setShowModal(false)} />
                                </div>
                            )}

                            {user.role !== 'company' && (
                                <>
                                    <button className="btn btn-primary w-100 mb-2"
                                        onClick={() => setShowCandidateModal(true)}>
                                        Candidati ora
                                    </button>
                                    <ModalCandidate
                                        isOpen={showCandidateModal}
                                        onCancel={() => setShowCandidateModal(false)}
                                        onSubmit={handleCandidateSubmit}
                                        coverLetter={coverLetter}
                                        setCoverLetter={setCoverLetter}
                                        cvFile={cvFile}
                                        setCvFile={setCvFile}
                                        error={error}
                                        setError={setError} />
                                </>
                            )}

                            <button className="btn btn-outline-secondary w-100 mb-2">
                                Aggiungi ai preferiti <AiFillStar className='mb-1' />
                            </button>

                            <button className="btn btn-outline-dark w-100"  
                            onClick={handleShare}>Condividi
                            </button>
                            <hr />

                            <small className="text-muted">
                                Pubblicato recentemente • 10 candidati
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccessModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow-lg">
                            <div className="modal-body text-center p-5">
                                <div className="display-3 text-success mb-3">
                                    ✓
                                </div>
                                <h4 className="fw-bold">
                                    Candidatura inviata!
                                </h4>
                                <p className="text-muted mb-0">
                                    La tua candidatura è stata inviata con successo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}







        </>
    )
}

export default JobDetailsPage