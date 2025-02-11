// path: src/types/types.tsx

export type UserIdType = string;
export type TwinIdType = string;
export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55+';
export type InteractionGroup = 'likes' | 'retwineets' | 'replies' | 'quotes';
export type NotificationGroup = 'create' | 'buy' | 'sell';
export type PlatformType = 'mobile' | 'desktop' | 'tablet';
export type TransactionGroup = 'buy' | 'sell';
export type FetchedTweetsMultiType = FetchedTweetType[];
export type TwineetsMultiType = TwineetType[];


export interface AnalyticsType {
    twinId: TwinIdType;
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

export interface FollowersType {
    twinId: TwinIdType;
    followers: UserIdType[];
}

export interface FollowingType {
    userId: UserIdType;
    following: TwinIdType[];
}


export interface TwinType {
    id?: string;
    userId: UserIdType;
    twinId: TwinIdType;
    autoReply: boolean;
    timestamp: Date;
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
    stats: TwinStatsType;
    tokenShares: TokenShareType;
    tokenStats: TokenStatsType;
    twineets: TwineetType[];
    verification: VerificationResponseType;
    transactions: TransactionType[];
    followers?: FollowersType;
}
export interface TwinStatsType {
    twinId: TwinIdType;
    interactions: number;
    repliesCount: number;
    uptime: string;
} 

export interface CryptoHoldingType {
    twinId: TwinIdType;
    amount: number;
    symbol: string;
    value: number;
    change24h: number;
}

export interface DailyImpressionsType {
    twinId: TwinIdType;
    count: number;
    date: Date;
}

export interface DemographicsType {
    twinId: TwinIdType;
    age: string;
    percentage: number;
}
export interface storeType {
    // State Variables
    stateAllTwins: TwinType[];
    stateCurrentUserData: UserType | null;
    stateCurrentUserId: UserIdType | null;
    stateCurrentUserTwins: TwinType[];
    stateFetchedTweets: FetchedTweetType[];
    stateGeneratedTwineetContent: string;
    stateNotification: NotificationType | null;
    stateTransactions: TransactionType[];
    stateTwinAdded: boolean;

    // Setters
    setCurrentUserData: (userData: UserType) => void;
    setNotification: (notification: NotificationType | null) => void;
    setCurrentUserTwins: (userTwins: TwinType[]) => void;
    setFetchedTweets: (fetchedTweets: FetchedTweetType[]) => void;
    setTwinAdded: (twinAdded: boolean) => void;
    setTransactions: (transactions: TransactionType[]) => void;
    setGeneratedTwineetContent: (generatedTwineetContent: string) => void;

    // Getters
    getAllTwins: () => Promise<TwinType[]>;
    getBuyShares: (twinId: string, currentUserId: string, sharesToBuy: number) => Promise<void>;
    getCreateTwin: (twin: TwinType) => Promise<string>; 
    getCurrentUser: () => Promise<UserType>;
    getGeneratedTwineetContent: (tweets: FetchedTweetType[], personality: string) => Promise<{ generatedText: string }>; 
    getLogin: (username: string, password: string) => Promise<void>;
    getLogout: () => Promise<void>;
    getNewTwinId: () => string;
    getNewUserId: () => string;
    getSellShares: (twinId: string, shares: number) => Promise<void>;
    getTransactionsUserHistory: (userId: string) => Promise<TransactionType[]>;
    getTransactionTwinHistory: (twinId: string) => Promise<TransactionType[]>;
    getTweets: (username: string) => Promise<FetchedTweetType[]>;
    getUpdateAnalytics: (twinId: string) => Promise<AnalyticsType>;
    getUserShares: (userId: string) => Promise<UserTokenShareType[]>;
    getUserSharesOfATwin: (twinId: string) => number;
    getVerifyTwin: (twinId: string) => Promise<boolean>; 
}

export interface NotificationType {
    twinId: TwinIdType;
    kind: NotificationGroup;
    message: string;
    twitterHandle: string;
    twinHandle: string;
    timestamp: Date;
}

export interface PeakHoursType {
    twinId: TwinIdType;
    engagement: number;
    hour: number;
}

export interface TokenStatsType {
    twinId: TwinIdType;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
}

export interface TokenShareType {
    twinId: TwinIdType;
    totalShares: number;
    availableShares: number;
    pricePerShare: number;
    shareholders: UserTokenShareType[];
};

export interface TopInteractionsType {
    twinId: TwinIdType;
    kind: InteractionGroup;
    count: number;
}

export interface UserTokenShareType {
    twinId: TwinIdType;
    userId: string;
    shares: number;
    purchasePrice: number;
    purchaseDate: Date;
}
export interface TransactionType {
    twinId: TwinIdType;
    trade: TransactionGroup;
    shares: number;
    pricePerShare: number;
    totalAmount: number;
    timestamp: Date;
}

export interface FetchedTweetType {
    twinId: TwinIdType;
    text: string;
    edit_history_tweet_ids: string[];
    timestamp: Date;
}

export interface ReachByPlatformType {
    twinId: TwinIdType;
    platform: PlatformType;
    count: number;
}

export interface TwineetType {   
    id?: string; // Optional because the ID is generated by EdgeDB       
    twinId: TwinIdType;
    userId: UserIdType;
    content: string;
    timestamp: Date;
    likesCount: number;
    retwineetsCount: number;
    repliesCount: number;
    isLiked: boolean;
    isRetwineeted: boolean;
}

export interface LikesType {
    twinId: TwinIdType;
    userId: UserIdType;
}

export interface RetwineetsType {
    twinId: TwinIdType;
    userId: UserIdType;
}

export interface RepliesType {
    content: string;
    timestamp: Date;
    twinId: TwinIdType;
    userId: UserIdType;
}
export interface UserType {
    userId: UserIdType;
    username: string;
    email: string;
    passwordHash: string;
    birthday?: Date;
    walletBalance?: number;
    walletAddress?: string;
    twins?: TwinType[];
    transactions?: TransactionType[];
    notifications?: NotificationType[];
    tokenShares?: TokenShareType[];
    userTokenShares?: UserTokenShareType[];
    tokenStats?: TokenStatsType[];
    timestamp: Date;
    likes?: LikesType[];  
    retwineets?: RetwineetsType[];
    replies?: RepliesType[];
    following?: FollowingType;
}

export interface PageProps extends UserType {
    userData: UserType; // Ensuring userData is correctly defined
}

export interface VerificationResponseType {
    twinId: TwinIdType;
    isVerified: boolean;
    verificationDate: Date;
    error?: string;
}

// PROPS 

export interface AnalyticsPropsType {
    twinId: TwinIdType;
    analytics: AnalyticsType;
}


export interface NotificationBarPropsType {
    twinId: TwinIdType;
    notification: NotificationGroup | null;
    onClose: () => void;
}


export interface TradeModalPropsType {
    twinId: TwinIdType;
    twinHandle: string;
    currentShares: number;
    availableShares: number;
    pricePerShare: number;
    isSelling: boolean;
    onClose: () => void;
}


export interface PriceChartPropsType {
    twinId: TwinIdType;
    shareholders: UserTokenShareType[];
    pricePerShare: number;
}

export interface SharePriceChartPropsType {
    twinId: TwinIdType;
    shareholders: UserTokenShareType[];
    pricePerShare: number;
    isExpanded: boolean;
}

export interface TradingChartPropsType {
    twinId: TwinIdType;
    transactions: TransactionType[];
    pricePerShare: number;
}

export interface ThemeStoreType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
