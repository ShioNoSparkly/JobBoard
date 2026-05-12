// ============================================================
// controller/job.controller.js
// ============================================================

const router = require("express").Router();
const { body, param, query } = require("express-validator");
const validate = require("../middleware/validate");
const controller = require("../controllers/jobController");
const {
  autenticato,
  soloAzienda,
  soloCandidato,
} = require("../middleware/auth");

const regolaId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("L'id deve essere un numero intero positivo"),
];

router.get("/", autenticato, controller.getAllJobs);

router.post("/", autenticato, soloAzienda, validate, controller.createJobs);

module.exports = router;
