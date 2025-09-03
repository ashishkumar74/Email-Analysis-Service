const express = require("express");
const router = express.Router();
const { getLatestEmail } = require("../controllers/emailController");

// Route: GET /api/email-analysis?subject=SUBJECT
router.get("/email-analysis", getLatestEmail);

module.exports = router;
