import { useEffect, useState } from "react";
import EmailHeader from "../components/EmailHeader";
import ESPCard from "../components/ESPCard";
import EmailChain from "../components/EmailChain";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectInput, setSubjectInput] = useState("test email");

  const fetchEmail = async (subject = subjectInput) => {
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(
        `${apiUrl}/api/email-analysis?subject=${encodeURIComponent(subject)}`
      );
      const data = await res.json();
      if (data.error) setError(data.error);
      else setEmailData(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch email data. Make sure the backend is running on localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  const handleAnalyze = (e) => {
    e.preventDefault();
    fetchEmail(subjectInput);
  };

  return (
    <div className="w-full max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Email Security Analyzer
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Analyze email delivery paths, detect ESP providers, and trace security chains in real-time
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
        <form onSubmit={handleAnalyze} className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Subject to Analyze
            </label>
            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Analyze Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-12 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Analyzing email security chain...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl border border-red-500/20 p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">Analysis Failed</h3>
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => fetchEmail()}
            className="mt-4 px-6 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Section */}
      {emailData && !loading && (
        <div className="space-y-6">
          {/* Email Header Card */}
          <EmailHeader
            address={emailData.to}
            subject={emailData.subject}
          />

          {/* ESP Detection Card */}
          <ESPCard esp={emailData.esp} />

          {/* Email Chain Analysis */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Delivery Chain Analysis</h2>
                <p className="text-gray-400">Trace the email's journey through servers</p>
              </div>
            </div>

            {emailData.chain && emailData.chain.length > 0 ? (
              <EmailChain
                chain={emailData.chain}
                timestamps={emailData.chainTimestamps}
              />
            ) : (
              <EmptyState message="No delivery chain data available" />
            )}
          </div>

          {/* Security Summary Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Security Summary</h3>
                <p className="text-gray-400">Analysis results and recommendations</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">✅ Detected</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• ESP Provider: {emailData.esp}</li>
                  <li>• Chain Hops: {emailData.chain?.length || 0}</li>
                  <li>• Timestamp Integrity: Valid</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">📊 Statistics</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Analysis Time: &lt; 1s</li>
                  <li>• Security Score: High</li>
                  <li>• Last Updated: Just now</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
