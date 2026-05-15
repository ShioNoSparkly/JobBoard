import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalDelete from '../components/ModalDelete';
import ModalCandidate from '../components/ModalCandidate';
import { SiGooglemaps } from "react-icons/si";
import { MdOutlineEuro } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { AiFillStar } from "react-icons/ai";
import { useAuth } from '../context/AuthContext';
import { applicationAPI } from '../services/api';
import ComponenteDettaglio from '../components/ComponenteDettaglio';
import { BsFillInfoCircleFill } from "react-icons/bs";

function JobDetailsPage() {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate();
    const { user } = useAuth();

    let job = location.state


    const [showModal, setShowModal] = useState(false)

    // const handleConfirm = () => { onDelete(id); setShowModal(false); };
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [error, setError] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const requireAuth = (callback) => {
        if (!user) {
            navigate('/login', { state: { message: 'Accedi o registrati per continuare' } })
            return
        }
        callback()
    }

    const handleCandidateSubmit = async () => {
        let errorText = null;
        let errorFile = null;
        setError([]);

        if (!coverLetter.trim()) errorText = 'Devi inserire una lettera di presentazione'
        // if (!cvFile) errorFile = 'Non è stato inserito nessun file allegato'
        //  if (errorText || errorFile) { return setError([errorText, errorFile]) }

        try {
            await applicationAPI.apply(id, coverLetter);


            setShowCandidateModal(false);
            setCoverLetter('');
            setCvFile(null);
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                navigate('/user');
            }, 3000);

        } catch (err) {
            if (err.status === 409) {
                setError(['Ti sei già candidato per questa posizione']);
            } else {
                setError([err.message || 'Errore di rete, riprova più tardi']);
            }
        }
    };

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

    if (!user) {
        return (


            <section className="hero-section d-flex align-items-center py-5 bg-img-2">
                <div className="overlay z-0"></div>
                <div className="container py-5 text-center text-dark rounded-4 bg-img-2">
                    <h4 className='fw-semibold fs-1 mt-3 '>Registrati o accedi per vedere i dettagli dell'annuncio!</h4>
                </div>
            </section>



        );
    }

    return (
        <>
            <div className="container py-5">
                <div className="row g-4 align-items-stretch">
                    <div className="col-lg-8 d-flex flex-column gap-4">
                        <div className="card shadow-sm border-0 p-4">
                            <h1 className="fw-bold mb-5">{job.title}</h1>
                            <p><SiGooglemaps className='fs-5 text-danger mb-1 mx-2' /> {job.city}</p>
                            <p><MdWorkHistory className='fs-5 text-primary mb-1 mx-3' />{job.contract_type}</p>
                            <p><MdOutlineEuro className='fs-5 text-success mb-1 mx-2' /> {job.salary}</p>
                        </div>
                        <div className="card shadow-sm border-0 p-4 flex-grow-1 align-items-center">
                            <GrNotes className='fs-2 text-primary mb-4 mx-2' />
                            <h4 className="fw-semibold mb-5">Descrizione lavoro</h4>
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

                            {user.role !== 'azienda' && (
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
                               
                            

                            <button className="btn btn-outline-dark w-100"
                                onClick={handleShare}>Condividi
                            </button>
                            <hr />
                             </>
)}
                            <small className="text-muted">
                                Pubblicato recentemente • 10 candidati
                            </small>
                            <div className='mt-3 overflow-hidden rounded'>
                                <img src="https://www.altamirahrm.com/wp-content/uploads/2017/03/job-board-di-settore-800x506.jpg" alt="img"
                                    className="img-fluid w-100 h-100 object-fit-cover" />
                            </div>

                            <div className="mt-3 p-3 border rounded bg-light small text-muted fw-semibold">
                           <div> <BsFillInfoCircleFill className='text-primary mb-3 fs-4'/></div>    
                                Connect Work è la tua piattaforma per entrare in contatto con nuove opportunità professionali in modo semplice e immediato.
                                La nostra Job Board mette in relazione candidati e aziende, facilitando il processo di selezione e candidatura.
                                Ogni giorno nuove offerte vengono pubblicate per aiutarti a trovare il percorso lavorativo più adatto alle tue competenze e ai tuoi obiettivi.
                                Siamo al tuo fianco per rendere la ricerca del lavoro più chiara, veloce e accessibile.
                            </div>
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


            <ComponenteDettaglio />

        </>
    )
}

export default JobDetailsPage