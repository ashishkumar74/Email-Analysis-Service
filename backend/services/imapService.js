const Imap = require("imap-simple");
const { simpleParser } = require("mailparser");

const imapConfig = {
  imap: {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: parseInt(process.env.IMAP_PORT) || 993,
    tls: true,
    authTimeout: 3000,
    connTimeout: 5000,
    tlsOptions: { 
      rejectUnauthorized: false
    }
  }
};

function detectESP(headers) {
  const received = headers.get("received") || "";
  const from = headers.get("from") || "";
  if (/gmail\.com/.test(received) || /gmail\.com/.test(from)) return "Gmail";
  if (/outlook\.com|hotmail\.com|live\.com/.test(received)) return "Outlook";
  if (/zoho\.com/.test(received)) return "Zoho Mail";
  if (/amazonses\.com/.test(received)) return "Amazon SES";
  if (/yahoo\.com/.test(received)) return "Yahoo Mail";
  return "Unknown ESP";
}

function extractChain(headers) {
  const receivedHeaders = headers.get("received");
  if (!receivedHeaders) return [];
  const lines = Array.isArray(receivedHeaders) ? receivedHeaders : [receivedHeaders];
  return lines.map(line => (line.match(/from\s+([^\s]+)/i) || [])[1] || line);
}

function extractTimestamps(headers) {
  const receivedHeaders = headers.get("received");
  if (!receivedHeaders) return [];
  const lines = Array.isArray(receivedHeaders) ? receivedHeaders : [receivedHeaders];
  return lines.map(line => (line.match(/;\s*(.+)$/) || [])[1] || "Unknown time");
}

exports.fetchLatestEmail = async (subject) => {
  console.log("📥 Fetching email with subject:", subject);
  
  // For now, return mock data since IMAP has connection issues
  // This allows the application to work while we debug the Gmail connection
  console.log("📋 Using mock data for demo purposes");
  
  return {
    to: "demo@example.com",
    subject: subject || "Email Security Analysis Demo",
    esp: "Gmail",
    chain: [
      "mail-sor-f41.google.com [74.125.24.41]",
      "mail-ej1-f52.google.com [142.250.9.52]", 
      "smtp-relay.gmail.com [74.125.24.28]"
    ],
    chainTimestamps: [
      "Tue, 3 Sep 2025 14:30:15 +0000 (GMT)",
      "Tue, 3 Sep 2025 14:30:14 +0000 (GMT)",
      "Tue, 3 Sep 2025 14:30:13 +0000 (GMT)"
    ]
  };
};
