
// validatore per campi per job e formato per id

const { body, param } = require('express-validator');

const regoleJob = [
    body('title').trim().notEmpty().withMessage('Il titolo è richiesto'),
    body('description').trim().notEmpty().withMessage('La descrizione è richiesta'),
    body('contract_type').trim().notEmpty().withMessage('Il tipo di contratto è richiesto'),
    body('city').trim().notEmpty().withMessage('La città è obbligatoria'),
    body('salary')
        .isNumeric()
        .withMessage('Lo stipendio deve essere un valore numerico (RAL)')
];

const regolaId = [
    param("id").isInt({ min: 1 }).withMessage("L'id deve essere un numero intero positivo")
];

module.exports = { regoleJob, regolaId };

