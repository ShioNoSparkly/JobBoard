

// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// TEST: Creazione annuncio senza middleware
// Usiamo un ID esistente nel tuo DB (es. 1)
router.post('/test-create', (req, res, next) => {
    req.user = { id: 1, role: 'azienda' }; // MOCK: simuliamo il middleware
    next();
}, jobController.createJob);

module.exports = router;
