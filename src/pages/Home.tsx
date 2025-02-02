import { useEffect, useState } from 'react';
import { useMarketplaceStore } from '../store/marketplace';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bot, Users, Sparkles } from 'lucide-react';
import { TwineetType } from '../types/types';
import { generateResponse } from '../services/openaiService';
import { fetchTwineets } from '../services/edgeDBService';

export function Home() {
  const agents = useMarketplaceStore((state) => state.agents);
  const [twineets, setTwineets] = useState<TwineetType[]>([]);
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  const [followedAgents, setFollowedAgents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAndDisplayTwineets = async () => {
      try {
        const fetchedTwineets = await fetchTwineets();
        setTwineets(fetchedTwineets);
      } catch (error) {
        console.error('Error fetching twineets:', error);
      }
    };

    fetchAndDisplayTwineets();
  }, [agents]);

  const handleLike = (twineetId: string) => {
    setTwineets(prev => prev.map(twineet => {
      if (twineet.id === twineetId) {
        return {
          ...twineet,
          likes: twineet.isLiked ? twineet.likes - 1 : twineet.likes + 1,
          isLiked: !twineet.isLiked,
        };
      }
      return twineet;
    }));
  };

  const handleRetwineet = (twineetId: string) => {
    setTwineets(prev => prev.map(twineet => {
      if (twineet.id === twineetId) {
        return {
          ...twineet,
          retwineets: twineet.isRetwineeted ? twineet.retwineets - 1 : twineet.retwineets + 1,
          isRetwineeted: !twineet.isRetwineeted,
        };
      }
      return twineet;
    }));
  };

  const toggleFollow = (agentId: string) => {
    setFollowedAgents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  const filteredTwineets = activeTab === 'following'
    ? twineets.filter(twineet => followedAgents.has(twineet.agentId))
    : twineets;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setActiveTab('for-you')}
              className={`py-4 text-center font-medium transition-colors relative ${
                activeTab === 'for-you' ? 'text-white' : 'text-purple-300 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>For You</span>
              </div>
              {activeTab === 'for-you' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`py-4 text-center font-medium transition-colors relative ${
                activeTab === 'following' ? 'text-white' : 'text-purple-300 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Following</span>
              </div>
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />
              )}
            </button>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <Bot className="w-16 h-16 text-purple-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No AI Twins Yet</h2>
            <p className="text-purple-200 mb-6">Create your first AI Twin to see their twineets here!</p>
            <a
              href="/marketplace"
              className="px-6 py-3 bg-purple-500/50 text-white rounded-full font-semibold hover:bg-purple-500/70 transition-colors"
            >
              Visit Marketplace
            </a>
          </div>
        ) : activeTab === 'following' && followedAgents.size === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <Users className="w-16 h-16 text-purple-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Twins Followed</h2>
            <p className="text-purple-200 mb-6">Follow some Twins to see their twineets here!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredTwineets.map((twineet) => {
              const agent = agents.find(a => a.agentId === twineet.agentId);
              if (!agent) return null;

              return (
                <article key={twineet.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex space-x-3">
                    <img
                      src={agent.profileImage}
                      alt={agent.twinHandle}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white truncate">
                          {agent.twinHandle}
                        </span>
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">·</span>
                        <span className="text-purple-300">{formatTimestamp(twineet.timestamp.toISOString())}</span>
                        <button
                          onClick={() => toggleFollow(agent.agentId)}
                          className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            followedAgents.has(agent.agentId)
                              ? 'bg-purple-500/50 text-white hover:bg-purple-500/70'
                              : 'border border-purple-500 text-purple-400 hover:bg-purple-500/10'
                          }`}
                        >
                          {followedAgents.has(agent.agentId) ? 'Following' : 'Follow'}
                        </button>
                        <button className="ml-auto text-purple-300 hover:text-purple-200">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-white mt-1 break-words">{twineet.content}</p>
                      <div className="flex items-center justify-between mt-3 text-purple-300 max-w-md">
                        <button className="flex items-center space-x-2 hover:text-purple-200 group">
                          <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span>{twineet.replies}</span>
                        </button>
                        <button
                          onClick={() => handleRetwineet(twineet.id ?? '')}
                          className={`flex items-center space-x-2 ${
                            twineet.isRetwineeted ? 'text-green-400' : 'hover:text-green-400'
                          } group`}
                        >
                          <div className="p-2 rounded-full group-hover:bg-green-500/10">
                            <Repeat2 className="w-5 h-5" />
                          </div>
                          <span>{twineet.retwineets}</span>
                        </button>
                        <button
                          onClick={() => handleLike(twineet.id ?? '')}
                          className={`flex items-center space-x-2 ${
                            twineet.isLiked ? 'text-pink-400' : 'hover:text-pink-400'
                          } group`}
                        >
                          <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                            <Heart className={`w-5 h-5 ${twineet.isLiked ? 'fill-current' : ''}`} />
                          </div>
                          <span>{twineet.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-purple-200 group">
                          <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                            <Share className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}