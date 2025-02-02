// path: src/components/Portfolio.tsx
import { useState } from 'react';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SharePriceChart } from './SharePriceChart';
import { TradeModalPropsType } from '../types/types';

function TradeModal({ agentId, twinHandle, currentShares, availableShares, pricePerShare, isSelling, onClose }: TradeModalPropsType) {
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
          {isSelling ? 'Sell' : 'Buy'} @{twinHandle} Shares
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
    twinHandle: string;
    currentShares: number;
    availableShares: number;
    pricePerShare: number;
    isSelling: boolean;
  } | null>(null);
  
  const { agents, getUserShares } = useMarketplaceStore();
  const router = useRouter();

  const holdings = agents.map(agent => {
    const shares = getUserShares(agent.agentId);
    const value = shares * agent.tokenShares.pricePerShare;
    return {
      id: agent.agentId,
      twinHandle: agent.twinHandle,
      shares,
      value,
      pricePerShare: agent.tokenShares.pricePerShare,
      isVerified: agent.verification.isVerified,
      profileImage: agent.profileImage,
      availableShares: agent.tokenShares.availableShares
    };
  }).filter(holding => holding.shares > 0);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

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
          {/* Portfolio Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Portfolio</h2>
            <p className="text-purple-300">Total Value: ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>

          <div className="overflow-y-auto flex-1">
            <div className="space-y-4">
              {holdings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-purple-300 mb-4">No shares owned yet</p>
                  <Link
                    href="/marketplace"
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
                      href={`/analytics/${holding.id}`}
                      className="block mb-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={holding.profileImage}
                            alt={holding.twinHandle}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {holding.isVerified && (
                            <BadgeCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-white">@{holding.twinHandle}</span>
                          </div>
                          <p className="text-sm text-purple-300">
                            {holding.shares.toLocaleString()} shares
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="mb-4">
                      <SharePriceChart
                        agentId={holding.id}
                        shareholders={agents.find(a => a.agentId === holding.id)?.tokenShares.shareholders || []}
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
                          twinHandle: holding.twinHandle,
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
                          twinHandle: holding.twinHandle,
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