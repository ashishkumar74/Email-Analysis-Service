# Email Security Analyzer

A comprehensive email security analysis system that detects Email Service Providers (ESP) and analyzes email delivery chains.

## Features

- **ESP Detection**: Automatically identifies email service providers (Gmail, Outlook, Amazon SES, etc.)
- **Delivery Chain Analysis**: Visualizes email routing through multiple servers
- **Security Assessment**: Provides security metrics and trust levels
- **Real-time Analysis**: Interactive web interface for email analysis
- **API Endpoints**: RESTful API for programmatic access

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **IMAP** integration for email analysis
- **RESTful API** architecture

### Frontend
- **React.js** with modern hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Vite** for development and building

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Configuration

Create a `.env` file in the backend directory:
```env
IMAP_HOST=your_imap_host
IMAP_PORT=993
IMAP_USER=your_email@example.com
IMAP_PASS=your_app_password
MONGO_URI=mongodb://localhost:27017/email-analysis
PORT=5000
```

## Running the Application

### Start Backend Server
```bash
cd backend
node index.js
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## API Usage

### Analyze Email
```
GET /api/email-analysis?subject=<email_subject>
```

**Response:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "esp": "Gmail",
  "chain": ["server1.com", "server2.com"],
  "chainTimestamps": ["timestamp1", "timestamp2"]
}
```

## Project Structure

```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── services/       # IMAP and analysis services
│   ├── utils/          # Utility functions
│   └── index.js        # Server entry point
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       └── App.jsx     # Main application
└── README.md
```

## Key Components

### Backend
- **EmailController**: Handles API requests
- **IMAPService**: Email fetching and analysis
- **ESPDetector**: Email service provider detection

### Frontend
- **Dashboard**: Main analysis interface
- **EmailChain**: Delivery chain visualization
- **ESPCard**: Service provider display
- **TimelineItem**: Individual chain nodes

## Security Features

- Email delivery path analysis
- ESP verification and confidence scoring
- Security indicator assessment
- Timestamp integrity validation

## Author

Email Security Analysis System - Academic Project
