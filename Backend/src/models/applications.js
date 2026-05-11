// ============================================================
// models/applications.js — Model della tabella "applications"
//
// Il model si occupa SOLO di comunicare con il database.
// ============================================================

const pool = require("../config/db");

const CREATE_TABLE = `
 CREATE TABLE applications (
        id                SERIAL PRIMARY KEY,         
        candidate_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        job_id            INTEGER NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
        cover_letter      TEXT NOT NULL,
        status            VARCHAR(50) DEFAULT 'inviata'
    );
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () => {
  return pool.query(
    `SELECT
        a.*,
        u.name AS candidate_name,
        j.title AS job_title,
        j.company_id AS company_id
        FROM applications a
        JOIN users u ON a.candidate_id = u.id   
        JOIN job_listings j ON a.job_id = j.id
        `,
  );
};

findByCandidateId = (candidate_id) => {
  return pool.query(
    `SELECT
        a.*,
        u.name AS candidate_name,
        j.title AS job_title,
        j.company_id AS company_id
        FROM applications a
        JOIN users u ON a.candidate_id = u.id       
        JOIN job_listings j ON a.job_id = j.id
        WHERE a.candidate_id = $1`,
    [candidate_id],
  );
};

const findByCandidateAndJob = async (candidate_id, job_id) => {
  const result = await pool.query(
    `SELECT * FROM applications 
     WHERE candidate_id = $1 AND job_id = $2`,
    [candidate_id, job_id],
  );

  return result.rows[0]; // Retorna a candidatura se existir, ou undefined
};

const findByJobId = (job_id) => {
  return pool.query(
    `SELECT
           a.*,
           u.name AS candidate_name
        FROM applications a
        JOIN users u ON a.candidate_id = u.id
        WHERE a.job_id = $1`,
    [job_id],
  );
};

const create = ({ candidate_id, job_id, cover_letter }) => {
  return pool.query(
    `INSERT INTO applications (candidate_id, job_id, cover_letter)
         VALUES ($1, $2, $3)
         RETURNING id, candidate_id, job_id, cover_letter, status`,
    [candidate_id, job_id, cover_letter],
  );
};

const updateStatus = (id, status) => {
  return pool.query(
    `UPDATE applications            
            SET status = $1 
            WHERE id = $2
            RETURNING id, candidate_id, job_id, cover_letter, status`,
    [status, id],
  );
};

const aggiorna = (id, { cover_letter }) => {
  return pool.query(
    `UPDATE applications
            SET cover_letter = COALESCE($1, cover_letter)   
            WHERE id = $2
            RETURNING id, candidate_id, job_id, cover_letter, status`,
    [cover_letter, id],
  );
};

const remove = (id) => {
  return pool.query(`DELETE FROM applications WHERE id = $1 RETURNING id`, [
    id,
  ]);
};

module.exports = {
  init,
  create,
  findByJobId,
  findByCandidateId,
  updateStatus,
  aggiorna,
  remove,
};
