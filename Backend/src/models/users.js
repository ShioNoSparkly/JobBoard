// ============================================================
// models/users.js — Model della tabella "users"
// ============================================================

const pool = require("../config/db");

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id              serial          primary key,
    email           varchar(255)    unique  not null,
    password        text            not null,
    name            varchar(255)    not null,
    role            VARCHAR(20)     NOT NULL DEFAULT 'candidato'
                    CHECK (role IN ('azienda','candidato')),            
    token_version INTEGER           NOT NULL DEFAULT 0      
  );
`;

const init = () => pool.query(CREATE_TABLE);

// FIX #5 — Le query di lettura non restituiscono MAI la colonna "password".
// Anche se è un hash bcrypt, non deve uscire dalle API.
// L'unica eccezione è findByEmail (usata nel login) che ha bisogno
// dell'hash per confrontarlo con bcrypt.compare().

// Restituisce tutti gli users (senza password)
const findAll = () =>
  pool.query(
    "SELECT id, email, name, role, token_version FROM users ORDER BY id",
  );

// Restituisce un singolo utente per id (senza password)
const findById = (id) =>
  pool.query(
    "SELECT id, email, name, role, token_version FROM users WHERE id = $1",
    [id],
  );

// Restituisce un utente per email — include la password perché serve al login
const findByEmail = (email) =>
  pool.query("SELECT * FROM users WHERE email = $1", [email]);

// Inserisce un nuovo utente.
// RETURNING esclude la password dalla risposta.
const create = ({ name, email, password, role = "candidato" }) =>
  pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, token_version`,
    [name, email, password, role],
  );

// Aggiornamento parziale dei campi anagrafici (COALESCE = aggiorna solo i campi inviati)
const update = (id, { name, email, role }) =>
  pool.query(
    `UPDATE users
     SET name  = COALESCE($1, name),
         email = COALESCE($2, email),
         role  = COALESCE($3, role),
         token_version = token_version + 1
     WHERE id = $5
     RETURNING id, name, email, role, token_version`,
    [name, email, role, id],
  );

// Aggiorna la password E incrementa token_version.
// FIX #1 — incrementare token_version invalida tutti i JWT emessi
// prima del cambio password: anche se il vecchio token non è ancora scaduto,
// il middleware lo rifiuterà perché il numero non coincide più.
const updatePassword = (id, hashedPassword) =>
  pool.query(
    `UPDATE users           
     SET password      = $1,
         token_version = token_version + 1
     WHERE id = $2
     RETURNING id`,
    [hashedPassword, id],
  );

// Elimina un utente per id.
// FIX #1 — non serve aggiornare token_version: la riga sparisce dal DB,
// quindi la query di verifica in autenticato() non troverà nulla
// e restituirà 401 automaticamente.
const remove = (id) =>
  pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);


// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init,
  findAll,
  findById,
  findByEmail,
  create,
  update,
  updatePassword,
  remove,
};
