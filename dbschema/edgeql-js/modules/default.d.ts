// dbschema/edgeql-js/modules/default.d.ts

import type { AgentType, TwineetType, FetchedTweetType, TransactionType, VerificationResponseType, UserTokenShareType, TokenStatsType, TokenShareType } from '@/dbschema/interfaces';

declare module '@/dbschema/edgeql-js/modules/default' {
    // Define the types for the EdgeQL module
    export type AgentIdType = string; 

    export type NotificationType = 'create' | 'buy' | 'sell';

    export type TransactionType = 'buy' | 'sell';

    export interface Agent {
        analytics: AnalyticsType;
        stats: AgentStatsType;
        tokenShares: TokenShareType;
        tokenStats: TokenStatsType;
        verification: VerificationResponseType;
        agentId: string;
        autoReply: boolean;
        createdAt: Date;
        description: string;
        isListed: boolean;
        modelData: unknown;
        personality: string;
        price: string;
        profileImage: string;
        twinHandle: string;
        twitterHandle: string;
        fetchedTweets: FetchedTweetType[];
        transactions: Transaction[];
        twineets: TwineetType[];
    }

    export interface AgentStats {
        agentId: string;
        interactions: number;
        replies: number;
        uptime: string;
    }

    export interface Analytics {
        cryptoHoldings: CryptoHoldingType;
        dailyImpressions: DailyImpressionsType;
        demographics: DemographicsType;
        peakHours: PeakHoursType;
        reachByPlatform: ReachByPlatformType;
        topInteractions: TopInteractionsType;
        agentId: string;
        clickThroughRate: string;
        engagementRate: string;
        impressions: number;
    }

    export interface CryptoHolding {
        agentId: string;
        amount: string;
        change24h: string;
        symbol: string;
        value: string;
    }

    export interface DailyImpressions {
        agentId: string;
        count: number;
        date: string;
    }

    export interface Demographics {
        age: string;
        agentId: string;
        percentage: string;
    }

    export interface FetchedTweet {
        agentId: string;
        edit_history_tweet_ids: string[];
        text: string;
        timestamp: Date;
    }

    export interface Notification {
        agentId: string;
        kind: NotificationType;
        message: string;
        timestamp: Date;
        twinHandle: string;
        twitterHandle: string;
    }

    export interface PeakHours {
        agentId: string;
        engagement: string;
        hour: number;
    }

    export interface ReachByPlatform {
        agentId: string;
        count: number;
        platform: string;
    }

    export interface TokenShare {
        agentId: string;
        availableShares: number;
        pricePerShare: string;
        totalShares: number;
        shareholders: UserTokenShareType[];
    }

    export interface TokenStats {
        agentId: string;
        change24h: string;
        marketCap: string;
        price: string;
        volume24h: string;
    }

    export interface TopInteractions {
        agentId: string;
        count: number;
        kind: string;
    }

    export interface Transaction {
        agentId: string;
        kind: TransactionType;
        pricePerShare: string;
        shares: number;
        timestamp: Date;
        totalAmount: string;
    }

    export interface Twineet {
        agentId: string;
        content: string;
        isLiked: boolean;
        isRetwineeted: boolean;
        likes: number;
        replies: number;
        retwineets: number;
        timestamp: Date;
    }

    export interface UserTokenShare {
        agentId: string;
        purchaseDate: Date;
        purchasePrice: string;
        userId: string;
        shares: string;
    }

    export interface Verification {
        agentId: string;
        isVerified: boolean;
        verificationDate: Date;
    }

    // Export the types for use in other modules
    export {
        AgentIdType,
        NotificationType,
        TransactionType,
        Agent,
        AgentStats,
        Analytics,
        CryptoHolding,
        DailyImpressions,
        Demographics,
        FetchedTweet,
        Notification,
        PeakHours,
        ReachByPlatform,
        TokenShare,
        TokenStats,
        TopInteractions,
        Transaction,
        Twineet,
        UserTokenShare,
        Verification,
    };
}