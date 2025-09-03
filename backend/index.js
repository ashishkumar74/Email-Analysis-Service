require('dotenv').config();
console.log("IMAP_HOST:", process.env.IMAP_HOST);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // only declare once
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api", emailRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
