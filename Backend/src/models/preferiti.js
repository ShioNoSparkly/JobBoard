// ============================================================
// models/preferiti.js — Model della tabella "preferiti"
// ============================================================
const pool = require("../config/db");

const CREATE_TABLE = `
  create table preferiti(
        id              SERIAL      PRIMARY KEY,
        candidate_id    INTEGER     NOT NULL        REFERENCES users(id) ON DELETE CASCADE,
        job_id          INTEGER     NOT NULL        REFERENCES job_listings(id) ON DELETE CASCADE
    ); 
`;

const init = () => pool.query(CREATE_TABLE);

findAll = () => {
  return pool.query(
    `SELECT             
        p.*,
        u.name AS candidate_name,
        j.title AS job_title,
        j.company_id AS company_id
        FROM preferiti p
        JOIN users u ON p.candidate_id = u.id   
        JOIN job_listings j ON p.job_id = j.id
        `,
  );
};

const findByCandidateId = (candidate_id) => {
  return pool.query(
    `SELECT
        p.*,
        u.name AS candidate_name,
        j.title AS job_title,
        j.company_id AS company_id
        FROM preferiti p
        JOIN users u ON p.candidate_id = u.id               
        JOIN job_listings j ON p.job_id = j.id  
        WHERE p.candidate_id = $1`,
    [candidate_id],
  );
};

const findByJobId = (job_id) => {
  return pool.query(
    `SELECT
              p.*,
                u.name AS candidate_name
                FROM preferiti p
                JOIN users u ON p.candidate_id = u.id
                WHERE p.job_id = $1`,
    [job_id],
  );
};

const create = ({ candidate_id, job_id }) => {
  return pool.query(
    `INSERT INTO preferiti (candidate_id, job_id)   
         VALUES ($1, $2) RETURNING *`,
    [candidate_id, job_id],
  );
};

const findByCandidateIdAndJobId = (candidate_id, job_id) => {
  return pool.query(
    `SELECT
        p.*,
        u.name AS candidate_name,
        j.title AS job_title,
        j.company_id AS company_id  
        FROM preferiti p
        JOIN users u ON p.candidate_id = u.id
        JOIN job_listings j ON p.job_id = j.id
        WHERE p.candidate_id = $1 AND p.job_id = $2`,
    [candidate_id, job_id],
  );
};

const remove = (id) => {
  return pool.query(`DELETE FROM preferiti WHERE id = $1 RETURNING id`, [id]);
};

module.exports = {
  init,
  findAll,
  findByCandidateId,
  findByJobId,
  findByCandidateIdAndJobId,
  create,
  remove,
};
