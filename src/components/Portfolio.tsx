import React, { useState } from 'react';
import { useMarketplaceStore } from '../store/marketplace';
import { 
  Wallet, 
  TrendingUp, 
  ChevronRight, 
  BadgeCheck, 
  ChevronLeft, 
  ChevronRight as ChevronRightIcon,
  Home,
  ShoppingBag,
  Trophy,
  PlusCircle,
  ArrowDownToLine,
  ArrowUpToLine,
  X,
  GitMerge
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SharePriceChart } from './SharePriceChart';

interface TradeModalProps {
  agentId: string;
  twitterHandle: string;
  currentShares: number;
  availableShares: number;
  pricePerShare: number;
  isSelling: boolean;
  onClose: () => void;
}

function TradeModal({ agentId, twitterHandle, currentShares, availableShares, pricePerShare, isSelling, onClose }: TradeModalProps) {
  const [shares, setShares] = useState<number>(1);
  const { buyShares, sellShares } = useMarketplaceStore();

  const maxShares = isSelling ? currentShares : availableShares;
  const totalCost = shares * pricePerShare;

  const handleTrade = async () => {
    if (shares <= 0 || shares > maxShares) return;

    if (isSelling) {
      await sellShares(agentId, shares);
    } else {
      await buyShares(agentId, shares);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">
          {isSelling ? 'Sell' : 'Buy'} @{twitterHandle} Shares
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-purple-300 mb-1">
              Number of Shares
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={maxShares}
                value={shares}
                onChange={(e) => setShares(Math.min(parseInt(e.target.value) || 0, maxShares))}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-purple-300">/ {maxShares}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">Price per Share</span>
              <span className="text-white">${pricePerShare.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">Total Cost</span>
              <span className="text-white">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleTrade}
            disabled={shares <= 0 || shares > maxShares}
            className="w-full bg-purple-500/50 text-white py-3 rounded-lg hover:bg-purple-500/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSelling ? (
              <>
                <ArrowUpToLine className="w-4 h-4" />
                <span>Sell Shares</span>
              </>
            ) : (
              <>
                <ArrowDownToLine className="w-4 h-4" />
                <span>Buy Shares</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [tradeModal, setTradeModal] = useState<{
    agentId: string;
    twitterHandle: string;
    currentShares: number;
    availableShares: number;
    pricePerShare: number;
    isSelling: boolean;
  } | null>(null);
  
  const { agents, getUserShares } = useMarketplaceStore();
  const location = useLocation();
  const navigate = useNavigate();

  const holdings = agents.map(agent => {
    const shares = getUserShares(agent.id);
    const value = shares * agent.tokenShares.pricePerShare;
    return {
      id: agent.id,
      twitterHandle: agent.twitterHandle,
      shares,
      value,
      pricePerShare: agent.tokenShares.pricePerShare,
      isVerified: agent.verification.isVerified,
      profileImage: agent.profileImage,
      availableShares: agent.tokenShares.availableShares
    };
  }).filter(holding => holding.shares > 0);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  const navigationItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/create', icon: PlusCircle, label: 'Create Twin' },
    { path: '/clone', icon: GitMerge, label: 'Clone Lab' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <>
      <div className={`${isExpanded ? 'w-80' : 'w-16'} h-screen bg-black border-r border-white/10 flex flex-col transition-all duration-300 relative group`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 bg-black rounded-full p-1 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors z-10"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4 text-purple-300" />
          ) : (
            <ChevronRight className="w-4 h-4 text-purple-300" />
          )}
        </button>

        <div className={`flex-1 ${isExpanded ? 'p-4' : 'p-2'} overflow-hidden flex flex-col`}>
          {/* Navigation Section */}
          <div className="mb-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${isExpanded ? 'px-4' : 'justify-center'} py-2 mb-1 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-purple-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`} />
                  {isExpanded && <span>{item.label}</span>}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-white/10 backdrop-blur-lg rounded-lg text-white text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Portfolio Section */}
          <div className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => navigate('/portfolio')}
              className="flex items-center space-x-2 w-full hover:bg-white/5 p-2 rounded-lg transition-colors"
            >
              <Wallet className="w-6 h-6 text-purple-400 flex-shrink-0" />
              {isExpanded && (
                <>
                  <h2 className="text-xl font-bold text-white flex-1 text-left">Portfolio</h2>
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                </>
              )}
            </button>
          </div>

          {isExpanded ? (
            <>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-300 mb-1">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="space-y-4">
                  {holdings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-purple-300 mb-4">No shares owned yet</p>
                      <Link
                        to="/marketplace"
                        className="inline-flex items-center px-4 py-2 bg-purple-500/50 text-white rounded-lg hover:bg-purple-500/70 transition-colors"
                      >
                        Browse Marketplace
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  ) : (
                    holdings.map((holding) => (
                      <div
                        key={holding.id}
                        className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <Link
                          to={`/analytics/${holding.id}`}
                          className="block mb-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={holding.profileImage}
                                alt={holding.twitterHandle}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              {holding.isVerified && (
                                <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium text-white">@{holding.twitterHandle}</span>
                              </div>
                              <p className="text-sm text-purple-300">
                                {holding.shares.toLocaleString()} shares
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className="mb-4">
                          <SharePriceChart
                            shareholders={agents.find(a => a.id === holding.id)?.tokenShares.shareholders || []}
                            pricePerShare={holding.pricePerShare}
                            isExpanded={isExpanded}
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm mb-3">
                          <div>
                            <p className="text-purple-300">Value</p>
                            <p className="text-white font-medium">
                              ${holding.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-purple-300">Price/Share</p>
                            <p className="text-white font-medium">
                              ${holding.pricePerShare.toFixed(4)}
                            </p>
                          </div>
                          <div className="flex items-center text-green-400">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>2.4%</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setTradeModal({
                              agentId: holding.id,
                              twitterHandle: holding.twitterHandle,
                              currentShares: holding.shares,
                              availableShares: holding.availableShares,
                              pricePerShare: holding.pricePerShare,
                              isSelling: false
                            })}
                            className="flex-1 bg-purple-500/50 text-white py-2 rounded-lg hover:bg-purple-500/70 transition-colors flex items-center justify-center space-x-1"
                          >
                            <ArrowDownToLine className="w-4 h-4" />
                            <span>Buy</span>
                          </button>
                          <button
                            onClick={() => setTradeModal({
                              agentId: holding.id,
                              twitterHandle: holding.twitterHandle,
                              currentShares: holding.shares,
                              availableShares: holding.availableShares,
                              pricePerShare: holding.pricePerShare,
                              isSelling: true
                            })}
                            className="flex-1 border border-purple-500 text-purple-400 py-2 rounded-lg hover:bg-purple-500/10 transition-colors flex items-center justify-center space-x-1"
                          >
                            <ArrowUpToLine className="w-4 h-4" />
                            <span>Sell</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {holdings.map((holding) => (
                <Link
                  key={holding.id}
                  to={`/analytics/${holding.id}`}
                  className="block relative group"
                >
                  <div className="relative">
                    <img
                      src={holding.profileImage}
                      alt={holding.twitterHandle}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                    />
                    {holding.isVerified && (
                      <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-3 py-2 bg-white/10 backdrop-blur-lg rounded-lg text-white text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <p className="font-medium">@{holding.twitterHandle}</p>
                    <p className="text-purple-300">${holding.value.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trade Modal */}
      {tradeModal && (
        <TradeModal
          {...tradeModal}
          onClose={() => setTradeModal(null)}
        />
      )}
    </>
  );
}