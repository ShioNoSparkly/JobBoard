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
        { id: 1, name: "Mario Rossi", role: "Frontend Dev", status: "In Revisione", date: "2024-05-10" },
        { id: 2, name: "Laura Bianchi", role: "UX Designer", status: "Colloquio", date: "2024-05-12" },
        { id: 3, name: "Luca Verdi", role: "Backend Dev", status: "Rifiutato", date: "2024-05-08" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

const handleShow = (candidate) => {
   setSelectedCandidate(candidate);
   setShowModal(true);
};

const handleClose = () => {
   setShowModal(false);
};



    return (
        
        <Container fluid className="py-4 bg-light">
            <h2 className="mb-4">Dashboard Candidature</h2>

            {/* 1. KPI Cards - Riepilogo rapido */}
            <Row className="mb-4">
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
                {/* Aggiungi altri KPI qui */}
            </Row>

            {/* 2. Filtri di Controllo */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                    <Form>
                        <Row className="align-items-end">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Cerca Candidato</Form.Label>
                                    <Form.Control type="text" placeholder="Nome o parola chiave..." />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Stato</Form.Label>
                                    <Form.Select>
                                        <option>Tutti gli stati</option>
                                        <option>In Revisione</option>
                                        <option>Colloquio</option>
                                        <option>Assunto</option>
                                        <option>Rifiutato</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Posizione</Form.Label>
                                    <Form.Select>
                                        <option>Tutte le posizioni</option>
                                        <option>Frontend Dev</option>
                                        <option>UX Designer</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" className="w-100">Applica Filtri</Button>
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
                        {candidates.map(c => (
                            <tr key={c.id} className="align-middle">
                                <td className="fw-bold">{c.name}</td>
                                <td>{c.role}</td>
                                <td>{c.date}</td>
                                <td>
                                    <Badge bg={c.status === 'Rifiutato' ? 'danger' : 'info'}>
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
                                    <Button variant="success" size="sm">Avanza</Button>
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