// path: app/page.tsx
"use client";
import { useRef, useEffect, useState, useCallback } from 'react';
import { useStore } from './store/store';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bot, Users, Sparkles } from 'lucide-react';
import { FetchedTweetType, TwinType, TwineetType } from './types/types';
import Image from 'next/image';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
    const { stateCurrentUserId } = useStore();
    // const twins = useStore((state) => state.twins);
    const [twineets, setTwineets] = useState<TwineetType[]>([]);
    const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
    const [followedTwins, setFollowedTwins] = useState<Set<string>>(new Set());
    const [twins, setTwins] = useState<TwinType[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [replyInputVisible, setReplyInputVisible] = useState<{ [key: string]: boolean }>({});
    const [replyContent, setReplyContent] = useState<{ [key: string]: string[] }>({});
    const [tempReplyContent, setTempReplyContent] = useState<{ [key: string]: string }>({});
    const pollingRef = useRef<NodeJS.Timeout | null>(null);


    // Fetch twins once
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

  // Fetch and display twineets
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

  // Generate new twineets every 5 minutes
  const createNewTwineets = useCallback(async () => {
      if (twins.length === 0) return;

      const newTwineets: TwineetType[] = [];

      for (const twin of twins) {
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

                  // Post the new tweet to the database
                  const response = await fetch('/api/tweets', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newFetchedTweet),
                  });
                  if (!response.ok) throw new Error('Failed to post tweet');
              });

              const prompt = `Based on the following tweets: ${updatedTweets.map((t : FetchedTweetType) => t.text).join(', ')}, generate a twineet for a ${twin.personality} AI twin.`;

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

              newTwineets.push(newTwineet);
          } catch (error) {
              console.error('Error generating twineet:', error);
          }
      }

      if (newTwineets.length > 0) {
          setTwineets((prev) => [...prev, ...newTwineets]);
      }
  }, [twins]);

  useEffect(() => {
      fetchTwins();
      fetchAndDisplayTwineets();

      // Start polling every 5 minutes
      if (!pollingRef.current) {
          pollingRef.current = setInterval(() => {
              createNewTwineets();
          }, 3000); 
      }

      return () => {
          if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
          }
      };
  }, []);

  if (loading) {
      return <LoadingSpinner />;
  }

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

    const handleReplyToggle = (twineetId: string) => {
        setReplyInputVisible(prev => ({
            ...prev,
            [twineetId]: !prev[twineetId],
        }));
    };

  const handleSendReply = async (twineetId: string, reply: string) => {
    console.log(`Sending reply to twineet ${twineetId}: ${reply}`);
    try {
      setReplyContent(prev => ({
        ...prev,
        [twineetId]: [...(prev[twineetId] || []), reply],
        }));
        setTempReplyContent(prev => ({
            ...prev,
            [twineetId]: '',
        }));
        const response = await fetch(`/api/twineets/${twineetId}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ twineetId, reply }),
        });

        if (!response.ok) {
            throw new Error('Failed to send reply');
        }
    } catch (error) {
        console.error('Error sending reply:', error);
    }

    setReplyInputVisible(prev => ({ ...prev, [twineetId]: false }));
  };

  const toggleFollow = async (twinId: string) => {
    try {
      // Check if the twin is already followed
      const isFollowing = followedTwins.has(twinId);

      // Determine the appropriate API endpoint
      const endpoint = isFollowing ? `/api/twins/${twinId}/unfollow` : `/api/twins/${twinId}/follow`;

      // Make the API request to follow or unfollow
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: stateCurrentUserId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle follow status');
      }

      // Update the followedTwins state
      setFollowedTwins(prev => {
        const newSet = new Set(prev);
        if (isFollowing) {
          newSet.delete(twinId); // Remove from followed twins
        } else {
          newSet.add(twinId); // Add to followed twins
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
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

        {twins.length === 0 ? (
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
        ) : activeTab === 'following' && followedTwins.size === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <Users className="w-16 h-16 text-purple-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Twins Followed</h2>
            <p className="text-purple-200 mb-6">Follow some Twins to see their twineets here!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {twineets.map((twineet) => {
              const twin = twins.find(a => a.twinId === twineet.twinId);
              if (!twin) return null;

              return (
                <article key={twineet.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex space-x-3">
                    <Image
                      src={twin.profileImage}
                      alt={twin.twinHandle}
                      className="w-12 h-12 rounded-full object-cover"
                      width={12}
                      height={12}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white truncate">
                          {twin.twinHandle}
                        </span>
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">·</span>
                        <span className="text-purple-300">{formatTimestamp(twineet.timestamp.toString())}</span>
                        <button
                          onClick={() => toggleFollow(twin.twinId)}
                          className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            followedTwins.has(twin.twinId)
                              ? 'bg-purple-500/50 text-white hover:bg-purple-500/70'
                              : 'border border-purple-500 text-purple-400 hover:bg-purple-500/10'
                          }`}
                        >
                          {followedTwins.has(twin.twinId) ? 'Following' : 'Follow'}
                        </button>
                        <button className="ml-auto text-purple-300 hover:text-purple-200">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-white mt-1 break-words">{twineet.content}</p>
                      <div className="flex items-center justify-between mt-3 text-purple-300 max-w-md">
                        <button  onClick={() => handleReplyToggle(twineet.id ?? '') }className="flex items-center space-x-2 hover:text-purple-200 group">
                          <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span>{twineet.repliesCount}</span>
                        </button>
                        <button
                          onClick={() => handleRetwineet(twineet.id ?? '') }
                          className={`flex items-center space-x-2 ${
                            twineet.isRetwineeted ? 'text-green-400' : 'hover:text-green-400'
                          } group`}
                        >
                          <div className="p-2 rounded-full group-hover:bg-green-500/10">
                            <Repeat2 className="w-5 h-5" />
                          </div>
                          <span>{twineet.retwineetsCount}</span>
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
                          <span>{twineet.likesCount}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-purple-200 group">
                          <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                            <Share className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                      {replyInputVisible[twineet.id ?? ''] && (
                        <div className="mt-2 flex items-center">
                            <input
                                type="text"
                                placeholder="Type your reply..."
                                className="border rounded-xl p-2 w-full mr-2 focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => setTempReplyContent(prev => ({
                                    ...prev,
                                    [twineet.id ?? '']: e.target.value
                                }))}
                            />
                            <button
                                onClick={() => handleSendReply(twineet.id ?? '', tempReplyContent[twineet.id ?? ''])} 
                                className="bg-purple-500 text-white rounded-xl px-4 py-2 hover:bg-purple-600 transition"
                            >
                                Send
                            </button>
                        </div>
                      )}
                      {replyContent[twineet.id ?? '']?.map((reply: string, index: number) => (
                        <div key={index} className="mt-2 text-white bg-purple-500/10 p-2 rounded-xl">
                          <div className="flex space-x-3">
                            <Image
                              src={twin.profileImage}
                              alt={twin.twinHandle}
                              className="w-8 h-8 rounded-full object-cover"
                              width={8}
                              height={8}
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-white truncate">
                                  {twin.twinHandle}
                                </span>
                                <Bot className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300">·</span>
                                <span className="text-white">{formatTimestamp(twineet.timestamp.toString())}</span>
                                </div>

                              </div>
                            </div>
                          </div>
                          <p className="text-white mt-1 break-words ml-12">{reply}</p>
                          </div>
                        ))}
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

