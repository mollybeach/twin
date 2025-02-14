// path: app/createtwin/page.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Check, AlertCircle, MessageCircle, Users, Activity, Rocket } from 'lucide-react';
import { useStore } from '../store/store';
import { useRouter } from 'next/navigation';
import { TwinType, FetchedTweetType } from '../types/types';
import { defaultTwin } from '../utils/defaultData';
import Image from 'next/image';

export default function CreateTwinPage() {
  const router = useRouter();
  const { stateCurrentUserId, getNewTwinId, stateTwinAdded, getTweets, getGeneratedTwineetContent, getCreateTwin } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newTwinId = getNewTwinId();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<TwinType>(defaultTwin(newTwinId ?? '', stateCurrentUserId ?? ''));
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [generatedTwineet, setGeneratedTwineet] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFetchingTweets, setIsFetchingTweets] = useState(false);
  const [isGeneratingTwineet, setIsGeneratingTwineet] = useState(false);
  const [fetchedTweets, setFetchedTweets] = useState<FetchedTweetType[]>([]);
  const { getGenerateImage, getGeneratedTwineetContentKanyeWest } = useStore();

  const gatherTwitterHistory = async () => {
    setIsFetchingTweets(true);
    try {
      const tweets = await getTweets(config.twitterHandle, newTwinId);
      setFetchedTweets(tweets);
      setConfig((prev) => ({ ...prev, fetchedTweets: tweets }));
      setStep(2);
      setSuccessMessage('Tweets Fetched Successfully');
    } catch (error) {
      console.error('Failed to fetch tweets:', error);
      setDeployError('Error fetching tweets');
    } finally {
      setIsFetchingTweets(false);
    }
  };

  const handleGenerateTwineetKanyeWest = async () => {
    setIsGeneratingTwineet(true);
    try {
      const { generatedText } = await getGeneratedTwineetContentKanyeWest(fetchedTweets, config.personality);
      setGeneratedTwineet(generatedText);
      setConfig((prev) => ({
        ...prev,
        twineets: [
          ...prev.twineets,
          {
            userId: stateCurrentUserId ?? '',
            twinId: newTwinId ?? '',
            content: generatedText,
            timestamp: new Date(),
            likesCount: Math.floor(Math.random() * 100),
            retwineetsCount: Math.floor(Math.random() * 100),
            repliesCount: Math.floor(Math.random() * 100),
            isLiked: false,
            isRetwineeted: false
          },
        ],
      }));
      setConfig((prev) => ({
        ...prev,
        userId: stateCurrentUserId ?? '',
      }));
      setStep(3);
    } catch (error) {
      console.error('Failed to generate twineet:', error);
      setDeployError('Error generating twineet');
    } finally {
      setIsGeneratingTwineet(false);
    }
  };


  const handleGenerateTwineet = async () => {
    setIsGeneratingTwineet(true);
    try {
      const { generatedText } = await getGeneratedTwineetContent(fetchedTweets, config.personality);
      setGeneratedTwineet(generatedText);
      setConfig((prev) => ({
        ...prev,
        twineets: [
          ...prev.twineets,
          {
            userId: stateCurrentUserId ?? '',
            twinId: newTwinId ?? '',
            content: generatedText,
            timestamp: new Date(),
            likesCount: Math.floor(Math.random() * 100),
            retwineetsCount: Math.floor(Math.random() * 100),
            repliesCount: Math.floor(Math.random() * 100),
            isLiked: false,
            isRetwineeted: false
          },
        ],
      }));
      setConfig((prev) => ({
        ...prev,
        userId: stateCurrentUserId ?? '',
      }));
      setStep(3);
    } catch (error) {
      console.error('Failed to generate twineet:', error);
      setDeployError('Error generating twineet');
    } finally {
      setIsGeneratingTwineet(false);
    }
  };

  const handleGenerateProfileImage = async () => {
    const prompt = `A profile image for a twin named ${config.twinHandle} with the personality of ${config.personality} based on the following tweets: ${fetchedTweets.map(tweet => tweet.text).join(', ')}`;
    try {
      const imageData = await getGenerateImage(prompt);
      if (imageData && imageData.imageUrl) {
        setConfig((prev) => ({ ...prev, profileImage: imageData.imageUrl }));
      } else {
        throw new Error('No image data returned');
      }
    } catch (error) {
      console.error('Failed to generate profile image:', error);
      setDeployError('Error generating profile image');
    }
  };

  const deployTwin = async () => {
    if (config.isListed && (config.price === undefined || config.price <= 0)) {
      setDeployError('Please set a valid price for your Twin');
      return;
    }
    setIsDeploying(true);
    setDeployError(null);

    await getCreateTwin(config);
    if (stateTwinAdded) {
      setIsDeployed(true);
      setTimeout(() => {
        router.push(`/`);
      }, 2000);
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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-300">Description</label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="bg-white/5 block w-full pt-2 pl-3 pr-12 sm:text-sm border-white/10 rounded-md text-white"
                placeholder="Enter a description for your Twin's mission"
                rows={3}
              />
            </div>

            <button
              onClick={gatherTwitterHistory}
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
            {/**Add a button to generate an profile image for the twin */}
            <button
              onClick={() => handleGenerateProfileImage()}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Generate Profile Image
            </button>

            <button
              onClick={() => setStep(2)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Next Step
            </button>
          </div>
        ) : step === 2 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Fetched Tweets</h3>
            <ul className="space-y-2">
                {fetchedTweets.slice(0, 5).map((tweet: FetchedTweetType, index: number) => (
                <li key={index} className="bg-white/5 p-2 rounded-md">
                  {tweet.text}
                </li>
              ))}
            </ul>
            {config.description && (
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Twin&apos;s Mission</h3>
                <p className="text-sm text-white">{config.description}</p>
              </div>
            )}
            <div>
              {config.twitterHandle === 'kanyewest' ? (
                <button
                  onClick={handleGenerateTwineetKanyeWest}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Generate Twineet
                </button>
              ) : (
                <button
                  onClick={handleGenerateTwineet}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500/50 hover:bg-purple-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {isGeneratingTwineet ? (
                    <>
                      <span className="animate-spin">🔄</span> Generating Twineet...
                    </>
                  ) : (
                    'Generate Twineet'
                  )}
                </button>
              )}
              <button
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={config.profileImage}
                    alt="Twin Profile"
                    className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-purple-500"
                    width={24}
                    height={24}
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
                  <div className="text-2xl font-bold text-white">{config.stats.repliesCount}</div>
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
            </div>

            {generatedTwineet && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white">Generated Twineet:</h3>
                <p className="text-white">{generatedTwineet}</p>
              </div>
            )}

            <button
              onClick={deployTwin}
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