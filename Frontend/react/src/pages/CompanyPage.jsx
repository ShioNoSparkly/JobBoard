import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Hero from '../components/Hero'
import JobCard from '../components/JobCard'
import DettaglioCandidato from '../components/DettaglioCandidato'
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
    // Esempio di dati
    const [candidates, setCandidates] = useState([
        { id: 1, name: "Candidato1", role: "Frontend Dev", status: "Accettata", date: "2025-05-10" },
        { id: 2, name: "Candidato2", role: "Backend Dev", status: "Rifiutata", date: "2026-05-08" },
        { id: 3, name: "Candidato3", role: "Ux Designer", status: "Rifiutata", date: "2026-06-11" },
        { id: 4, name: "Candidato4", role: "Full Stack", status: "Accettata", date: "2026-07-09" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [showForm, setShowForm] = useState(true);

    const [error, setError] = useState('');

    const [filters, setFilters] = useState({
        search: '',
        status: '',
        role: ''
    });

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

    const handleCreateJob = () => {

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

        // NUOVO ANNUNCIO
        const createdJob = {
            id: Date.now(),
            ...newJob
        };

        console.log("NUOVO ANNUNCIO:", createdJob);
        setNewJob({
            title: '',
            description: '',
            city: '',
            contract_type: '',
            salary: ''
        });

        
        setShowSuccessModal(true);

         setTimeout(() => {
            setShowSuccessModal(false);
        }, 3000);
    };




    const filteredCandidates = candidates.filter(c => {

        const matchName = c.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchStatus = !filters.status || c.status === filters.status;
        const matchRole = !filters.role || c.role.toLowerCase() === filters.role.toLowerCase();
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
<Hero/>
        <Container fluid className="py-4 bg-light d-flex row justify-content-center">

            <h2 className="mb-4">Dashboard Azienda</h2>

            {/* FORM CREAZIONE ANNUNCIO */}
            {showForm && (
                <Card className="border-0 shadow-sm mb-4 w-50">
                    <Card.Body>

                        <h5 className="fw-bold mb-3">
                            Crea nuovo annuncio
                        </h5>

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

                        {/* ERRORE */}
                        {error && (
                            <p className="text-danger mt-2 mb-0">
                                {error}
                            </p>
                        )}

                        <div className="mt-3 text-end">
                            <Button
                                variant="success"
                                onClick={handleCreateJob}
                            >
                                Pubblica annuncio
                            </Button>
                        </div>

                    </Card.Body>
                </Card>
            )}

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
                                        <option>Accettata</option>
                                        <option>Rifiutata</option>
                                        <option>In Revisione</option>
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
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                role: e.target.value
                                            })
                                        }
                                    >
                                        <option value=''>Tutte le posizioni</option>
                                        <option>Frontend Dev</option>
                                        <option>Backend Dev</option>
                                        <option>UX Designer</option>
                                        <option>Full Stack</option>
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

                        {filteredCandidates.map(c => (

                            <tr key={c.id} className="align-middle">

                                <td className="fw-bold">{c.name}</td>

                                <td>{c.role}</td>

                                <td>{c.date}</td>

                                <td>
                                    <Badge
                                        bg={
                                            c.status === 'Rifiutata'
                                                ? 'danger'
                                                : 'success'
                                        }
                                    >
                                        {c.status}
                                    </Badge>
                                </td>

                                <td className="text-end">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleShow(c)}
                                    >
                                        Profilo
                                    </Button>
                                </td>

                            </tr>

                        ))}

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

            {/* MODALE CANDIDATO */}
            <DettaglioCandidato
                show={showModal}
                handleClose={handleClose}
                candidate={selectedCandidate}
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