import { useState, useCallback } from 'react';
import { TwinType } from '../types/types';

export const useTwins = () => {
    const [twins, setTwins] = useState<TwinType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [followedTwins, setFollowedTwins] = useState<Set<string>>(new Set());

    const fetchTwins = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/twins');
            if (!response.ok) throw new Error('Failed to fetch twins');
            const twinsResult = await response.json();
            setTwins(twinsResult);
        } catch (error) {
            console.error('Error fetching twins:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleFollow = async (twinId: string, userId: string) => {
        try {
            const isFollowing = followedTwins.has(twinId);
            const endpoint = isFollowing ? `/api/twins/${twinId}/unfollow` : `/api/twins/${twinId}/follow`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to toggle follow status');
            }

            setFollowedTwins(prev => {
                const newSet = new Set(prev);
                if (isFollowing) {
                    newSet.delete(twinId);
                } else {
                    newSet.add(twinId);
                }
                return newSet;
            });
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };

    return {
        twins,
        loading,
        followedTwins,
        fetchTwins,
        toggleFollow,
    };
}; 