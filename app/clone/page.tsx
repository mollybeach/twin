// path: app/clone/page.tsx
"use client";
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { GitMerge, Dna, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TwinType } from '../types/types';
import Image from 'next/image';

export default function ClonePage() {
  const { stateAllTwins, getCreateTwin } = useStore(); 
  const { stateCurrentUserData } = useStore();
  const [selectedTwins, setSelectedTwins] = useState<string[]>([]);
  const [draggedTwin, setDraggedTwin] = useState<string | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cloneResult, setCloneResult] = useState<TwinType | null>(null);
  const router = useRouter();

  const handleDragStart = (twinId: string, e: React.DragEvent) => {
    setDraggedTwin(twinId);
    const element = e.currentTarget as HTMLElement;
    element.classList.add('dragging');
    e.dataTransfer.setData('text/plain', twinId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('dragging');
    setDraggedTwin(null);
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
    
    const twinId = e.dataTransfer.getData('text/plain');
    
    if (selectedTwins.includes(twinId)) {
      // If twin is already in another slot, remove it first
      setSelectedTwins(prev => prev.filter(id => id !== twinId));
    }

    setSelectedTwins(prev => {
      const newSelected = [...prev];
      if (slot === 'left') {
        newSelected[0] = twinId;
      } else {
        newSelected[1] = twinId;
      }
      return newSelected;
    });
  };

  const handleClone = async () => {
    if (selectedTwins.length !== 2) return;

    setIsCloning(true);
    const twin1 = stateAllTwins.find((a: TwinType) => a.twinId === selectedTwins[0]);
    const twin2 = stateAllTwins.find((a: TwinType) => a.twinId === selectedTwins[1]);

    if (!twin1 || !twin2) return;

    // Simulate DNA fusion process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate base price as average of both twins' share prices
    const basePrice = (twin1.tokenShares.pricePerShare + twin2.tokenShares.pricePerShare) / 2;
    const totalPrice = basePrice * 1000; // Example calculation

    const newTwin: TwinType = {
      userId: stateCurrentUserData?.userId || '',
      twinId: `${twin1.twinId}_${twin2.twinId}`,
      timestamp: new Date(),
      twitterHandle: `${twin1.twitterHandle}_${twin2.twitterHandle}`,
      twinHandle: `${twin1.twinHandle}_${twin2.twinHandle}`,
      personality: `${twin1.personality} + ${twin2.personality}`,
      description: `A fusion of @${twin1.twitterHandle} and @${twin2.twitterHandle}. Combining the best of both twins!`,
      profileImage: twin1.profileImage,
      price: totalPrice,
      stats: { 
        twinId: `${twin1.twinId}_${twin2.twinId}`,
        repliesCount: 0, 
        interactions: 0, 
        uptime: '0h 0m' 
      },
      tokenShares: {
        twinId: `${twin1.twinId}_${twin2.twinId}`,
        totalShares: 1000,
        availableShares: 1000,
        pricePerShare: totalPrice / 1000,
        shareholders: []
      },
      verification: {
        twinId: `${twin1.twinId}_${twin2.twinId}`,
        isVerified: false,
        verificationDate: new Date()
      },
      analytics: {
        twinId: `${twin1.twinId}_${twin2.twinId}`,
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
        twinId: `${twin1.twinId}_${twin2.twinId}`,
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
      await getCreateTwin(cloneResult);
      router.push('/marketplace'); // Redirect to the marketplace after creating the clone
    } catch (error) {
      setError('Failed to create clone. Please try again.');
      console.error('Error creating clone:', error);
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

        {stateAllTwins.length < 2 ? (
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
                {stateAllTwins.map((twin) => (
                  <div
                    key={twin.twinId}
                    draggable
                    onDragStart={(e) => handleDragStart(twin.twinId, e)}
                    onDragEnd={handleDragEnd}
                    className={`twin-card bg-white/5 backdrop-blur-lg rounded-lg p-4 transition-all ${
                      selectedTwins.includes(twin.twinId)
                        ? 'ring-2 ring-purple-400 bg-white/10'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                        <Image
                        src={twin.profileImage}
                        alt={twin.twinHandle}
                        width={12}
                        height={12}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">@{twin.twinHandle}</div>
                        <div className="text-purple-300 text-sm">{twin.personality}</div>
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
                className={`fusion-slot left ${selectedTwins[0] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop('left', e)}
              >
                {selectedTwins[0] && (
                  <Image
                    src={stateAllTwins.find(a => a.twinId === selectedTwins[0])?.profileImage || ''}
                    alt="Left Twin"
                    className="w-full h-full rounded-full object-cover"
                    width={12}
                    height={12}
                  />
                )}
              </div>
              
              <div
                className={`fusion-slot right ${selectedTwins[1] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop('right', e)}
              >
                {selectedTwins[1] && (
                  <Image
                    src={stateAllTwins.find(a => a.twinId === selectedTwins[1])?.profileImage || ''}
                    alt="Right Twin"
                    className="w-full h-full rounded-full object-cover"
                    width={12}
                    height={12}
                  />
                )}
              </div>
            </div>

            {draggedTwin && (
              <div className="dragged-twin-info">
                <p>Currently dragging: {stateAllTwins.find(a => a.twinId === draggedTwin)?.twinHandle}</p>
              </div>
            )}

            {selectedTwins.length === 2 && !cloneResult && (
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
                  <Image
                    src={cloneResult.profileImage}
                    alt={cloneResult.twinHandle}
                    className="w-24 h-24 rounded-full object-cover"
                    width={24}
                    height={24}
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