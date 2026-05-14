
// Candidature e Stati
// controllers/applicationController.js

const applicationService = require('../services/applicationService');

// Il Candidato invia una candidatura
const apply = async (req, res) => {
    try {
        // req.user.id viene dal middleware JWT (il candidato loggato)
        const candidateId = parseInt(req.user.id, 10);
        const { job_id, cover_letter } = req.body;

        const newApplication = await applicationService.applyToJob(
            candidateId,
            parseInt(job_id, 10),
            cover_letter
        );

        res
            .status(201)
            .json({
                successo: true,
                message: "Candidatura inviata con successo",
                dati: newApplication
            });
    } catch (err) {
        // errori tipo "Ti sei già candidato" (400) o "Job non trovato" (404)
        res
            .status(err.statusCode || 500)
            .json({
                successo: false,
                error: err.message
            });
    }
};

// L'Azienda cambia lo stato (es. da 'revisione' a 'accettato')
const updateStatus = async (req, res) => {
    try {
        // Estratto dal token JWT
        // Forza la conversione a numero intero (base 10)
        const companyId = parseInt(req.user.id, 10);
        const { id } = req.params; // passato dall'URL /applications/:id/status
        const { status } = req.body;

        const updatedApplication = await applicationService.updateApplicationStatus(
            parseInt(id, 10),
            status,
            companyId
        );

        res
            .json({
                successo: true,
                message: "Stato candidatura aggiornato",
                dati: updatedApplication
            });
    } catch (err) {
        // Gestiamo se l'azienda prova a modificare 
        // una candidatura di un annuncio non suo
        res
            .status(err.statusCode || 500)
            .json({
                successo: false,
                error: err.message
            });
    }
};

// Il Candidato vede le sue candidature
const getMyApplications = async (req, res) => {
    try {
        const candidateId = parseInt(req.user.id, 10); // Estratto dal token JWT (Candidato)

        // Chiamiamo la funzione nel service
        const applications = await applicationService.getCandidatoApplications(candidateId);

        res
            .json({
                successo: true,
                dati: applications
            });
    } catch (err) {
        res
            .status(err.statusCode || 500)
            .json({
                successo: false,
                error: err.message
            });
    }
};

// funzione che riceve la chiamata dal Router
const getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const companyId = parseInt(req.user.id, 10); // passato da autenticato

        const applications = await applicationService.getApplicationsByJob(
            parseInt(jobId, 10),
            companyId
        );

        res
            .json({
                successo: true,
                dati: applications
            });
    } catch (err) {
        res
            .status(err.statusCode || 500)
            .json({
                successo: false,
                error: err.message
            });
    }
};

module.exports = {
    apply,
    updateStatus,
    getMyApplications,
    getApplicationsByJob
};
