


const express = require('express');
const router = express.Router();

const { body, param, query } = require("express-validator");
const validate = require("../middleware/validate");
const jobController = require('../controllers/jobController');

const {
    autenticato,
    soloAzienda,
    soloCandidato,
} = require("../middleware/auth");


// Ivalidatore dei campi da middlware
//const { regoleJob } = require("../middleware/jobValidator");

const regolaId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("L'id deve essere un numero intero positivo"),
];

console.log("Ciao dal router job")

// TEST: Creazione annuncio senza middleware
// uso un ID esistente nel DB (es. 1)
// router.post('/test-create', (req, res, next) => {

//    console.log("Dentro la rotta test-create")

//    req.user = { id: 1, role: 'azienda' }; // MOCK: simuliamo il middleware
//    next();
// }, jobController.createJob);

router.get("/",
    autenticato,
    jobController.getAllJobs
);

router.post("/",
    autenticato,
    soloAzienda,
    //  regoleJob,
    validate,
    jobController.createJob
);

module.exports = router;
