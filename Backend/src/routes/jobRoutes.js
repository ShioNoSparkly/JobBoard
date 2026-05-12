

// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

const { autenticato, soloAzienda } = require("../middleware/auth");

// Sostituiamo il "mock" di prima con i middleware reali

console.log("Ciao dal router job")

// TEST: Creazione annuncio senza middleware
// uso un ID esistente nel tuo DB (es. 1)
router.post('/test-create', (req, res, next) => {

    console.log("Dentro la rotta test-create")

    req.user = { id: 1, role: 'azienda' }; // MOCK: simuliamo il middleware
    next();
}, jobController.createJob);

router.post("/",
    autenticato,
    soloAzienda,
    jobController.createJob
);

module.exports = router;
