import React from 'react';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Row, Col, Badge, ListGroup } from 'react-bootstrap';

const DettaglioCandidato = ({ show, handleClose, candidate }) => {
    if (!candidate) return null; // Evita errori se il candidato è null

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Dettagli Candidato: {candidate.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className="mb-4">
                    <Col md={8}>
                        <h5>{candidate.role}</h5>
                        <Badge bg={candidate.status === 'Rifiutato' ? 'danger' : 'info'} className="mb-2">
                            Stato: {candidate.status}
                        </Badge>
                        <p className="text-muted small">Candidatura inviata il: {candidate.date}</p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <Button variant="outline-primary" size="sm" className="me-2">Scarica CV</Button>
                    </Col>
                </Row>

                <hr />

                <h6>Informazioni di Contatto</h6>
                <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item><strong>Email:</strong> {candidate.email || "Email mancante"}</ListGroup.Item>
                   
                </ListGroup>

                <h6>Lettera di presentazione</h6>
                <textarea disabled
                    className="form-control"
                    rows="5"
                    value=''
                    onChange={(e) =>
                        setCoverLetter(e.target.value)
                    }/>


            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
                <Button variant="danger">Rifiuta</Button>
                <Button variant="success">Accetta Candidatura</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DettaglioCandidato;