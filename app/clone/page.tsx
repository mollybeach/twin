// path: app/clone/page.tsx
"use client";
import React, { useState } from 'react';
import { useMarketplaceStore } from '../store/marketplace';
import { GitMerge, Dna, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AgentType } from '../types/types';

export default function ClonePage() {
  const { agents, addAgent } = useMarketplaceStore();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [draggedAgent, setDraggedAgent] = useState<string | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cloneResult, setCloneResult] = useState<AgentType | null>(null);
  const router = useRouter();

  const handleDragStart = (agentId: string, e: React.DragEvent) => {
    setDraggedAgent(agentId);
    const element = e.currentTarget as HTMLElement;
    element.classList.add('dragging');
    e.dataTransfer.setData('text/plain', agentId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('dragging');
    setDraggedAgent(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    element.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('drag-over');
  };

  const handleDrop = (slot: 'left' | 'right', e: React.DragEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('drag-over');
    
    const agentId = e.dataTransfer.getData('text/plain');
    
    if (selectedAgents.includes(agentId)) {
      // If agent is already in another slot, remove it first
      setSelectedAgents(prev => prev.filter(id => id !== agentId));
    }

    setSelectedAgents(prev => {
      const newSelected = [...prev];
      if (slot === 'left') {
        newSelected[0] = agentId;
      } else {
        newSelected[1] = agentId;
      }
      return newSelected;
    });
  };

  const handleClone = async () => {
    if (selectedAgents.length !== 2) return;

    setIsCloning(true);
    const agent1 = agents.find((a: AgentType) => a.agentId === selectedAgents[0]);
    const agent2 = agents.find((a: AgentType) => a.agentId === selectedAgents[1]);

    if (!agent1 || !agent2) return;

    // Simulate DNA fusion process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate base price as average of both agents' share prices
    const basePrice = (agent1.tokenShares.pricePerShare + agent2.tokenShares.pricePerShare) / 2;
    const totalPrice = basePrice * 1000; // Example calculation

    const newTwin: AgentType = {
      agentId: `${agent1.agentId}_${agent2.agentId}`,
      createdAt: new Date(),
      twitterHandle: `${agent1.twitterHandle}_${agent2.twitterHandle}`,
      twinHandle: `${agent1.twinHandle}_${agent2.twinHandle}`,
      personality: `${agent1.personality} + ${agent2.personality}`,
      description: `A fusion of @${agent1.twitterHandle} and @${agent2.twitterHandle}. Combining the best of both twins!`,
      profileImage: agent1.profileImage,
      price: totalPrice,
      stats: { 
        agentId: `${agent1.agentId}_${agent2.agentId}`,
        replies: 0, 
        interactions: 0, 
        uptime: '0h 0m' 
      },
      tokenShares: {
        agentId: `${agent1.agentId}_${agent2.agentId}`,
        totalShares: 1000,
        availableShares: 1000,
        pricePerShare: totalPrice / 1000,
        shareholders: []
      },
      verification: {
        agentId: `${agent1.agentId}_${agent2.agentId}`,
        isVerified: false,
        verificationDate: new Date()
      },
      analytics: {
        agentId: `${agent1.agentId}_${agent2.agentId}`,
        impressions: 0,
        engagementRate: 0,
        clickThroughRate: 0,
        dailyImpressions: [],
        topInteractions: [],
        reachByPlatform: [],
        demographics: [],
        peakHours: [],
        cryptoHoldings: []
      },
      modelData: {},
      fetchedTweets: [],
      twineets: [],
      autoReply: false,
      isListed: true,
      tokenStats: {
        agentId: `${agent1.agentId}_${agent2.agentId}`,
        price: totalPrice,
        change24h: 0,
        volume24h: 0,
        marketCap: 0
      },
      transactions: []
    };

    setCloneResult(newTwin);
    setIsCloning(false);
  };

  const handleCreateClone = async () => {
    if (!cloneResult) return;
    
    try {
      setIsCloning(true);
      setError(null);
      const agent1 = agents.find(a => a.agentId === selectedAgents[0]);
      const agent2 = agents.find(a => a.agentId === selectedAgents[1]);

      if (!agent1 || !agent2) {
        setError('Selected agents not found.');
        setIsCloning(false);
        return;
      }

      // Create the new clone
      const newAgentId = await addAgent({
        agentId: `${agent1.agentId}_${agent2.agentId}`,  
        createdAt: new Date(),
        stats: {
          agentId: `${agent1.agentId}_${agent2.agentId}`,
          replies: 0,
          interactions: 0,
          uptime: '0h 0m'
        },
        twinHandle: cloneResult.twinHandle,
        twitterHandle: cloneResult.twitterHandle,
        personality: cloneResult.personality,
        description: cloneResult.description,
        profileImage: cloneResult.profileImage,
        price: cloneResult.price,
        verification: {
          agentId: `${agent1.agentId}_${agent2.agentId}`,
          isVerified: false,
          verificationDate: new Date()
        },
        analytics: {
          agentId: `${agent1.agentId}_${agent2.agentId}`,
          impressions: 0,
          engagementRate: 0,
          clickThroughRate: 0,
          dailyImpressions: [],
          topInteractions: [],
          reachByPlatform: [],
          demographics: [],
          peakHours: [],
          cryptoHoldings: []
        },

        tokenShares: {
          agentId: `${agent1.agentId}_${agent2.agentId}`,
          totalShares: 1000,
          availableShares: 1000,
          pricePerShare: cloneResult.price / 1000,
          shareholders: []
        },
        twineets: [],
        fetchedTweets: [],
        modelData: {},
        autoReply: false,
        isListed: true,
        tokenStats: {
          agentId: `${agent1.agentId}_${agent2.agentId}`,
          price: cloneResult.price,
          change24h: 0,
          volume24h: 0,
          marketCap: 0
        },
        transactions: []
      });
      
      // Reset state
      setSelectedAgents([]);
      setCloneResult(null);
      
      // Navigate to the new clone's analytics page
      router.push(`/analytics/${newAgentId}`);
    } catch (error) {
      console.error('Failed to create clone:', error);
      setError('Failed to create clone. Please try again.');
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <GitMerge className="w-8 h-8 text-purple-400 mr-3" />
            <span className="rainbow-text">Clone Laboratory</span>
          </h1>
          <p className="text-purple-200">Drag two AI Twins into the Yinyang to create a powerful new hybrid!</p>
        </div>

        {agents.length < 2 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Not Enough Twins</h2>
            <p className="text-purple-200 mb-6">You need at least two Twins to perform fusion.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Dna className="w-6 h-6 text-purple-400 mr-2" />
                Available Twins
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {agents.map((agent) => (
                  <div
                    key={agent.agentId}
                    draggable
                    onDragStart={(e) => handleDragStart(agent.agentId, e)}
                    onDragEnd={handleDragEnd}
                    className={`agent-card bg-white/5 backdrop-blur-lg rounded-lg p-4 transition-all ${
                      selectedAgents.includes(agent.agentId)
                        ? 'ring-2 ring-purple-400 bg-white/10'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={agent.profileImage}
                        alt={agent.twinHandle}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">@{agent.twinHandle}</div>
                        <div className="text-purple-300 text-sm">{agent.personality}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fusion-zone">
              <div className="yinyang">
                <div className="dot-white"></div>
                <div className="dot-black"></div>
              </div>
              
              <div
                className={`fusion-slot left ${selectedAgents[0] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop('left', e)}
              >
                {selectedAgents[0] && (
                  <img
                    src={agents.find(a => a.agentId === selectedAgents[0])?.profileImage}
                    alt="Left Twin"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              
              <div
                className={`fusion-slot right ${selectedAgents[1] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop('right', e)}
              >
                {selectedAgents[1] && (
                  <img
                    src={agents.find(a => a.agentId === selectedAgents[1])?.profileImage}
                    alt="Right Twin"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            {draggedAgent && (
              <div className="dragged-agent-info">
                <p>Currently dragging: {agents.find(a => a.agentId === draggedAgent)?.twinHandle}</p>
              </div>
            )}

            {selectedAgents.length === 2 && !cloneResult && (
              <div className="flex justify-center">
                <button
                  onClick={handleClone}
                  disabled={isCloning}
                  className="px-6 py-3 bg-purple-500/50 text-white rounded-full font-semibold hover:bg-purple-500/70 transition-colors flex items-center space-x-2 fusion-ready"
                >
                  {isCloning ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span>Fusing DNA...</span>
                    </>
                  ) : (
                    <>
                      <GitMerge className="w-5 h-5" />
                      <span>Fuse Selected Twins</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {cloneResult && (
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
                  Fusion Result
                </h2>
                <div className="flex items-center space-x-6">
                  <img
                    src={cloneResult.profileImage}
                    alt={cloneResult.twinHandle}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-medium text-lg">@{cloneResult.twinHandle}</div>
                    <div className="text-purple-300">{cloneResult.personality}</div>
                    <p className="text-purple-200 mt-2">{cloneResult.description}</p>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleCreateClone}
                    disabled={isCloning}
                    className="px-6 py-3 bg-purple-500/50 text-white rounded-full font-semibold hover:bg-purple-500/70 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCloning ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>Creating Clone...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Clone Twin</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}