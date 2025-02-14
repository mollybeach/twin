import { useState, useCallback, useRef, useEffect } from 'react';
import { TwinType, TwineetType, FetchedTweetType } from '../types/types';

export const useTwineets = (twins: TwinType[]) => {
    const [twineets, setTwineets] = useState<TwineetType[]>([]);
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    const fetchAndDisplayTwineets = useCallback(async () => {
        try {
            const response = await fetch('/api/twineets');
            if (!response.ok) throw new Error('Failed to fetch twineets');
            const result = await response.json();
            setTwineets(result.reverse());
        } catch (error) {
            console.error('Error fetching twineets:', error);
        }
    }, []);

    const createNewTwineets = useCallback(async () => {
        if (twins.length === 0) {
            console.log("No twins available for polling.");
            return;
        }

        const newTwineets: TwineetType[] = [];

        const fetchPromises = twins.map(async (twin) => {
            try {
                const newTweetsResponse = await fetch(`/api/tweets?username=${encodeURIComponent(twin.twitterHandle)}&twinId=${twin.twinId}`);
                if (!newTweetsResponse.ok) throw new Error('Failed to fetch tweets');

                const updatedTweets = await newTweetsResponse.json();

                updatedTweets.forEach(async (tweet: FetchedTweetType) => {
                    const newFetchedTweet = {
                        twinId: twin.twinId,
                        text: tweet.text,
                        tweetId: tweet.tweetId,
                        timestamp: new Date().toISOString(),
                    };

                    await fetch('/api/tweets', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newFetchedTweet),
                    });
                });

                const prompt = `Based on the following tweets: ${updatedTweets.map((t: FetchedTweetType) => t.text).join(', ')}, generate a twineet for a ${twin.personality} AI twin.`;

                const generateResponse = await fetch(`/api/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt }),
                });

                const modelData = await generateResponse.json();
                const generatedText = modelData.choices[0]?.message?.content || modelData.choices[0]?.text;

                const newTwineet = {
                    id: crypto.randomUUID(),
                    userId: twin.userId,
                    twinId: twin.twinId,
                    content: generatedText,
                    timestamp: new Date(),
                    likesCount: Math.floor(Math.random() * 100),
                    retwineetsCount: Math.floor(Math.random() * 100),
                    repliesCount: Math.floor(Math.random() * 100),
                    isLiked: false,
                    isRetwineeted: false,
                };

                const postResponse = await fetch('/api/twineets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTwineet),
                });

                if (!postResponse.ok) {
                    throw new Error('Failed to post new twineet');
                }

                newTwineets.push(newTwineet);
            } catch (error) {
                console.error('Error generating twineet:', error);
            }
        });

        await Promise.all(fetchPromises);

        if (newTwineets.length > 0) {
            setTwineets((prev) => [...prev, ...newTwineets]);
        }
    }, [twins]);

    const handleLike = async (twineetId: string) => {
        try {
            const response = await fetch(`/api/twineets/${twineetId}/isliked`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(twineetId),
            });
            if (!response.ok) {
                throw new Error('Failed to toggle like status');
            }
            setTwineets(prev => prev.map(twineet => {
                if (twineet.id === twineetId) {
                    return {
                        ...twineet,
                        likesCount: twineet.isLiked ? twineet.likesCount - 1 : twineet.likesCount + 1,
                        isLiked: !twineet.isLiked,
                    };
                }
                return twineet;
            }));
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    const handleRetwineet = async (twineetId: string) => {
        try {
            const response = await fetch(`/api/twineets/${twineetId}/isretwineeted`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ twineetId }),
            });

            if (!response.ok) {
                throw new Error('Failed to toggle retweet status');
            }
            setTwineets(prev => prev.map(twineet => {
                if (twineet.id === twineetId) {
                    return {
                        ...twineet,
                        isRetwineeted: !twineet.isRetwineeted,
                        retwineetsCount: twineet.isRetwineeted ? twineet.retwineetsCount - 1 : twineet.retwineetsCount + 1,
                    };
                }
                return twineet;
            }));
        } catch (error) {
            console.error('Error toggling retweet status:', error);
        }
    };

    useEffect(() => {
        fetchAndDisplayTwineets();
        
        if (!pollingRef.current) {
            pollingRef.current = setInterval(() => {
                fetchAndDisplayTwineets();
                createNewTwineets();
            }, 30000);
        }

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
        };
    }, [fetchAndDisplayTwineets, createNewTwineets]);

    return {
        twineets,
        handleLike,
        handleRetwineet,
    };
}; 