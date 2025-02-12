// path: app/components/Timeline.tsx
"use client";
import { useEffect, useState, useCallback } from 'react';
import { useStore } from '../store/store';
import { TwineetType, TwinType } from '../types/types';
import Twineet from './Twineet'; 
import LoadingSpinner from './LoadingSpinner';


export default function Timeline() {
  const { stateCurrentUserId } = useStore();
  const [twineets, setTwineets] = useState<TwineetType[]>([]);
  //const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
 // const [followedTwins, setFollowedTwins] = useState<Set<string>>(new Set());
  const [twins, setTwins] = useState<TwinType[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchTwins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/twins', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const twinsResult = await response.json();
      setTwins(twinsResult);

      // Fetch tweets for each twin
      for (const twin of twinsResult) {
        const newTweetsResponse = await fetch(`/api/tweets?username=${encodeURIComponent(twin.twitterHandle)}&twinId=${twin.twinId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const newTweets = await newTweetsResponse.json();
        const allData = [...newTweets, ...twin.twineets];

        // Generate a twineet based on fetched tweets
        const prompt = `Based on the following tweets: ${allData.map(tweet => tweet.text).join(', ')}, generate a twineet for a ${twin.personality} AI twin.`;

        const generateResponse = await fetch(`/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        const modelData = await generateResponse.json();
        const generatedText = modelData.choices[0].message?.content || modelData.choices[0].text;

        const newTwineet = {
          id: crypto.randomUUID(),
          userId: stateCurrentUserId || '',
          twinId: twin.twinId,
          content: generatedText,
          timestamp: new Date(),
          likesCount: Math.floor(Math.random() * 100), 
          retwineetsCount: Math.floor(Math.random() * 100), 
          repliesCount: Math.floor(Math.random() * 100), 
          isLiked: false, 
          isRetwineeted: false
        };

        // Update twineets state
        setTwineets(prev => [...prev, newTwineet]);
      }
    } catch (error) {
      console.error('Error fetching twins or tweets:', error);
    } finally {
      setLoading(false);
    }
  }, [stateCurrentUserId]);

  const fetchAndDisplayTwineets = useCallback(async () => {
    try {
      const response = await fetch('/api/twineets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch twineets');
      }
      const result = await response.json();
      setTwineets(result.reverse());
    } catch (error) {
      console.error('Error fetching twineets:', error);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchTwins(); // Fetch twins and their tweets on mount

    // Polling every 5 minutes
    const interval = setInterval(() => {
      fetchAndDisplayTwineets();
    }, 300000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchTwins, fetchAndDisplayTwineets]);

  if (loading) {
    return <LoadingSpinner />; 
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto">
        {/* Tabs and other UI elements */}
        <div className="divide-y divide-white/10">
          {twineets.map((twineet) => {
            const twin = twins.find(a => a.twinId === twineet.twinId);
            if (!twin) return null;

            return (
              <Twineet key={twineet.id} twineet={twineet} twin={twin} />
            );
          })}
        </div>
      </div>
    </div>
  );
}