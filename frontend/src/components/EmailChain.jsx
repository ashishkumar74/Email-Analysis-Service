import { useState } from "react";
import TimelineItem from "./TimelineItem";
import EmptyState from "./EmptyState";

export default function EmailChain({ chain, timestamps }) {
  const [collapsed, setCollapsed] = useState(true);
  
  if (!chain || chain.length === 0) {
    return <EmptyState message="No delivery chain detected yet." />;
  }

  const displayChain = collapsed ? chain.slice(0, 3) : chain;
  const displayTimestamps = timestamps ? (collapsed ? timestamps.slice(0, 3) : timestamps) : [];

  return (
    <div className="space-y-4">
      {/* Chain Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{chain.length}</div>
          <div className="text-sm text-gray-400">Total Hops</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {timestamps && timestamps.length > 0 ? "✓" : "—"}
          </div>
          <div className="text-sm text-gray-400">Timestamps</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">High</div>
          <div className="text-sm text-gray-400">Trust Level</div>
        </div>
      </div>

      {/* Chain Visualization */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
        
        <div className="space-y-4">
          {displayChain.map((server, index) => {
            const timestamp = displayTimestamps[index] || null;
            const isFirst = index === 0;
            const isLast = index === displayChain.length - 1;
            
            return (
              <TimelineItem 
                key={index} 
                server={server} 
                timestamp={timestamp}
                isFirst={isFirst}
                isLast={isLast}
                index={index}
              />
            );
          })}
        </div>
      </div>

      {/* Expand/Collapse */}
      {chain.length > 3 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-0' : 'rotate-180'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {collapsed ? `Show all ${chain.length} hops` : "Show less"}
          </button>
        </div>
      )}
    </div>
  );
}
