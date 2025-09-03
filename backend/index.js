require('dotenv').config();
console.log("IMAP_HOST:", process.env.IMAP_HOST);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // only declare once
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-frontend-url.onrender.com']
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Email Analysis System Backend is running' });
});

// API routes
app.use("/api", emailRoutes);

// MongoDB connection (optional for free deployment)
if (process.env.MONGO_URI || process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.log("No MongoDB URI provided - running without database (using mock data)");
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
