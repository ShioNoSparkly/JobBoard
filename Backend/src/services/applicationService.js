
// Gestisce l'invio delle candidature e i cambi di stato.
// 

const Application = require('../models/applications');
const Job = require('../models/job_listings');

// per rispondere ad un annuncio job
const applyToJob = async (candidateId, jobId, coverLetter) => {
    // Verifichiamo se l'annuncio esiste
    const job = await Job.findById(jobId);
    if (!job) {
        const err = new Error("L'annuncio non esiste");
        err.statusCode = 404;
        throw err;
    }

    // CONTROLLO PREVENTIVO: Il candidato si è già candidato?
    // 
    const candidaturaEsistente = await Application.findByCandidateAndJob(candidateId, jobId);

    if (candidaturaEsistente) {
        const err = new Error("Ti sei già candidato per questa posizione");
        err.statusCode = 409; // conflitto
        throw err;
    }

    // Se passiamo i controlli, creiamo la candidatura
    return await Application.create({
        candidate_id: candidateId,
        job_id: jobId,
        cover_letter: coverLetter,
        status: 'inviata'
    });
};

const updateApplicationStatus = async (applicationId, newStatus, companyId) => {
    //  Recuperiamo la candidatura includendo i dati dell'annuncio associato
    const application = await Application.findById(applicationId);

    if (!application) {
        const err = new Error("Candidatura non trovata");
        err.statusCode = 404;
        throw err;
    }

    //  Recuperiamo l'annuncio per vedere chi è il proprietario
    const job = await Job.findById(application.job_id);

    //  L'azienda loggata è la stessa che ha pubblicato l'annuncio? 
    // così l'annuncio che non appartiene all'azienda non può essere modificato
    if (job.company_id !== companyId) {
        const err = new Error("Non sei autorizzato a gestire questa candidatura");
        err.statusCode = 403;
        throw err;
    }

    //  Aggiornamento dello stato
    return await Application.updateStatus(applicationId, newStatus);
};

const getCandidatoApplications = async (candidateId) => {
    return await Application.findByCandidateId(candidateId);
};


const getApplicationsByJob = async (jobId, companyId) => {
    // Verifichiamo prima che l'annuncio appartenga all'azienda
    //
    const job = await Job.findById(jobId);
    if (!job || job.company_id !== companyId) {
        const err = new Error("Non autorizzato o annuncio non trovato");
        err.statusCode = 403;
        throw err;
    }

    // ritorna al model per prendere i candidati
    return await Application.findByJobId(jobId);
};



module.exports = {
    applyToJob,
    updateApplicationStatus,
    getCandidatoApplications,
    getApplicationsByJob
};
