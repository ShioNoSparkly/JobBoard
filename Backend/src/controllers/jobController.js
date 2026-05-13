
// Gestione Annunci
// controller gestisce la creazione e la visualizzazione degli annunci


const jobService = require('../services/jobService');


// Crea un nuovo annuncio (Azienda)
const createJob = async (req, res) => {
    try {
        const companyId = req.user.id; // Preso dal JWT
        const job = await jobService.createJob(req.body, companyId);

        res.status(201).json({
            successo: true,
            message: "Annuncio pubblicato con successo",
            data: job
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            successo: false,
            error: err.message
        });
    }
};

// Recupera un singolo annuncio per ID
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobService.getJobById(parseInt(id, 10));

        res.json({
            successo: true,
            data: job
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            successo: false,
            error: err.message
        });
    }
};

// Recupera tutti gli annunci (Candidati / Pubblico)
const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.json({
            successo: true,
            data: jobs
        });
    } catch (err) {
        res.status(500).json({
            successo: false,
            error: err.message
        });
    }
};


// Elimina un annuncio (Solo azienda proprietaria)
const deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const companyId = req.user.id;

        await jobService.deleteJob(jobId, companyId);
        res.status(200).json({
            successo: true,
            message: "Annuncio eliminato con successo"
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            successo: false,
            error: err.message
        });
    }
};

module.exports = {
    createJob,
    getJobById,
    getAllJobs,
    deleteJob
};
