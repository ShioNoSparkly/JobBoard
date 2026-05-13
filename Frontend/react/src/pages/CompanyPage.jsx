import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import DettaglioCandidato from '../components/DettaglioCandidato'
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Table,
    Badge
} from 'react-bootstrap';


const CompanyPage = () => {
    // Esempio di dati
    const [candidates, setCandidates] = useState([
        { id: 1, name: "Azienda1", role: "Frontend Dev", status: "Accettata", date: "2025-05-10" },
        { id: 2, name: "Azienda2", role: "Backend Dev", status: "Rifiutata", date: "2026-05-08" },
        { id: 3, name: "Azienda3", role: "Ux Designer", status: "Rifiutata", date: "2026-06-11" },
        { id: 4, name: "Azienda4", role: "Full Stack", status: "Accettata", date: "2026-07-09" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        role: ''
    });

    const handleShow = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        city: '',
        contract_type: '',
        salary: ''
    });

    const handleChange = (e) => {
        setNewJob({
            ...newJob,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateJob = () => {
        console.log("NUOVO ANNUNCIO:", newJob);

        alert("Annuncio creato con successo!");

        setNewJob({
            title: '',
            description: '',
            city: '',
            contract_type: '',
            salary: ''
        });
    };

   const filteredCandidates = candidates.filter(c => {

    const matchName =c.name.toLowerCase().includes(filters.search.toLowerCase());
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



    return (

        <Container fluid className="py-4 bg-light d-flex row justify-content-center">
            <h2 className="mb-4">Dashboard Candidature</h2>


            <Row className="mb-4 d-flex justify-content-center">
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted small uppercase">Totale Candidati</Card.Title>
                            <h3 className="fw-bold">128</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm border-start border-primary border-4">
                        <Card.Body>
                            <Card.Title className="text-muted small">In Colloquio</Card.Title>
                            <h3 className="fw-bold text-primary">12</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Card className="border-0 shadow-sm mb-4 w-50">
                <Card.Body>

                    <h5 className="fw-bold mb-3">
                        Crea nuovo annuncio
                    </h5>

                    {/* PRIMA RIGA */}
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

                    {/* SECONDA RIGA */}
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
                                onChange={handleChange} />
                        </Col>
                    </Row>


                    <div className="mt-3 text-end">
                        <Button
                            variant="success"
                            onClick={handleCreateJob}>
                            Pubblica annuncio
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                    <Form>
                        <Row className="align-items-end">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Cerca nome candidato</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Filtra per nome..."
                                        value={filters.search}
                                        onChange={(e) =>
                                            setFilters({ ...filters, search: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Stato</Form.Label>
                                    <Form.Select value={filters.status}
                                        onChange={(e) =>
                                            setFilters({ ...filters, status: e.target.value })
                                        } >
                                        <option value=''>Tutti gli stati</option>
                                        <option >Accettata</option>
                                        <option >Rifiutata</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Posizione</Form.Label>
                                    <Form.Select value={filters.role}
                                        onChange={(e) =>
                                            setFilters({ ...filters, role: e.target.value })
                                        } >
                                        <option value=''>Tutte le posizioni</option>
                                        <option>Frontend Dev</option>
                                        <option >Backend Dev</option>
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

            {/* 3. Tabella Candidati */}
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
                                    <Badge bg={c.status === 'Rifiutata' ? 'danger' : 'success'}>
                                        {c.status}
                                    </Badge>
                                </td>
                                <td className="text-end">
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleShow(c)}
                                    >
                                        Profilo
                                    </Button>
                                    <Button variant="primary" size="sm">Avanza</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            <DettaglioCandidato
                show={showModal}
                handleClose={handleClose}
                candidate={selectedCandidate}
            />
        </Container>


    );
};

export default CompanyPage;