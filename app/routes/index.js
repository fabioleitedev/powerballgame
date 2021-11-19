const express = require("express");
const { ticketHandler } = require("../controllers/ticketController");
const { healthCheckHanlder } = require("../controllers/healthCheckController");
const { notFound } = require("../controllers/notFoundController");

const router = express.Router();

// Routes
router.get("/", healthCheckHanlder);
router.post("/api/v1/tickets", ticketHandler);
router.use(notFound);

module.exports = router;
