import React, { useState, useRef } from 'react';
import { Bot, Check, AlertCircle, MessageCircle, Users, Activity, Rocket } from 'lucide-react';
import { useMarketplaceStore } from '../store/marketplace';
import { useNavigate } from 'react-router-dom';
import { generateResponse } from '../services/openaiService';
import { fetchTweets } from '../services/twitter';
import { AgentConfigType, FetchedTweetsType, TwineetType } from '../types/types';

export function CreateAgent() {
  const navigate = useNavigate();
  const addAgent = useMarketplaceStore((state) => state.addAgent);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<AgentConfigType>({
    agentId: '',
    twitterHandle: '',
    twinHandle: '',
    personality: 'friendly',
    description: '',
    autoReply: true,
    price: 1000,
    isListed: false,
    profileImage: 'https://i.imgur.com/HDQ3OTC.png', // Default avatar
    modelData: {},
    fetchedTweets: [],
    twineets: [],
    stats: { replies: 0, interactions: 0, uptime: '0h 0m' } // Initialize stats
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [generatedTwineet, setGeneratedTwineet] = useState<string | null>(null);

  const handleFetchTweets = async () => {
    try {
      const tweets = await fetchTweets(config.twitterHandle);
      setConfig((prev) => ({ ...prev, fetchedTweets: tweets }));
      
      // Send tweets to OpenAI for training the model
      const modelData = await trainModelWithTweets(tweets);
      
      // Update the agent data with the model information and fetchedTweets
      await handleGenerateResponse(tweets, modelData); // Pass model data to the response handler
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to fetch tweets:', error);
        setDeployError(error.message); // Display the error message to the user
      } else {
        console.error('Failed to fetch tweets:', error);
        setDeployError('An unknown error occurred'); // Display a generic error message to the user
      }
    }
  };

  const trainModelWithTweets = async (tweets: FetchedTweetsType[]): Promise<Record<string, unknown>> => {
    try {
      const response = await generateResponse(tweets.map(tweet => tweet.text).join(' '));
      
      // Log the response for debugging
      console.log('Response from OpenAI:', response);
      
      // Since the response is plain text, you can return it directly or process it as needed
      // If you need to return an object, you can create a structure based on the response
      return { generatedText: response }; // Example structure
    } catch (error) {
      console.error('Failed to train model:', error);
      throw new Error('Failed to train model with tweets.');
    }
  };

  const handleDeploy = async () => {
    if (config.isListed && (config.price === undefined || config.price <= 0)) {
      setDeployError('Please set a valid price for your Twin');
      return;
    }

    setIsDeploying(true);
    setDeployError(null);
    try {
      const newAgentId = await addAgent({
        id: crypto.randomUUID(),
        createdAt: new Date(),
        twinHandle: config.twinHandle,
        twitterHandle: config.twitterHandle,
        personality: config.personality,
        description: config.description,
        price: config.price,
        profileImage: config.profileImage,
        stats: config.stats,
        tokenShares: {
          totalShares: 0,
          availableShares: 0,
          pricePerShare: 0,
          shareholders: []
        },
        verification: {
          isVerified: false,
          verificationDate: undefined
        },
        analytics: {
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
        fetchedTweets: config.fetchedTweets,
        twineets: [] // Initialize twineets as an empty array
      });

      // Generate multiple twineets and save them to twineets
      const generatedTwineets = await generateMultipleTwineets(newAgentId);
      setConfig(prev => ({
        ...prev,
        twineets: generatedTwineets
      }));

      setIsDeployed(true);
      // Navigate to the new agent's analytics page after a short delay
      setTimeout(() => {
        navigate(`/analytics/${newAgentId}`);
      }, 2000);
    } catch (error) {
      console.error('Failed to deploy Twin:', error);
      setDeployError('Failed to deploy Twin. Please try again later.');
    } finally {
      setIsDeploying(false); // Reset deploying state
    }
  };

  const generateMultipleTwineets = async (agentId: string): Promise<TwineetType[]> => {
    const twineets: TwineetType[] = [];
    for (let i = 0; i < 5; i++) { // Generate 5 twineets
      const content = await generateResponse(`Generate a twineet for a ${config.personality} AI agent.`);
      const newTwineet: TwineetType = {
        id: crypto.randomUUID(),
        agentId: agentId,
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        retwineets: 0,
        replies: 0,
        isLiked: false,
        isRetwineeted: false,
      };
      twineets.push(newTwineet);
    }
    return twineets;
  };

  const handleGenerateResponse = async (tweets: FetchedTweetsType[], modelData: Record<string, unknown>) => {
    const prompt = `Based on the following tweets: ${tweets.map(tweet => tweet.text).join(', ')}, generate a twineet for a ${config.personality} AI agent. Model data: ${JSON.stringify(modelData)}`;
    try {
      const response = await generateResponse(prompt);
      console.log('Generated response:', response);
      setGeneratedTwineet(response);
      
      // Save the generated twineet to twineets
      setConfig(prev => ({
        ...prev,
        twineets: [...(prev.twineets || []), {
          id: crypto.randomUUID(),
          agentId: config.agentId,
          content: response,
          timestamp: new Date().toISOString(),
          likes: 0,
          retwineets: 0,
          replies: 0,
          isLiked: false,
          isRetwineeted: false,
        }]
      }));
    } catch (error) {
      console.error('Failed to generate response:', error);
    }
  };

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
                Twin Name
              </label>
              <input
                type="text"
                value={config.twinHandle}
                onChange={(e) => {
                  setConfig({ ...config, twinHandle: e.target.value });
                }}
                className={`bg-white/5 focus:ring-purple-500 focus:border-purple-500 block w-full pl-3 pr-12 sm:text-sm border-white/10 rounded-md text-white`}
                placeholder="Enter your Twin's name"
              />
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
                  placeholder="twitter username to train your twin on"
                />
              </div>
            </div>

            <button
              onClick={handleFetchTweets}
              disabled={!config.twitterHandle}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fetch Tweets <Rocket className="ml-2 w-4 h-4" />
            </button>

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