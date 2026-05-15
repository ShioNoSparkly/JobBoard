import React from 'react';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { applicationAPI } from '../services/api';

const DettaglioCandidato = ({ show, handleClose, candidate, onStatusChange}) => {
    if (!candidate) return null;

    const handleAccetta = async () => {
        try {
            await applicationAPI.updateStatus(candidate.id, 'accettata');
            onStatusChange(candidate.id, 'accettata');
            handleClose();
        } catch (err) {
            console.error("Errore accettazione:", err.message);
        }
    };

    const handleRifiuta = async () => {
        try {
            await applicationAPI.updateStatus(candidate.id, 'rifiutata');
            onStatusChange(candidate.id, 'rifiutata');
            handleClose();
        } catch (err) {
            console.error("Errore rifiuto:", err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Dettagli Candidato: {candidate.candidate_name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className="mb-4">
                    <Col md={8}>
                        <h5>{candidate.job_title}</h5>
                        <Badge 
                            bg={
                                candidate.status === 'rifiutata' ? 'danger' 
                                : candidate.status === 'inviata' ? 'warning' 
                                : 'success'
                            } 
                            className="mb-2"
                        >
                            Stato: {candidate.status}
                        </Badge>
                        <p className="text-muted small">
                            Candidatura inviata il: {new Date(candidate.created_at).toLocaleDateString('it-IT')}
                        </p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        {/* <Button variant="outline-primary" size="sm">Scarica CV</Button> */}
                    </Col>
                </Row>

                <hr />

                <h6>Informazioni di Contatto</h6>
                <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item>
                        <strong>Email:</strong> {candidate.candidate_email ?? "Email mancante"}
                    </ListGroup.Item>
                </ListGroup>

                <h6>Lettera di presentazione</h6>
                <textarea
                    disabled
                    className="form-control"
                    rows="5"
                    value={candidate.cover_letter ?? ''}
                    readOnly
                />
            </Modal.Body>

             <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
        <Button variant="danger" onClick={handleRifiuta}>Rifiuta</Button>
        <Button variant="success" onClick={handleAccetta}>Accetta Candidatura</Button>
    </Modal.Footer>
        </Modal>
    );
};

export default DettaglioCandidato;