// path: app/page.tsx
"use client";
import { useState } from 'react';
import { useStore } from './store/store';
import { Sparkles, Users } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner';
import { TwineetList } from './components/twineet/TwineetList';
import { useTwins } from './hooks/useTwins';
import { useTwineets } from './hooks/useTwineets';

export default function Home() {
    const { stateCurrentUserId } = useStore();
    const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
    
    const {
        twins,
        loading,
        followedTwins,
        toggleFollow,
    } = useTwins();

    const {
        twineets,
        handleLike,
        handleRetwineet,
    } = useTwineets(twins);

    if (loading) {
        return <LoadingSpinner />;
    }

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

                <TwineetList
                    twineets={twineets}
                    twins={twins}
                    followedTwins={followedTwins}
                    onLike={handleLike}
                    onRetwineet={handleRetwineet}
                    onFollow={(twinId) => toggleFollow(twinId, stateCurrentUserId)}
                    activeTab={activeTab}
                />
            </div>
        </div>
    );
}