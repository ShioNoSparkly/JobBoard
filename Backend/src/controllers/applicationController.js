
// Candidature e Stati
// controllers/applicationController.js

const applicationService = require('../services/applicationService');

// Il Candidato invia una candidatura
const apply = async (req, res) => {
    try {
        // req.user.id viene dal middleware JWT (il candidato loggato)
        const candidateId = req.user.id;
        const { job_id, cover_letter } = req.body;

        const newApplication = await applicationService.applyToJob(
            candidateId,
            job_id,
            cover_letter
        );

        res
            .status(201)
            .json({
                message: "Candidatura inviata con successo",
                data: newApplication
            });
    } catch (err) {
        // Gestiamo errori tipo "Ti sei già candidato" (400) o "Job non trovato" (404)
        res
            .status(err.statusCode || 500)
            .json({ error: err.message });
    }
};

// L'Azienda cambia lo stato (es. da 'revisione' a 'accettato')
const updateStatus = async (req, res) => {
    try {
        const companyId = req.user.id; // ID dell'azienda loggata
        const applicationId = req.params.id; // passato dall'URL /applications/:id/status
        const { status } = req.body;

        const updatedApplication = await applicationService.updateApplicationStatus(
            applicationId,
            status,
            companyId
        );

        res
            .json({
                message: "Stato candidatura aggiornato",
                data: updatedApplication
            });
    } catch (err) {
        // Gestiamo l'errore "Non autorizzato" se l'azienda prova a modificare 
        // una candidatura di un annuncio non suo
        res
            .status(err.statusCode || 403)
            .json({ error: err.message });
    }
};

// Il Candidato vede le sue candidature
const getMyApplications = async (req, res) => {
    try {
        const applications = await applicationService.getCandidateApplications(req.user.id);
        res
            .json(applications);
    } catch (err) {
        res
            .status(500)
            .json({ error: err.message });
    }
};

const getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const companyId = req.user.id; // passato da autenticato

        const applications = await applicationService.getApplicationsByJob(
            jobId,
            companyId
        );

        res
            .json({
                successo: true,
                data: applications
            });
    } catch (err) {
        res
            .status(err.statusCode || 500)
            .json({
                successo: false,
                errore: err.message
            });
    }
};

module.exports = {
    apply,
    updateStatus,
    getMyApplications,
    getApplicationsByJob
};
