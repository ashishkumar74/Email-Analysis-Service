const espColors = {
  Gmail: "from-red-400 to-red-600",
  Outlook: "from-blue-400 to-blue-600",
  "Amazon SES": "from-yellow-400 to-orange-500",
  "Zoho Mail": "from-green-400 to-green-600",
  "Yahoo Mail": "from-purple-400 to-purple-600",
  "Unknown ESP": "from-gray-400 to-gray-600"
};

const espIcons = {
  Gmail: "M",
  Outlook: "O",
  "Amazon SES": "S",
  "Zoho Mail": "Z",
  "Yahoo Mail": "Y",
  "Unknown ESP": "?"
};

const espDescriptions = {
  Gmail: "Google's email service with robust security features",
  Outlook: "Microsoft's enterprise email solution",
  "Amazon SES": "Amazon's Simple Email Service for bulk emails",
  "Zoho Mail": "Business email service with advanced features",
  "Yahoo Mail": "Popular consumer email service",
  "Unknown ESP": "Email service provider could not be identified"
};

export default function ESPCard({ esp }) {
  const gradientClass = espColors[esp] || espColors["Unknown ESP"];
  const icon = espIcons[esp] || espIcons["Unknown ESP"];
  const description = espDescriptions[esp] || espDescriptions["Unknown ESP"];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Email Service Provider</h2>
          <p className="text-gray-400">Detected mail server infrastructure</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/5 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-2xl font-bold text-white">{icon}</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">{esp}</h3>
            <p className="text-gray-400 text-sm max-w-md">{description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Verified</span>
          </div>
          <div className="text-xs text-gray-500">
            Detection confidence: 95%
          </div>
        </div>
      </div>
    </div>
  );
}
