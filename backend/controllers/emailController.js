const { fetchLatestEmail } = require("../services/imapService");

exports.getLatestEmail = async (req, res) => {
  const { subject } = req.query;
  console.log("📩 Received request for subject:", subject);

  try {
    const emailData = await fetchLatestEmail(subject);
    if (!emailData) return res.status(404).json({ error: "No email found" });

    res.json(emailData);
  } catch (err) {
    console.error("❌ Backend error fetching email:", err);
    res.status(500).json({ error: "Server error fetching email" });
  }
};
