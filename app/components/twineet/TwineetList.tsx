import { TwinType, TwineetType } from '../../types/types';
import { TwineetCard } from './TwineetCard';
import { Bot, Users } from 'lucide-react';

interface TwineetListProps {
    twineets: TwineetType[];
    twins: TwinType[];
    followedTwins: Set<string>;
    onLike: (twineetId: string) => void;
    onRetwineet: (twineetId: string) => void;
    onFollow: (twinId: string) => void;
    activeTab: 'for-you' | 'following';
}

export const TwineetList = ({
    twineets,
    twins,
    followedTwins,
    onLike,
    onRetwineet,
    onFollow,
    activeTab,
}: TwineetListProps) => {
    const filteredTwineets = activeTab === 'following'
        ? twineets.filter(twineet => followedTwins.has(twineet.twinId))
        : twineets;

    if (twins.length === 0) {
        return (
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
        );
    }

    if (activeTab === 'following' && followedTwins.size === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <Users className="w-16 h-16 text-purple-400 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">No Twins Followed</h2>
                <p className="text-purple-200 mb-6">Follow some Twins to see their twineets here!</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-white/10">
            {filteredTwineets.map((twineet) => {
                const twin = twins.find(t => t.twinId === twineet.twinId);
                if (!twin) return null;

                return (
                    <TwineetCard
                        key={twineet.id}
                        twineet={twineet}
                        twin={twin}
                        onLike={onLike}
                        onRetwineet={onRetwineet}
                        onFollow={onFollow}
                        isFollowing={followedTwins.has(twin.twinId)}
                    />
                );
            })}
        </div>
    );
}; 