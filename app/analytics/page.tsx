import React from 'react';
import { useParams } from 'react-router-dom';
import { useMarketplaceStore } from '../store/marketplace';
import { Analytics as AnalyticsComponent } from '../components/Analytics';
import { Bot } from 'lucide-react';

export function AnalyticsPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, updateAnalytics } = useMarketplaceStore();
  const agent = agents.find(a => a.agentId === agentId);

  React.useEffect(() => {
    if (agentId) {
      // Initial update
      updateAnalytics(agentId);
      
      const interval = setInterval(() => {
        updateAnalytics(agentId);
      }, 60000); // Update every minute for demo purposes
      
      return () => clearInterval(interval);
    }
  }, [agentId, updateAnalytics]);

  if (!agent || !agentId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Twin Not Found</h2>
          <p className="text-purple-300">The Twin you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={agent.profileImage}
              alt={agent.twinHandle}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">@{agent.twinHandle}</h1>
              <p className="text-purple-300">{agent.personality} Twin</p>
            </div>
          </div>
        </div>

        <AnalyticsComponent analytics={agent.analytics} agentId={agentId} />
      </div>
    </div>
  );
}