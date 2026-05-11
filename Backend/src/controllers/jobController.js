
// Gestione Annunci
// controller gestisce la creazione e la visualizzazione degli annunci

const db = require('./config/db'); // Il tuo file di connessione al database

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await db.query('SELECT * FROM job_listings ORDER BY created_at DESC');
        res.json(jobs.rows);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero degli annunci" });
    }
};

exports.createJob = async (req, res) => {
    const { title, description, contract_type, city, salary } = req.body;
    const company_id = req.user.id; // Preso dal middleware JWT

    try {
        const newJob = await db.query(
            'INSERT INTO job_listings (company_id, title, description, contract_type, city, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [company_id, title, description, contract_type, city, salary]
        );
        res.status(201).json(newJob.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Errore durante la creazione dell'annuncio" });
    }
};
