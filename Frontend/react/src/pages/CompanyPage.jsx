import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Hero from '../components/Hero'
import JobCard from '../components/JobCard'
import { jobsAPI } from '../services/api'
import { applicationAPI } from '../services/api';
import DettaglioCandidato from '../components/DettaglioCandidato'
import CompAzienda from "../components/CompAzienda";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Table,
    Badge,
    Modal
} from 'react-bootstrap';


const CompanyPage = () => {
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // prendo tutti i job dell'azienda
                const jobs = await jobsAPI.getCompanyJobs();
                setJobs(jobs);

                if (!jobs || jobs.length === 0) {
                    setCandidates([]);
                    return;
                }

                // : per ogni job prendo le candidature
                const results = await Promise.all(
                    jobs.map(job =>
                        applicationAPI.getApplicationsByJob(job.id)
                            .then(apps => apps.map(app => ({ ...app, job_title: job.title })))
                            .catch(() => []) // se un job non ha candidature, non blocca tutto
                    )
                );

                //  array unico
                const allApplications = results.flat();
                setCandidates(allApplications);

            } catch (err) {
                console.error("Errore nel caricamento:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [error, setError] = useState('');

    const [filters, setFilters] = useState({
        search: '',
        status: '',
        role: ''
    });

    const handleStatusChange = (applicationId, newStatus) => {
    setCandidates(prev =>
        prev.map(c => c.id === applicationId ? { ...c, status: newStatus } : c)
    );
};

    const handleShow = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const handleClose = () => { setShowModal(false) };

    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        city: '',
        contract_type: '',
        salary: ''
    });

    const handleChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value });
    }

    const handleCreateJob = async () => {

        // VALIDAZIONE
        if (
            !newJob.title.trim() ||
            !newJob.description.trim() ||
            !newJob.city.trim() ||
            !newJob.contract_type.trim() ||
            !newJob.salary.trim()
        ) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        // RESET ERRORE
        setError('');

        try {
            const createdJob = await jobsAPI.createJob(newJob);
          setJobs(prev => [...prev, createdJob]);

            // Reset form
            setNewJob({
                title: '',
                description: '',
                city: '',
                contract_type: '',
                salary: ''
            });

            setShowSuccessModal(true);
            setShowForm(false);
            setTimeout(() => setShowSuccessModal(false), 3000);

        } catch (err) {
            setError(err.message || 'Errore durante la pubblicazione');
        }
    };




    const filteredCandidates = candidates.filter(c => {
        const matchName = (c.candidate_name ?? '').toLowerCase().includes(filters.search.toLowerCase());
        const matchStatus = !filters.status || c.status === filters.status;
        const matchRole = !filters.role || (c.job_title ?? '').toLowerCase() === filters.role.toLowerCase();
        return matchName && matchStatus && matchRole;
    });


    const resetFilters = () => {
        setFilters({
            search: '',
            status: '',
            role: ''
        });
    };

    const totalCandidates = filteredCandidates.length;



    return (
        <>
            <div className='w-75 w-md-50 justify-content-center mx-auto text-center shadow-sm bg-black rounded-4'>
                <h1 className="display-4 fw-semibold text-info  mb-3 mt-3 p-3">Dashboard Azienda</h1>
            </div>
            <Hero />
            <Container fluid className="py-4 bg-light d-flex row justify-content-center">


                <div className="mb-4 d-flex justify-content-end align-items-end ">

                    <Button
                        variant="success"
                        onClick={() => setShowForm(true)}
                    >
                        Crea nuovo annuncio
                    </Button>
                </div>
                {/* FILTRI */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>

                        <Form>
                            <Row className="align-items-end">

                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">
                                            Cerca nome candidato
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Filtra per nome..."
                                            value={filters.search}
                                            onChange={(e) =>
                                                setFilters({
                                                    ...filters,
                                                    search: e.target.value
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={3}>
                                    <Form.Group>

                                        <Form.Label className="small fw-bold">
                                            Stato
                                        </Form.Label>

                                        <Form.Select
                                            value={filters.status}
                                            onChange={(e) =>
                                                setFilters({
                                                    ...filters,
                                                    status: e.target.value
                                                })
                                            }
                                        >
                                            <option value=''>Tutti gli stati</option>
                                            <option value='inviata'>Inviata</option>
                                            <option value='accettata'>Accettata</option>
                                            <option value='rifiutata'>Rifiutata</option>
                                        </Form.Select>

                                    </Form.Group>
                                </Col>

                                <Col md={3}>
                                    <Form.Group>

                                        <Form.Label className="small fw-bold">
                                            Posizione
                                        </Form.Label>

                                        <Form.Select
                                            value={filters.role}
                                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                                        >
                                            <option value=''>Tutte le posizioni</option>
                                            {jobs.map(j => (
                                                <option key={j.id} value={j.title}>{j.title}</option>
                                            ))}
                                        </Form.Select>

                                    </Form.Group>
                                </Col>

                                <Col md={2} className="d-flex flex-column justify-content-end">

                                    <Button
                                        variant="primary"
                                        className="w-100"
                                        onClick={() =>
                                            setFilters({
                                                search: '',
                                                status: '',
                                                role: ''
                                            })
                                        }
                                    >
                                        Reset
                                    </Button>

                                </Col>

                            </Row>
                        </Form>

                    </Card.Body>
                </Card>

                {/* TABELLA */}
                <Card className="border-0 shadow-sm">

                    <Table hover responsive className="mb-0">

                        <thead className="bg-light">
                            <tr>
                                <th>Candidato</th>
                                <th>Posizione</th>
                                <th>Data</th>
                                <th>Stato</th>
                                <th className="text-end">Azioni</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-3">
                                        Caricamento candidature...
                                    </td>
                                </tr>
                            ) : filteredCandidates.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-3 text-muted">
                                        Nessuna candidatura trovata.
                                    </td>
                                </tr>
                            ) : (
                                filteredCandidates.map(c => (
                                    <tr key={c.id} className="align-middle">
                                        <td className="fw-bold">{c.candidate_name}</td>
                                        <td>{c.job_title}</td>
                                        <td>{new Date(c.created_at).toLocaleDateString('it-IT')}</td>
                                        <td>
                                            <Badge bg={c.status === 'rifiutata' ? 'danger' : c.status === 'inviata' ? 'warning' : 'success'}>
                                                {c.status}
                                            </Badge>
                                        </td>
                                        <td className="text-end">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => handleShow(c)}
                                            >
                                                Profilo
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>

                        <tfoot className="table-light">
                            <tr>
                                <td colSpan="5" className="text-end fw-bold">
                                    Totale candidati: {filteredCandidates.length}
                                </td>
                            </tr>
                        </tfoot>

                    </Table>

                </Card>
                <h4 className="fw-bold mb-1 text-info fs-1">I tuoi annunci</h4>
                {/* ANNUNCI RELATIVI ALLA AZIENDA */}
                <div className="row g-4">
                    {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                            <JobCard
                                key={job.id}
                                name={job.company_name}
                                job={job}
                                style={{ animationDelay: `${index * 0.08}s` }}

                            />
                        ))
                    ) : (
                        <p className="text-center text-muted">
                            Pubblica il tuo primo annuncio per iniziare a ricevere candidature!
                        </p>
                    )}
                </div>
                <CompAzienda/>
                {/* MODAL CREA ANNUNCIO */}
                <Modal
                    show={showForm}
                    onHide={() => {
                        setShowForm(false);
                        setError('');
                    }}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Crea nuovo annuncio</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Control
                                    name="title"
                                    placeholder="Titolo"
                                    value={newJob.title}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    name="city"
                                    placeholder="Città"
                                    value={newJob.city}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="g-3 mt-1">
                            <Col md={6}>
                                <Form.Control
                                    name="salary"
                                    placeholder="Stipendio"
                                    value={newJob.salary}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    name="contract_type"
                                    placeholder="Tipo contratto"
                                    value={newJob.contract_type}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={12}>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="description"
                                    placeholder="Descrizione del lavoro..."
                                    value={newJob.description}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        {error && (
                            <p className="text-danger mt-2 mb-0">{error}</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShowForm(false);
                                setError('');
                            }}
                        >
                            Annulla
                        </Button>
                        <Button variant="success" onClick={handleCreateJob}>
                            Pubblica annuncio
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* MODALE CANDIDATO */}
                <DettaglioCandidato
                    show={showModal}
                    handleClose={handleClose}
                    candidate={selectedCandidate}
                    onStatusChange={handleStatusChange}
                />

                {/* MODALE SUCCESSO */}
                <Modal
                    show={showSuccessModal}
                    onHide={() => setShowSuccessModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Operazione completata
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Il tuo annuncio è stato pubblicato correttamente.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Chiudi
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
};

export default CompanyPage;