import React, { useState } from 'react';
import { useMarketplaceStore } from '../store/marketplace';
import { 
  Wallet, 
  TrendingUp, 
  BadgeCheck, 
  ArrowDownToLine, 
  ArrowUpToLine,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Clock,
  DollarSign,
  History,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SharePriceChart } from '../components/SharePriceChart';

export function PortfolioPage() {
  const { agents, getUserShares, getTransactionHistory } = useMarketplaceStore();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showTransactions, setShowTransactions] = useState(false);

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
      availableShares: agent.tokenShares.availableShares,
      personality: agent.personality,
      analytics: agent.analytics
    };
  }).filter(holding => holding.shares > 0);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalShares = holdings.reduce((sum, holding) => sum + holding.shares, 0);
  const averagePrice = totalValue / totalShares || 0;

  const transactions = getTransactionHistory(selectedAgent || undefined);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Wallet className="w-8 h-8 text-purple-400 mr-3" />
            <span className="rainbow-text">My Portfolio</span>
          </h1>
          <p className="text-purple-200">Manage and track your Twin investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total Value</p>
                <p className="text-2xl font-bold text-white">
                  ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total Shares</p>
                <p className="text-2xl font-bold text-white">{totalShares.toLocaleString()}</p>
              </div>
              <Coins className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Average Price</p>
                <p className="text-2xl font-bold text-white">
                  ${averagePrice.toFixed(4)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Active Twins</p>
                <p className="text-2xl font-bold text-white">{holdings.length}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Transaction History Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowTransactions(!showTransactions)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <History className="w-5 h-5 text-purple-400" />
            <span className="text-white">
              {showTransactions ? 'Hide Transaction History' : 'Show Transaction History'}
            </span>
          </button>
        </div>

        {/* Transaction History Section */}
        {showTransactions && (
          <div className="mb-8 bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <History className="w-6 h-6 text-purple-400 mr-2" />
                Transaction History
              </h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-purple-400" />
                <select
                  value={selectedAgent || ''}
                  onChange={(e) => setSelectedAgent(e.target.value || null)}
                  className="bg-white/10 border border-purple-500/30 rounded-lg px-3 py-1 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Twins</option>
                  {holdings.map((holding) => (
                    <option key={holding.id} value={holding.id}>
                      @{holding.twitterHandle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-purple-300 text-left">
                    <th className="pb-4">Twin</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Shares</th>
                    <th className="pb-4">Price/Share</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {transactions.map((transaction) => {
                    const agent = agents.find(a => a.id === transaction.agentId);
                    if (!agent) return null;

                    return (
                      <tr key={transaction.id} className="text-white">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={agent.profileImage}
                              alt={agent.twitterHandle}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>@{agent.twitterHandle}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center space-x-1 ${
                            transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'buy' ? (
                              <ArrowDownToLine className="w-4 h-4" />
                            ) : (
                              <ArrowUpToLine className="w-4 h-4" />
                            )}
                            <span>{transaction.type === 'buy' ? 'Buy' : 'Sell'}</span>
                          </span>
                        </td>
                        <td className="py-4">{transaction.shares}</td>
                        <td className="py-4">${transaction.pricePerShare.toFixed(4)}</td>
                        <td className="py-4">${transaction.totalAmount.toFixed(2)}</td>
                        <td className="py-4">{formatDate(transaction.timestamp)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {transactions.length === 0 && (
                <div className="text-center py-8 text-purple-300">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Holdings Section */}
        {holdings.length === 0 ? (
          <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-lg">
            <p className="text-purple-300 mb-4">No shares owned yet</p>
            <Link
              to="/marketplace"
              className="inline-flex items-center px-6 py-3 bg-purple-500/50 text-white rounded-lg hover:bg-purple-500/70 transition-colors"
            >
              Browse Marketplace
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {holdings.map((holding) => (
              <div
                key={holding.id}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 rainbow-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <Link
                    to={`/analytics/${holding.id}`}
                    className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative">
                      <img
                        src={holding.profileImage}
                        alt={holding.twitterHandle}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {holding.isVerified && (
                        <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">@{holding.twitterHandle}</h3>
                      <p className="text-purple-300">{holding.personality}</p>
                    </div>
                  </Link>
                  <div className="text-right">
                    <p className="text-sm text-purple-300">Holdings Value</p>
                    <p className="text-xl font-bold text-white">
                      ${holding.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <SharePriceChart
                    shareholders={agents.find(a => a.id === holding.id)?.tokenShares.shareholders || []}
                    pricePerShare={holding.pricePerShare}
                    isExpanded={true}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-purple-300">Shares Owned</p>
                    <p className="text-lg font-bold text-white">{holding.shares.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-purple-300">Price/Share</p>
                    <p className="text-lg font-bold text-white">${holding.pricePerShare.toFixed(4)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-purple-300">24h Change</p>
                    <div className={`flex items-center ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.random() > 0.5 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-lg font-bold">{(Math.random() * 10).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-purple-500/50 text-white py-3 rounded-lg hover:bg-purple-500/70 transition-colors flex items-center justify-center space-x-2">
                    <ArrowDownToLine className="w-4 h-4" />
                    <span>Buy More</span>
                  </button>
                  <button className="flex-1 border border-purple-500 text-purple-400 py-3 rounded-lg hover:bg-purple-500/10 transition-colors flex items-center justify-center space-x-2">
                    <ArrowUpToLine className="w-4 h-4" />
                    <span>Sell Shares</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}