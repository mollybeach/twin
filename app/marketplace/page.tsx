// app/marketplace/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Bot, DollarSign, MessageCircle, PieChart, TrendingUp, ArrowDownToLine, ArrowUpToLine, BadgeCheck, AlertCircle } from 'lucide-react';
import { PriceChart } from '../components/PriceChart';
import { TwinType } from '../types/types';
import Image from 'next/image';
import { useStore } from '../store/store';
import SuccessModal from '../components/SuccessModal';

export default function MarketplacePage() { 
    const VERIFICATION_FEE = 100;
    const { stateCurrentUserData, setCurrentUserData, getAllTwins, getUserShares, getBuyShares, getSellShares, getVerifyTwin } = useStore();
    const [twins, setTwins] = useState<TwinType[]>([]);
    const [userShares, setUserShares] = useState<{ [key: string]: number }>({});
    const [selectedTwin, setSelectedTwin] = useState<string | null>(null);
    const [sharesToBuy, setSharesToBuy] = useState<number>(1);
    const [isSellingShares, setIsSellingShares] = useState<boolean>(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const userBalance = stateCurrentUserData?.walletBalance || 0; 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const twinsData = await getAllTwins();
                console.log('twinsData', twinsData);
                const filteredTwins = twinsData.filter((twin) => twin.userId !== stateCurrentUserData?.userId);
                setTwins(filteredTwins);
                //setTwins(twinsData);

                if (stateCurrentUserData?.userId) {
                    const shareData = await getUserShares(stateCurrentUserData.userId);
                    setUserShares(() => (
                        shareData.reduce((acc: { [key: string]: number }, share: { twinId: string, shares: number }) => {
                            acc[share.twinId] = share.shares;
                            return acc;
                        }, {} as { [key: string]: number })
                    ));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getAllTwins, getUserShares, stateCurrentUserData?.userId]);

    const handleBuyShares = async (twinId: string) => {
        const twin = twins.find(a => a.twinId === twinId);
        if (!twin) return;

        if (sharesToBuy > twin.tokenShares.availableShares) {
            alert('Not enough shares available');
            return;
        }

        const numericPrice = typeof twin.price === 'string' ? parseFloat(twin.price) : twin.price;
        const totalCost = sharesToBuy * numericPrice; 

        if (totalCost > userBalance) {
            alert('Not enough balance to buy shares');
            return;
        }

        try {
            await getBuyShares(twinId, stateCurrentUserData?.userId || '', sharesToBuy);
            setSuccessMessage(`Successfully bought ${sharesToBuy} shares of ${twin.twinHandle}!`);
            setSelectedTwin(null);
            setSharesToBuy(1);
            setIsSellingShares(false);

            const newBalance = userBalance - totalCost;
            setCurrentUserData({ ...stateCurrentUserData,
                userId: stateCurrentUserData?.userId || '',
                walletBalance: newBalance, 
                username: stateCurrentUserData?.username || '',
                email: stateCurrentUserData?.email || '',
                passwordHash: stateCurrentUserData?.passwordHash || '',
                birthday: stateCurrentUserData?.birthday || new Date(),
                walletAddress: stateCurrentUserData?.walletAddress || '',
                twins: stateCurrentUserData?.twins || [],
                transactions: stateCurrentUserData?.transactions || [],
                userTokenShares: stateCurrentUserData?.userTokenShares || [],
                timestamp: stateCurrentUserData?.timestamp || new Date(),
            });
            localStorage.setItem('userBalance', newBalance.toString());
        } catch (error) {
            console.error('Error buying shares:', error);
        }
    };

    const handleSellShares = async (twinId: string) => {
        const twin = twins.find(a => a.twinId === twinId);
        if (!twin) return;
    
        if (sharesToBuy <= 0) {
            alert('Please enter a valid number of shares');
            return;
        }
    
        const userSharesCount = userShares[twinId] || 0;
        if (sharesToBuy > userSharesCount) {
            alert('You don\'t have enough shares to sell');
            return;
        }
    
        const numericPrice = typeof twin.price === 'string' ? parseFloat(twin.price) : twin.price;
        const totalRevenue = sharesToBuy * numericPrice; 
    
        // Update the user's balance
        const newBalance = userBalance + totalRevenue;
    
        try {
            await getSellShares(twinId, sharesToBuy);
            setSuccessMessage(`Successfully sold ${sharesToBuy} shares of ${twin.twinHandle}!`);
            setSelectedTwin(null);
            setSharesToBuy(1);
            setIsSellingShares(false);
    
            // Update user data
            setCurrentUserData({
                ...stateCurrentUserData,
                userId: stateCurrentUserData?.userId || '',
                walletBalance: newBalance, 
                username: stateCurrentUserData?.username || '',
                email: stateCurrentUserData?.email || '',
                passwordHash: stateCurrentUserData?.passwordHash || '',
                birthday: stateCurrentUserData?.birthday || new Date(),
                walletAddress: stateCurrentUserData?.walletAddress || '',
                twins: stateCurrentUserData?.twins || [],
                transactions: stateCurrentUserData?.transactions || [],
                userTokenShares: stateCurrentUserData?.userTokenShares || [],
                timestamp: stateCurrentUserData?.timestamp || new Date(),
            });
            localStorage.setItem('userBalance', newBalance.toString());
        } catch (error) {
            console.error('Error selling shares:', error);
        }
    };
    const handleVerification = async (twinId: string) => {
        setVerificationError(null);
        const success = await getVerifyTwin(twinId);
        if (!success) {
            setVerificationError(`You need to own at least $${VERIFICATION_FEE} worth of shares to verify this Twin`);
        }
    };

    const closeSuccessModal = () => {
        setSuccessMessage(null);
    };

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner />; 
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-4 rainbow-text">Twin.fun Marketplace</h1>
                    <p className="text-lg text-white/80">Invest in your favorite digital twins</p>
                </div>
                {twins.length === 0 ? (
                    <div className="text-center py-12">
                        <Bot className="w-12 h-12 text-white mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Twins Available Yet</h2>
                        <p className="text-white/80">Be the first to list your Twin in the marketplace!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {twins.map((twin) => {
                            const userSharesCount = userShares[twin.twinId] || 0;
                            const userValue = userSharesCount * (typeof twin.tokenShares.pricePerShare === 'number' ? twin.tokenShares.pricePerShare : 0);
                            
                            return (
                                <div
                                    key={twin.twinId}
                                    className="bg-white/95 dark:bg-gray-900/95 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative rainbow-border"
                                >
                                    <div className="absolute inset-0 marketplace-card-bg"></div>
                                    <div className="p-6 relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Image
                                                        src={twin.profileImage}
                                                        alt={`@${twin.twinHandle}`}
                                                        className={`w-16 h-16 rounded-full object-cover border-2 ${
                                                            twin.verification.isVerified ? 'border-blue-500' : 'border-white/20'
                                                        }`}
                                                        width={16}
                                                        height={16}
                                                    />
                                                    {twin.verification.isVerified && (
                                                        <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className="font-semibold text-gray-900 dark:text-white">@{twin.twinHandle}</span>
                                                        {twin.verification.isVerified && (
                                                            <BadgeCheck className="w-4 h-4 text-blue-500" />
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{twin.personality}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">Owner: {twin.userId.substring(0, 4)}</div>
                                                </div>
                                            </div>
                                            <span className="flex items-center text-gray-900 dark:text-white font-semibold">
                                                <DollarSign className="h-4 w-4" />
                                                { typeof twin.price === 'string' ? parseFloat(twin.price).toFixed(2) : twin.price.toFixed(2)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{twin.description}</p>

                                        <div className="flex items-center justify-between mt-3 text-purple-300 max-w-md">
                                            <div className="flex items-center">
                                                <MessageCircle className="h-4 w-4 mr-1" />
                                                {twin.stats.repliesCount.toLocaleString()} replies
                                            </div>
                                            <div>
                                                {twin.stats.interactions.toLocaleString()} friends
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center text-gray-900 dark:text-white">
                                                    <TrendingUp className="w-4 h-4 mr-2" />
                                                    <span className="font-medium">Investment History</span>
                                                </div>
                                            </div>
                                            <PriceChart
                                                twinId={twin.twinId}
                                                shareholders={twin.tokenShares.shareholders}
                                                pricePerShare={twin.tokenShares.pricePerShare}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <PieChart className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Token Shares</span>
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {twin.tokenShares.availableShares} / {twin.tokenShares.totalShares} available
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Price per share:</span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    ${typeof twin.tokenShares.pricePerShare === 'number' ? twin.tokenShares.pricePerShare.toFixed(4) : Number(twin.tokenShares.pricePerShare).toFixed(4)}
                                                </span>
                                            </div>
                                            {userSharesCount > 0 && (
                                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Your shares:</span>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {userSharesCount} shares (${userValue.toFixed(2)})
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {!twin.verification.isVerified && userValue >= VERIFICATION_FEE && (
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => handleVerification(twin.twinId)}
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                                >
                                                    <BadgeCheck className="w-4 h-4" />
                                                    <span>Verify Twin</span>
                                                </button>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                                                    Requires ${VERIFICATION_FEE} worth of shares
                                                </p>
                                            </div>
                                        )}

                                        {verificationError && selectedTwin === twin.twinId && (
                                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md flex items-start space-x-2">
                                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-red-600 dark:text-red-400">{verificationError}</p>
                                            </div>
                                        )}

                                        {selectedTwin === twin.twinId ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={isSellingShares ? userSharesCount : twin.tokenShares.availableShares}
                                                        value={sharesToBuy}
                                                        onChange={(e) => {
                                                            const max = isSellingShares ? userSharesCount : twin.tokenShares.availableShares;
                                                            setSharesToBuy(Math.min(parseInt(e.target.value) || 0, max));
                                                        }}
                                                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                        placeholder="Number of shares"
                                                    />
                                                    <button
                                                        onClick={() => isSellingShares ? handleSellShares(twin.twinId) : handleBuyShares(twin.twinId)}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                                                    >
                                                        {isSellingShares ? (
                                                            <>
                                                                <ArrowUpToLine className="w-4 h-4 mr-2" />
                                                                Sell
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ArrowDownToLine className="w-4 h-4 mr-2" />
                                                                Buy
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                {userSharesCount > 0 && (
                                                    <button
                                                        onClick={() => setIsSellingShares(!isSellingShares)}
                                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        {isSellingShares ? 'Switch to Buy' : 'Switch to Sell'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedTwin(null);
                                                        setIsSellingShares(false);
                                                        setVerificationError(null);
                                                    }}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedTwin(twin.twinId);
                                                        setIsSellingShares(false);
                                                    }}
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                                >
                                                    <span>Buy Shares</span>
                                                    <ArrowDownToLine className="w-4 h-4" />
                                                </button>
                                                {userSharesCount > 0 && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedTwin(twin.twinId);
                                                            setIsSellingShares(true);
                                                        }}
                                                        className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 flex items-center justify-center space-x-2"
                                                    >
                                                        <span>Sell Shares</span>
                                                        <ArrowUpToLine className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {twin.tokenShares.shareholders.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Shareholders</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {twin.tokenShares.shareholders.length} investors own shares
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {successMessage && (
                <SuccessModal message={successMessage} onClose={closeSuccessModal} />
            )}
        </div>
    );
}