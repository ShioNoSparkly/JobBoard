// ============================================================
// middleware/auth.js — Autenticazione e autorizzazione
// ============================================================

const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");

// ── autenticato ───────────────────────────────────────────────
// Verifica il token JWT e, dopo la firma, controlla nel DB che:
//   - l'utente esista ancora
//   - token_version nel token coincida con quella nel DB
//
// FIX #1 — questa query aggiuntiva risolve due scenari:
//   a) Utente eliminato: la riga non esiste → 401
//   b) Password cambiata: token_version è cambiata → 401
//
const autenticato = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ successo: false, errore: "Token mancante" });
  }

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica nel DB che l'utente esista ancora e che token_version coincida
    const result = await usersModel.findById(payload.id);
    const user = result.rows[0];

    if (!user) {
      // L'user è stato eliminato dopo l'emissione del token
      return res
        .status(401)
        .json({ successo: false, errore: "user non trovato" });
    }

    if (user.token_version !== payload.token_version) {
      // La password è cambiata o il token è stato invalidato manualmente
      return res
        .status(401)
        .json({
          successo: false,
          errore: "Token non più valido, effettua nuovamente il login",
        });
    }

    req.user = payload;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ successo: false, errore: "Token non valido o scaduto" });
  }
};

// ── soloAzienda ─────────────────────────────────────────────────
// Consente l'accesso solo agli user con ruolo "Azienda".
// Deve essere usato sempre DOPO autenticato.
// const soloAzienda = (req, res, next) => {
//  if (req.user?.role !== "azienda") {
//    return res.status(403).json({
//      successo: false,
//      errore: "Accesso riservato agli aziende",
//    });
//  }
//  next();
//};

// ── soloAzienda (Case-Insensitive) ─────────────────────────────
const soloAzienda = (req, res, next) => {
  // Verifichiamo il ruolo trasformandolo in minuscolo
  const role = req.user?.role?.toLowerCase();

  if (role !== "azienda") {
    return res
      .status(403)
      .json({
        successo: false,
        errore: "Accesso riservato alle aziende",
      });
  }
  next();
};


// ── solo se Azienda ──────────────────────────────────────────────
// FIX #3 e #6 — Consente l'accesso solo se:
//   - l'user sta operando su sé stesso (req.user .id === req.params.id)
//   - oppure è una Azienda
//
// Senza questo middleware, qualsiasi user autenticato potrebbe
// leggere o modificare i dati di qualsiasi altro user.
//  const soloSéOAzienda = (req, res, next) => {
//  const idRichiesto = parseInt(req.params.id);
//  const isAzienda = req.user?.role === "Azienda";
// const isSéStesso = req.user?.id === idRichiesto;

// if (!isAzienda && !isSéStesso) {
//    return res.status(403).json({
//      successo: false,
//      errore: "Non sei autorizzato ad accedere a questa risorsa",
//    });
//  }
//  next();
//};


// ── soloSéOAzienda  ──────────────────────────────
const soloSéOAzienda = (req, res, next) => {
  // Prendiamo l'ID dai parametri (es. /users/:id)
  const idRisorsa = parseInt(req.params.id);
  const idUtenteLoggato = req.user?.id;
  const role = req.user?.role?.toLowerCase();

  const isAzienda = role === "azienda";
  const isSéStesso = idUtenteLoggato === idRisorsa;

  // così puoi procedere se sei un'azienda che ha potere di visione 
  // Oppure se la risorsa che stai cercando di toccare è la tua.
  if (isAzienda || isSéStesso) {
    return next();
  }

  return res.status(403).json({
    successo: false,
    errore: "Non hai i permessi per accedere a questa risorsa",
  });
};


// solo il candidato
const soloCandidato = (req, res, next) => {
  if (req.user?.role?.toLowerCase() !== "candidato") {
    return res
      .status(403)
      .json({
        successo: false,
        errore: "Accesso riservato ai candidati"
      });
  }
  next();
};


// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  autenticato,
  soloAzienda,
  soloSéOAzienda,
  soloCandidato
};
