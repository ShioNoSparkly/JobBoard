
// Gestione Annunci
// controller gestisce la creazione e la visualizzazione degli annunci


const jobService = require('../services/jobService');


// Crea un nuovo annuncio (Azienda)
const createJob = async (req, res) => {
    try {
        const companyId = req.user.id; // Preso dal JWT
        const job = await jobService.createJob(req.body, companyId);

        res
            .status(201)
            .json({
                successo: true,
                message: "Annuncio pubblicato con successo",
                dati: job
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

// Recupera un singolo annuncio per ID
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobService.getJobById(parseInt(id, 10));

        res
            .json({
                successo: true,
                dati: job
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

// Recupera tutti gli annunci (Candidati / Pubblico)
// con aggiunta di filtri

const getAllJobs = async (req, res) => {
    try {
        // Estraiamo i potenziali parametri dall'URL (?search=...&city=...&contract_type=...)
        const { city, contract_type, search } = req.query;

        // Passiamo i filtri al service
        const jobs = await jobService.getAllJobs({ city, contract_type, search });

        res.json({
            successo: true,
            dati: jobs
        });
    } catch (err) {
        res.status(500).json({
            successo: false,
            error: err.message
        });
    }
};

const getCities = async( req, res, next ) => {
    try {
        const cities = await jobService.getCities();
        res.json({dati: cities})
    } catch (err) {
        next(err)
    }
}

// Recupera tutti gli annunci per Azienda
const getCompanyJobs = async (req, res) => {
    try {
        // Estratto dal token JWT
        // Forza la conversione a numero intero (base 10)
        const companyId = parseInt(req.user.id, 10);
        const jobs = await jobService.getJobsPerCompany(companyId);
        res
            .json({
                successo: true,
                dati: jobs
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


// Elimina un annuncio (Solo azienda proprietaria)
const deleteJob = async (req, res) => {
    try {
        //Forza la conversione in numero intero prima di passarlo al service
        const jobId = parseInt(req.params.id, 10);
        // alternativa sarebbe:
        //const { id } = req.params; con la destrutturazione
        //const jobId = parseInt(id, 10);

        const companyId = req.user.id;

        // Il service verificherà se l'annuncio esiste e se appartiene a questa azienda,
        // poi procederà con l'eliminazione dal database
        await jobService.deleteJob(jobId, companyId);
        res
            .status(200)
            .json({
                successo: true,
                message: "Annuncio eliminato con successo"
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

// Aggiorna un annuncio esistente
const updateJob = async (req, res) => {
    try {
        //Forza la conversione in numero intero prima di passarlo al service
        const jobId = parseInt(req.params.id, 10);
        const companyId = req.user.id; // Preso sempre dal token JWT

        // Il service verificherà la proprietà dell'annuncio prima di aggiornare nel model
        const updatedJob = await jobService.updateJob(jobId, req.body, companyId);

        res
            .json({
                successo: true,
                message: "Annuncio modificato con successo",
                dati: updatedJob
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
    createJob,
    getJobById,
    getAllJobs,
    getCompanyJobs,
    deleteJob,
    updateJob,
    getCities
};
