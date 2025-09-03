function detectESP(senderEmail) {
  if (!senderEmail) return 'Unknown';
  if (senderEmail.includes('gmail.com')) return 'Gmail';
  if (senderEmail.includes('outlook.com') || senderEmail.includes('hotmail.com')) return 'Outlook';
  if (senderEmail.includes('zoho.com')) return 'Zoho';
  if (senderEmail.includes('amazon.com')) return 'SES';
  return 'Other';
}

module.exports = detectESP;
