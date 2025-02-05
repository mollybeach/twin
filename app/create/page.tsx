"use client";
import React, { useState, useRef } from 'react';
import { Bot, Check, AlertCircle, MessageCircle, Users, Activity, Rocket } from 'lucide-react';
import { useMarketplaceStore } from '../store/marketplace';
import { useRouter } from 'next/navigation';
import {  AgentType, AnalyticsType, FetchedTweetType, TwineetType, } from '../types/types';
import { defaultAgent } from '../utils/defaultData';

export default function CreatePage() {
  const router = useRouter();
  const addAgent = useMarketplaceStore((state) => state.addAgent);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<AgentType>(defaultAgent);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [generatedTwineet, setGeneratedTwineet] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFetchingTweets, setIsFetchingTweets] = useState(false);


  const handleFetchTweets = async () => {
    setIsFetchingTweets(true);
    try {
        const response = await fetch(`/api/tweets?username=${encodeURIComponent(config.twitterHandle)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tweets');
        }

        const tweets = await response.json();
        setConfig((prev) => ({ ...prev, fetchedTweets: tweets }));

        // Send tweets to OpenAI for training the model
        const modelData = await handleGenerateResponse(tweets); // Call the updated function
        console.log('Model data:', modelData);
        // Set success message after fetching tweets
        setSuccessMessage('Tweets fetched successfully! \n Model trained successfully!');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to fetch tweets:', error);
            setDeployError(error.message);
        } else {
            console.error('Failed to fetch tweets:', error);
            setDeployError('An unknown error occurred');
        }
    } finally {
        setIsFetchingTweets(false);
    }
};

const handleGenerateResponse = async (tweets: FetchedTweetType[]): Promise<Record<string, unknown>> => {
  const prompt = `Based on the following tweets: ${tweets.map(tweet => tweet.text).join(', ')}, generate a twineet for a ${config.personality} AI agent.`;
  try {
      const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }), // Send the prompt to the API
      });

      if (!response.ok) {
          throw new Error('Failed to generate response from OpenAI');
      }

      const data = await response.json();
      const generatedText = data.choices[0].message?.content || data.choices[0].text; // Adjust based on your OpenAI API response structure

      setConfig(prev => ({
          ...prev,
          twineets: [...(prev.twineets || []), {
              id: crypto.randomUUID(),
              agentId: config.agentId,
              content: generatedText,
              timestamp: new Date(),
              likes: Math.floor(Math.random() * 100),
              retwineets: Math.floor(Math.random() * 100),
              replies: Math.floor(Math.random() * 100),
              isLiked: Math.random() < 0.5,
              isRetwineeted: Math.random() < 0.5,
          }]
      }));

      return { generatedText };
  } catch (error) {
      console.error('Failed to generate response:', error);
      throw new Error('Failed to generate response from OpenAI.');
  }
};

  const setAgentIdInConfig = (obj: any, myAgentId: string) => {
    if (Array.isArray(obj)) {
        obj.forEach(item => setAgentIdInConfig(item, myAgentId));
    } else if (typeof obj === 'object' && obj !== null) {

        for (const key in obj) {
            if (key === 'agentId') {
                obj[key] = myAgentId; 
            } else if (key === 'timestamp' && obj[key] === null) {
                obj[key] = new Date();
            } else if (key === 'fetchedTweets' && Array.isArray(obj[key])) {
                obj[key].forEach(tweet => {
                    if (!tweet.timestamp) {
                        tweet.agentId = myAgentId;
                        tweet.timestamp = new Date();
                    }
                });
            } else {
                if (!obj.hasOwnProperty('agentId')) {
                    obj.agentId = myAgentId;
                }
                setAgentIdInConfig(obj[key], myAgentId);
            }
        }
    }
};
  const handleDeploy = async () => {
    if (config.isListed && (config.price === undefined || config.price <= 0)) {
      setDeployError('Please set a valid price for your Twin');
      return;
    }

    setIsDeploying(true);
    setDeployError(null);

    const myAgentId = crypto.randomUUID();

    setAgentIdInConfig(config, myAgentId);

    
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to create agent', { cause: response.statusText });
      }

      const result = await response.json();
      console.log('Agent created successfully:', result);

      addAgent(config);

      setIsDeployed(true);
      setTimeout(() => {
        router.push(`/timeline`);
      }, 2000);
    } catch (error) {
      console.error('Failed to deploy Twin:', error);
      setDeployError('Failed to deploy Twin. Please try again later.');
    } finally {
      setIsDeploying(false);
    }
  };

/*
  const generateMultipleTwineets = async (agentId: string): Promise<TwineetType[]> => {
    const twineets: TwineetType[] = [];
    for (let i = 0; i < 5; i++) {
      const prompt = `Generate a twineet for a ${config.personality} AI agent based on the following tweets: ${config.fetchedTweets
        .map((tweet) => tweet.text)
        .join(', ')}`;
      const content = await generateResponse(prompt);
      const newTwineet: TwineetType = {
        agentId: agentId,
        content: content,
        timestamp: new Date(),
        likes: 0,
        retwineets: 0,
        replies: 0,
        isLiked: false,
        isRetwineeted: false,
      };
      twineets.push(newTwineet);
    }
    return twineets;
  };*/


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setConfig({ ...config, profileImage: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
      <div className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <Bot className="w-12 h-12 text-purple-400" />
          <span className="text-2xl font-bold text-white">Create Twin</span>
        </div>

        {deployError && (
          <div className="bg-red-500/10 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-400">{deployError}</p>
            </div>
          </div>
        )}

        {step === 1 && !isDeployed ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-300">
                Twin Handle
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-purple-400 sm:text-sm">@</span>
                </div>
              <input
                type="text"
                value={config.twinHandle}
                onChange={(e) => {
                  setConfig({ ...config, twinHandle: e.target.value });
                }}
                className={`bg-white/5 focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md text-white`}
                placeholder="Enter your Twin's name"
              />
            </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-300">
                Twitter Handle
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-purple-400 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  value={config.twitterHandle}
                  onChange={(e) => {
                    setConfig({ ...config, twitterHandle: e.target.value });
                  }}
                  className={`bg-white/5 focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md text-white`}
                  placeholder="Enter a Twitter Username to Train Your Twin"
                />
              </div>
            </div>

            <button
              onClick={handleFetchTweets}
              disabled={!config.twitterHandle}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingTweets ? (
                <>
                  <span className="animate-spin">🔄</span> Fetching Tweets...
                </>
              ) : (
                <>
                  Fetch Tweets <Rocket className="ml-2 w-4 h-4" />
                </>
              )}
            </button>

            {successMessage && (
              <div className="mt-2 text-green-500">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-300">
                AI Personality
              </label>
              <select
                value={config.personality}
                onChange={(e) => setConfig({ ...config, personality: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-white/10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white/5 text-white"
              >
                <option value="friendly">Friendly & Helpful</option>
                <option value="professional">Professional & Formal</option>
                <option value="casual">Casual & Relaxed</option>
                <option value="witty">Witty & Humorous</option>
              </select>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Upload Profile Image
            </button>

            <button
              onClick={() => setStep(2)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Next Step
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={config.profileImage}
                  alt="Twin Profile"
                  className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-purple-500"
                />
                <Check className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-lg font-medium text-white">Twin is Live!</p>
              <p className="text-sm text-purple-300">
                @{config.twinHandle} • {config.personality} Mode
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <MessageCircle className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.stats.replies}</div>
                <div className="text-xs text-purple-300">Replies</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.stats.interactions}</div>
                <div className="text-xs text-purple-300">Friends</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.stats.uptime}</div>
                <div className="text-xs text-purple-300">Uptime</div>
              </div>
            </div>

            {generatedTwineet && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white">Generated Twineet:</h3>
                <p className="text-white">{generatedTwineet}</p>
              </div>
            )}

            {config.description && (
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Twin's Mission</h3>
                <p className="text-sm text-white">{config.description}</p>
              </div>
            )}

            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-300 mb-2">Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-white">Active and responding to mentions</span>
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <span className="animate-spin">🔄</span> Deploying...
                </>
              ) : (
                <>
                  Launch Twin <Rocket className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}