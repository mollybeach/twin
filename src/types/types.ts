// path: src/types/types.tsx


export interface AnalyticsType {
    agentId: string;
    clickThroughRate: number;
    engagementRate: number;
    impressions: number;
    cryptoHoldings: CryptoHoldingType[];
    demographics: DemographicsType[];
    dailyImpressions: DailyImpressionsType[];
    peakHours: PeakHoursType[];
    reachByPlatform: ReachByPlatformType[];
    topInteractions: TopInteractionsType[];
}

export interface AgentType {
    agentId: string;
    autoReply: boolean;
    createdAt: Date;
    description: string;
    personality: string;
    price: number;
    profileImage: string;
    isListed: boolean;
    twinHandle: string;
    twitterHandle: string;
    analytics: AnalyticsType;
    fetchedTweets: FetchedTweetType[];
    modelData: Record<string, unknown>;
    stats: AgentStatsType;
    tokenShares: TokenShareType;
    tokenStats: TokenStatsType;
    twineets: TwineetType[];
    verification: VerificationResponseType;
    transaction: TransactionType[];
}

export interface AgentStatsType {
    agentId: string;
    interactions: number;
    replies: number;
    uptime: string;
} 

export interface CryptoHoldingType {
    agentId: string;
    amount: number;
    symbol: string;
    value: number;
    change24h: number;
}

export interface DailyImpressionsType {
    agentId: string;
    count: number;
    date: string;
}

export interface DemographicsType {
    agentId: string;
    age: string;
    percentage: number;
}

export interface MarketplaceStoreType {
    agents: AgentType[];
    transactions: TransactionType[];
    notification: NotificationType | null;
    setNotification: (notification: NotificationType | null) => void;
    addAgent: (agent: AgentType) => Promise<string>;
    buyShares: (agentId: string, shares: number) => Promise<void>;
    sellShares: (agentId: string, shares: number) => Promise<void>;
    verifyAgent: (agentId: string) => Promise<boolean>;
    getUserShares: (agentId: string) => number;
    getAgents: () => AgentType[];
    updateAnalytics: (agentId: string) => void;
    getTransactionHistory: (agentId?: string) => TransactionType[];
}

export interface NotificationType {
    agentId: string;
    kind: 'create' | 'buy' | 'sell';
    message: string;
    twitterHandle: string;
    twinHandle: string;
    timestamp: number;
}

export interface PeakHoursType {
    agentId: string;
    engagement: number;
    hour: number;
}

export interface TokenStatsType {
    agentId: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
}

export interface TokenShareType {
    agentId: string;
    totalShares: number;
    availableShares: number;
    pricePerShare: number;
    shareholders: UserTokenShareType[];
};

export interface TopInteractionsType {
    agentId: string;
    kind: string;
    count: number;
}

export interface UserTokenShareType {
    agentId: string;
    userId: string;
    shares: number;
    purchasePrice: number;
    purchaseDate: string;
}
export interface TransactionType {
    agentId: string;
    kind: 'buy' | 'sell';
    shares: number;
    pricePerShare: number;
    totalAmount: number;
    timestamp: string;
}

export interface FetchedTweetType {
    agentId: string;
    text: string;
    edit_history_tweet_ids: string[];
    timestamp: string;
}

export interface ReachByPlatformType {
    agentId: string;
    platform: string;
    count: number;
}

export interface TwineetType {   
    id?: string; // Optional because the ID is generated by EdgeDB       
    agentId: string;
    content: string;
    timestamp: Date;
    likes: number;
    retwineets: number;
    replies: number;
    isLiked: boolean;
    isRetwineeted: boolean;
}

export interface VerificationResponseType {
    agentId: string;
    isVerified: boolean;
    verificationDate: Date;
    error?: string;
}

// PROPS 

export interface AnalyticsPropsType {
    agentId: string;
    analytics: AnalyticsType;
}


export interface NotificationBarPropsType {
    agentId: string;
    notification: NotificationType | null;
    onClose: () => void;
}


export interface TradeModalPropsType {
    agentId: string;
    twinHandle: string;
    currentShares: number;
    availableShares: number;
    pricePerShare: number;
    isSelling: boolean;
    onClose: () => void;
}


export interface PriceChartPropsType {
    agentId: string;
    shareholders: UserTokenShareType[];
    pricePerShare: number;
}

export interface SharePriceChartPropsType {
    agentId: string;
    shareholders: UserTokenShareType[];
    pricePerShare: number;
    isExpanded: boolean;
}

export interface TradingChartPropsType {
    agentId: string;
    transactions: TransactionType[];
    pricePerShare: number;
}

export interface ThemeStoreType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
