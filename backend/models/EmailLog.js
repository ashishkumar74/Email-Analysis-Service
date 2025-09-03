const mongoose = require("mongoose");

const EmailLogSchema = new mongoose.Schema({
  to: String,
  subject: String,
  esp: String,
  chain: [String],
  chainTimestamps: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmailLog", EmailLogSchema);
