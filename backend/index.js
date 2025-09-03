require('dotenv').config();
console.log("IMAP_HOST:", process.env.IMAP_HOST);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // only declare once
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://email-analysis-frontend.onrender.com',
      // Add your actual frontend URL here when you get it
    ];
    
    // Allow any onrender.com domain for your frontend
    if (origin.includes('.onrender.com') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
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
