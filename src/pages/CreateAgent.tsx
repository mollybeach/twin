import React, { useState, useRef } from 'react';
import { Bot, Check, Loader2, AlertCircle, MessageCircle, Users, Activity, Upload, Rocket } from 'lucide-react';
import { verifyTwitterAccount } from '../services/twitter';
import { useMarketplaceStore } from '../store/marketplace';
import { useNavigate } from 'react-router-dom';
import { generateResponse } from '../services/openaiService';
import { fetchTweets } from '../services/twitter';

interface AgentConfig {
  twitterHandle: string;
  personality: string;
  description: string;
  autoReply: boolean;
  price: number;
  isListed: boolean;
  profileImage: string;
}

interface AgentStats {
  replies: number;
  interactions: number;
  uptime: string;
}

export function CreateAgent() {
  const navigate = useNavigate();
  const addAgent = useMarketplaceStore((state) => state.addAgent);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<AgentConfig>({
    twitterHandle: '',
    personality: 'friendly',
    description: '',
    autoReply: true,
    price: 1000,
    isListed: false,
    profileImage: 'https://i.imgur.com/HDQ3OTC.png' // Default avatar
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [agentStats, setAgentStats] = useState<AgentStats>({
    replies: 0,
    interactions: 0,
    uptime: '0h 0m',
  });
  const [generatedTweet, setGeneratedTweet] = useState<string | null>(null);
  const [fetchedTweets, setFetchedTweets] = useState<string[]>([]);

  const handleVerify = async () => {
    if (!config.twitterHandle) return;
    
    setIsVerifying(true);
    setVerificationError(null);
    
    try {
      const response = await verifyTwitterAccount(config.twitterHandle);
      if (response.verified) {
        setIsVerified(true);
        setStep(2);
        await handleFetchTweets();
      } else {
        setVerificationError(response.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError('Network error occurred');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFetchTweets = async () => {
    try {
      const tweets = await fetchTweets(config.twitterHandle);
      setFetchedTweets(tweets);
    } catch (error) {
      console.error('Failed to fetch tweets:', error);
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
        twitterHandle: config.twitterHandle,
        personality: config.personality,
        description: config.description,
        price: config.price,
        profileImage: config.profileImage,
      });
      
      setIsDeployed(true);
      startStatsSimulation();
      
      // Navigate to the new agent's analytics page after a short delay
      setTimeout(() => {
        navigate(`/analytics/${newAgentId}`);
      }, 2000);
    } catch (error) {
      console.error('Failed to deploy Twin:', error);
      setDeployError('Failed to deploy Twin. Please try again later.');
      setIsDeploying(false);
    }
  };

  const startStatsSimulation = () => {
    let minutes = 0;
    const interval = setInterval(() => {
      minutes += 1;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      setAgentStats(prev => ({
        replies: prev.replies + Math.floor(Math.random() * 2),
        interactions: prev.interactions + Math.floor(Math.random() * 3),
        uptime: `${hours}h ${mins}m`,
      }));
    }, 60000);

    return () => clearInterval(interval);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = event.target.files?.[0];
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setConfig({ ...config, profileImage: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerateResponse = async () => {
    const prompt = `Generate a tweet for a ${config.personality} AI agent.`;
    try {
      const response = await generateResponse(prompt);
      console.log('Generated response:', response);
      setGeneratedTweet(response);
    } catch (error) {
      console.error('Failed to generate response:', error);
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

        {!isDeployed ? (
          <div className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
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
                        setIsVerified(false);
                        setVerificationError(null);
                      }}
                      className={`bg-white/5 focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md text-white ${
                        verificationError ? 'border-red-300' : ''
                      }`}
                      placeholder="twinuser"
                    />
                  </div>
                  {verificationError && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{verificationError}</span>
                    </div>
                  )}
                  {isVerified && (
                    <div className="flex items-center space-x-2 text-green-400 text-sm mt-1">
                      <Check className="w-4 h-4" />
                      <span>Account verified successfully!</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={!config.twitterHandle || isVerifying}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Let's Go! <Rocket className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Upload Avatar
                  </label>
                  
                  <div className="mb-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center px-4 py-2 border border-white/10 shadow-sm text-sm font-medium rounded-md text-purple-300 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Avatar Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadError && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>
                </div>

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

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Twin Description
                  </label>
                  <textarea
                    value={config.description}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    rows={3}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 mt-1 block w-full sm:text-sm border-white/10 rounded-md bg-white/5 text-white"
                    placeholder="Describe your Twin's purpose and behavior..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    List for Sale
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="list-for-sale"
                        type="checkbox"
                        checked={config.isListed}
                        onChange={(e) => setConfig({ ...config, isListed: e.target.checked })}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/10 rounded bg-white/5"
                      />
                      <label htmlFor="list-for-sale" className="ml-2 block text-sm text-purple-300">
                        Make available in marketplace
                      </label>
                    </div>
                  </div>
                  
                  {config.isListed && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-purple-300">
                        Price (USD)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-purple-400 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={config.price ?? 0}
                          onChange={(e) => setConfig({ ...config, price: e.target.value ? parseFloat(e.target.value) : 0 })}
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md bg-white/5 text-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="auto-reply"
                    type="checkbox"
                    checked={config.autoReply}
                    onChange={(e) => setConfig({ ...config, autoReply: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/10 rounded bg-white/5"
                  />
                  <label htmlFor="auto-reply" className="ml-2 block text-sm text-purple-300">
                    Enable automatic replies
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setStep(1);
                      setIsVerified(false);
                    }}
                    className="flex-1 px-4 py-2 border border-white/10 shadow-sm text-sm font-medium rounded-md text-purple-300 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        Launch Twin <Rocket className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
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
                @{config.twitterHandle} • {config.personality} Mode
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <MessageCircle className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{agentStats.replies}</div>
                <div className="text-xs text-purple-300">Replies</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{agentStats.interactions}</div>
                <div className="text-xs text-purple-300">Friends</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{agentStats.uptime}</div>
                <div className="text-xs text-purple-300">Uptime</div>
              </div>
            </div>

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
              onClick={handleGenerateResponse}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Generate Tweet
            </button>

            {generatedTweet && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white">Generated Tweet:</h3>
                <p className="text-white">{generatedTweet}</p>
              </div>
            )}

            {fetchedTweets.length > 0 && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white">Fetched Tweets:</h3>
                <ul className="text-white">
                  {fetchedTweets.map((tweet, index) => (
                    <li key={index} className="mt-2">{tweet}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}