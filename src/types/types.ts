// path: src/types/types.tsx

export interface AnalyticsType {
    impressions: number;
    engagementRate: number;
    clickThroughRate: number;
    dailyImpressions: { date: string; count: number }[];
    topInteractions: { type: string; count: number }[];
    reachByPlatform: { platform: string; count: number }[];
    demographics: { age: string; percentage: number }[];
    peakHours: { hour: number; engagement: number }[];
    cryptoHoldings: {
        symbol: string;
        amount: number;
        value: number;
        change24h: number;
    }[];
}

export interface AgentType {
    id: string;
    createdAt: Date;
    twitterHandle: string;
    twinHandle: string;
    personality: string;
    description: string;
    price: number;
    profileImage: string;
    stats: AgentStatsType;
    tokenShares: {
        totalShares: number;
        availableShares: number;
        pricePerShare: number;
        shareholders: TokenShareType[];
    };
    verification: {
        isVerified: boolean;
        verificationDate?: string;
    };
    analytics: AnalyticsType;
    modelData?: Record<string, unknown>;
    fetchedTweets?: FetchedTweetsType[];
    twineets?: TwineetType[];
}

export interface AgentStatsType {
    replies: number;
    interactions: number;
    uptime: string;
} 

export interface AgentConfigType {
    agentId: string;
    twitterHandle: string;
    twinHandle: string;
    personality: string;
    description: string;
    autoReply: boolean;
    price: number;
    isListed: boolean;
    profileImage: string;
    modelData?: Record<string, unknown>;
    fetchedTweets?: FetchedTweetsType[];
    twineets: TwineetType[];
    stats: AgentStatsType;
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
    id: string;
    type: 'create' | 'buy' | 'sell';
    message: string;
    twitterHandle: string;
    twinHandle: string;
    timestamp: number;
}

export interface TokenShareType {
    userId: string;
    shares: number;
    purchasePrice: number;
    purchaseDate: string;
}

export interface TokenStatsType {
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
}

export interface TransactionType {
    id: string;
    agentId: string;
    type: 'buy' | 'sell';
    shares: number;
    pricePerShare: number;
    totalAmount: number;
    timestamp: string;
}

export interface FetchedTweetsType {
    id: string;
    text: string;
    edit_history_tweet_ids: string[];
}

export interface TwineetType {
    id: string;             
    agentId: string;
    content: string;
    timestamp: string;
    likes: number;
    retwineets: number;
    replies: number;
    isLiked: boolean;
    isRetwineeted: boolean;
}

export interface VerificationResponseType {
    verified: boolean;
    error?: string;
}

// PROPS 

export interface AnalyticsPropsType {
    analytics: AnalyticsType;
    agentId: string;
}


export interface NotificationBarPropsType {
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
    shareholders: TokenShareType[];
    pricePerShare: number;
}

export interface SharePriceChartPropsType {
    shareholders: TokenShareType[];
    pricePerShare: number;
    isExpanded: boolean;
}

export interface TradingChartPropsType {
    transactions: TransactionType[];
    pricePerShare: number;
}

export interface ThemeStoreType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

