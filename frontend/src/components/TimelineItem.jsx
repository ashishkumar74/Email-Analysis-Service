import { motion } from "framer-motion";

export default function TimelineItem({ server, timestamp, isFirst, isLast, index }) {
  const getServerIcon = (serverName) => {
    if (serverName.includes('gmail')) return '🔵';
    if (serverName.includes('outlook') || serverName.includes('microsoft')) return '🟦';
    if (serverName.includes('yahoo')) return '🟣';
    if (serverName.includes('amazon')) return '🟠';
    return '⚪';
  };

  const getServerType = (serverName) => {
    if (serverName.includes('smtp')) return 'SMTP Server';
    if (serverName.includes('mail')) return 'Mail Server';
    if (serverName.includes('relay')) return 'Mail Relay';
    return 'Mail Node';
  };

  return (
    <motion.div
      className="relative flex items-start gap-4 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Timeline Node */}
      <div className="relative flex-shrink-0">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center z-10 relative
          ${isFirst ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-500/25' : 
            isLast ? 'bg-gradient-to-r from-red-400 to-red-600 shadow-lg shadow-red-500/25' : 
            'bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg shadow-blue-500/25'}
          group-hover:scale-110 transition-transform duration-200
        `}>
          <span className="text-lg">{getServerIcon(server)}</span>
        </div>
        
        {/* Status indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium">
              {getServerType(server)}
            </span>
            {isFirst && (
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                Origin
              </span>
            )}
            {isLast && (
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full font-medium">
                Destination
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">Hop #{index + 1}</span>
        </div>
        
        <h4 className="text-white font-semibold mb-1 font-mono text-sm">
          {server}
        </h4>
        
        {timestamp && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timestamp}
          </div>
        )}
        
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Secure
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Verified
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Encrypted
          </span>
        </div>
      </div>
    </motion.div>
  );
}
