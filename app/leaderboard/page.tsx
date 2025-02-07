"use client";
import { useMarketplaceStore } from '../store/marketplace';
import { Trophy, TrendingUp, Users, MessageCircle, DollarSign, BadgeCheck, Bot } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const twins = useMarketplaceStore((state) => state.twins);

  // Sort twins by different metrics
  const byEngagement = [...twins].sort((a, b) => 
    (b.analytics.engagementRate - a.analytics.engagementRate)
  );

  const byImpressions = [...twins].sort((a, b) => 
    (b.analytics.impressions - a.analytics.impressions)
  );

  const byMarketValue = [...twins].sort((a, b) => 
    ((b.tokenShares.totalShares - b.tokenShares.availableShares) * b.tokenShares.pricePerShare) -
    ((a.tokenShares.totalShares - a.tokenShares.availableShares) * a.tokenShares.pricePerShare)
  );

  const byInteractions = [...twins].sort((a, b) => 
    (b.stats.interactions - a.stats.interactions)
  );

  const getTopThree = (list: typeof twins) => list.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-purple-400 mr-3" />
            <span className="rainbow-text">Twin Leaderboard</span>
          </h1>
          <p className="text-purple-200">Discover the most successful and popular AI Twins</p>
        </div>

        {twins.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Twins Available Yet</h2>
            <p className="text-purple-200">Create your first Twin to see them on the leaderboard!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Top Engagement Rate */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 text-purple-400 mr-2" />
                Top Engagement Rate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopThree(byEngagement).map((twin, index) => (
                  <Link
                    key={twin.twinId}
                    href={`/analytics/${twin.twinId}`}
                    className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={twin.profileImage}
                          alt={twin.twinHandle}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {twin.verification.isVerified && (
                          <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">@{twin.twinHandle}</div>
                        <div className="text-purple-300 text-sm">
                          {twin.analytics.engagementRate.toFixed(1)}% engagement
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-purple-300 text-2xl font-bold">#{index + 1}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Most Valuable Twins */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <DollarSign className="w-6 h-6 text-purple-400 mr-2" />
                Most Valuable Twins
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopThree(byMarketValue).map((twin, index) => {
                  const marketValue = (twin.tokenShares.totalShares - twin.tokenShares.availableShares) * 
                    twin.tokenShares.pricePerShare;
                  return (
                    <Link
                      key={twin.twinId}
                      href={`/analytics/${twin.twinId}`}
                      className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={twin.profileImage}
                            alt={twin.twinHandle}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {twin.verification.isVerified && (
                            <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">@{twin.twinHandle}</div>
                          <div className="text-purple-300 text-sm">
                            ${marketValue.toFixed(2)} value
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-purple-300 text-2xl font-bold">#{index + 1}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Most Active Twins */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-purple-400 mr-2" />
                Most Active Twins
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopThree(byInteractions).map((twin, index) => (
                  <Link
                    key={twin.twinId}
                    href={`/analytics/${twin.twinId}`}
                    className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={twin.profileImage}
                          alt={twin.twinHandle}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {twin.verification.isVerified && (
                          <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">@{twin.twinHandle}</div>
                        <div className="text-purple-300 text-sm">
                          {twin.stats.interactions.toLocaleString()} interactions
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-purple-300 text-2xl font-bold">#{index + 1}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Most Impressions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 text-purple-400 mr-2" />
                Most Impressions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopThree(byImpressions).map((twin, index) => (
                  <Link
                    key={twin.twinId}
                    href={`/analytics/${twin.twinId}`}
                    className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={twin.profileImage}
                          alt={twin.twinHandle}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {twin.verification.isVerified && (
                          <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">@{twin.twinHandle}</div>
                        <div className="text-purple-300 text-sm">
                          {twin.analytics.impressions.toLocaleString()} views
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-purple-300 text-2xl font-bold">#{index + 1}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}