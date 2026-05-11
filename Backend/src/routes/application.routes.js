// ============================================================
// routes/application.routes.js
// ============================================================

const router = require("express").Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const controller = require("../controller/application.controller");
const { autenticato, soloAzienda } = require("../middleware/auth");

const router = require("express").Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const controller = require("../controllers/applicationController");
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

router.post(
  "/apply",
  autenticato,
  soloCandidato,
  regolaApplicazione,
  validate,
  controller.apply,
);

router.get(
  "/my-applications",
  autenticato,
  soloCandidato,
  controller.getMyApplications,
);

router.patch(
  "/:id/status",
  autenticato,
  soloAzienda,
  regolaId,
  regolaStatus,
  validate,
  controller.updateStatus,
);

router.get(
  "/job/:jobId",
  autenticato,
  soloAzienda,
  validate,
  controller.getApplicationsByJob,
);

// Tutte le routes

module.exports = router;
