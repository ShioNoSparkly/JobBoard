
// Gestisce la creazione degli annunci e la logica di visibilità.

const Job = require('../models/Job');

const createJob = async (elencoJob, companyId) => {
    return await Job.create({ ...elencoJob, company_id: companyId });
};

const getJobsPerCompany = async (companyId) => {
    return await Job.findAll({ where: { company_id: companyId } });
};

const deleteJob = async (jobId, companyId) => {
    const job = await Job.findOne({ where: { id: jobId, company_id: companyId } });
    if (!job) throw new Error("Annuncio non trovato o non autorizzato");
    return await job.destroy();
};

const getAllJobs = async () => {
    return await Job.findAll({ order: [['created_at', 'DESC']] });
};

module.exports = {
    createJob,
    getJobsPerCompany,
    deleteJob,
    getAllJobs
};
