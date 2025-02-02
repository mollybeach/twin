// path: src/utils/formatData.ts

import edgeql from '../../dbschema/edgeql-js';
import {
    UserTokenShareType,
    TokenShareType,
    AgentType,
    AnalyticsType,
    FetchedTweetType,
    TwineetType,
    VerificationResponseType,
    AgentStatsType,
    TokenStatsType,
    CryptoHoldingType,
    DailyImpressionsType,
    DemographicsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
    TransactionType,
} from '../types/types';

// Function to format UserTokenShare
function formatUserTokenShare(share: UserTokenShareType) {
    return {
        agentId: share.agentId,
        userId: share.userId,
        shares: edgeql.cast(edgeql.decimal, share.shares),
        purchasePrice: edgeql.cast(edgeql.decimal, share.purchasePrice),
        purchaseDate: new Date(share.purchaseDate), // Ensure this is a Date object
    };
}

// Function to format TokenShare
function formatTokenShare(tokenShare: TokenShareType) {
    return {
        agentId: tokenShare.agentId,
        totalShares: tokenShare.totalShares,
        availableShares: tokenShare.availableShares,
        pricePerShare: edgeql.cast(edgeql.decimal, tokenShare.pricePerShare),
        shareholders: tokenShare.shareholders.map(formatUserTokenShare), // Ensure this is an array
    };
}
// Function to format Agent
function formatAgent(agent: AgentType) {
    return {
        agentId: agent.agentId,
        twinHandle: agent.twinHandle,
        twitterHandle: agent.twitterHandle,
        profileImage: agent.profileImage,
        personality: agent.personality,
        description: agent.description,
        autoReply: agent.autoReply,
        isListed: agent.isListed,
        price: edgeql.cast(edgeql.decimal, agent.price),
        createdAt: new Date(agent.createdAt),
        analytics: formatAnalytics(agent.analytics),
        fetchedTweets: agent.fetchedTweets?.map(formatFetchedTweet) || [],
        twineets: agent.twineets?.map(formatTwineet) || [],
        verification: formatVerification(agent.verification),
        stats: formatAgentStats(agent.stats),
        tokenShares: formatTokenShare(agent.tokenShares),
        tokenStats: formatTokenStats(agent.tokenStats),
        transaction: agent.transaction?.map(formatTransaction) || [],
    };
}

function formatCryptoHolding(cryptoHolding: CryptoHoldingType) {
    return {
        agentId: cryptoHolding.agentId,
        amount: edgeql.cast(edgeql.decimal, cryptoHolding.amount),
        symbol: cryptoHolding.symbol,
        change24h: edgeql.cast(edgeql.decimal, cryptoHolding.change24h), // Ensure this is included
        value: edgeql.cast(edgeql.decimal, cryptoHolding.value), // Ensure this is included
    };
}

// Function to format Analytics
function formatAnalytics(analytics: AnalyticsType) {
    return {
        agentId: analytics.agentId,
        clickThroughRate: analytics.clickThroughRate, // Ensure this is a number
        engagementRate: analytics.engagementRate, // Ensure this is a number
        impressions: analytics.impressions,
        cryptoHoldings: analytics.cryptoHoldings.map(formatCryptoHolding),
        demographics: analytics.demographics.map(formatDemographics),
        dailyImpressions: analytics.dailyImpressions.map(formatDailyImpressions),
        peakHours: analytics.peakHours.map(formatPeakHours),
        reachByPlatform: analytics.reachByPlatform.map(formatReachByPlatform),
        topInteractions: analytics.topInteractions.map(formatTopInteractions),
    };
}

// Function to format AgentStats
function formatAgentStats(stats: AgentStatsType) {
    return {
        agentId: stats.agentId,
        replies: stats.replies,
        interactions: stats.interactions,
        uptime: stats.uptime,
    };
}

// Function to format TokenStats
function formatTokenStats(tokenStats: TokenStatsType) {
    return {
        agentId: tokenStats.agentId,
        price: edgeql.cast(edgeql.decimal, tokenStats.price),
        change24h: edgeql.cast(edgeql.decimal, tokenStats.change24h),
        volume24h: edgeql.cast(edgeql.decimal, tokenStats.volume24h),
        marketCap: edgeql.cast(edgeql.decimal, tokenStats.marketCap),
    };
}

// Function to format Demographics
function formatDemographics(demographics: DemographicsType) {
    return {
        agentId: demographics.agentId,
        age: demographics.age,
        percentage: edgeql.cast(edgeql.decimal, demographics.percentage),
    };
}

// Function to format DailyImpressions
function formatDailyImpressions(dailyImpressions: DailyImpressionsType) {
    return {
        agentId: dailyImpressions.agentId,
        date: dailyImpressions.date,
        count: dailyImpressions.count,
    };
}

// Function to format PeakHours
function formatPeakHours(peakHours: PeakHoursType) {
    return {
        agentId: peakHours.agentId,
        hour: peakHours.hour,
        engagement: edgeql.cast(edgeql.decimal, peakHours.engagement),
    };
}

// Function to format ReachByPlatform
function formatReachByPlatform(reach: ReachByPlatformType) {
    return {
        agentId: reach.agentId,
        platform: reach.platform,
        count: reach.count,
    };
}

// Function to format TopInteractions
function formatTopInteractions(interactions: TopInteractionsType) {
    return {
        agentId: interactions.agentId,
        kind: interactions.kind,
        count: interactions.count,
    };
}

// Function to format FetchedTweet
function formatFetchedTweet(tweet: FetchedTweetType) {
    return {
        agentId: tweet.agentId,
        text: tweet.text,
        edit_history_tweet_ids: tweet.edit_history_tweet_ids,
        timestamp: new Date(tweet.timestamp), // Ensure this is a Date object
    };
}
// Function to format Twineet
function formatTwineet(twineet: TwineetType) {
    return {
        agentId: twineet.agentId,
        content: twineet.content,
        timestamp: new Date(twineet.timestamp), // Ensure this is a Date object
        likes: twineet.likes,
        retwineets: twineet.retwineets,
        replies: twineet.replies,
        isLiked: twineet.isLiked,
        isRetwineeted: twineet.isRetwineeted,
    };
}
// Function to format Verification
function formatVerification(verification: VerificationResponseType) {
    return {
        agentId: verification.agentId,
        isVerified: verification.isVerified,
        verificationDate: new Date(verification.verificationDate),
    };
}

// Function to format Transaction
function formatTransaction(transaction: TransactionType) {
    return {
        agentId: transaction.agentId,
        kind: transaction.kind,
        shares: transaction.shares,
        pricePerShare: edgeql.cast(edgeql.decimal, transaction.pricePerShare),
        totalAmount: edgeql.cast(edgeql.decimal, transaction.totalAmount),
        timestamp: new Date(transaction.timestamp), // Ensure this is a Date object
    };
}

// Default values for various types
function defaultUserTokenShare(): UserTokenShareType {
    return {
        agentId: '0x0000000000000000000000000000000000000000',
        userId: 'default',
        shares: 0,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString(),
    };
}

// Exporting the formatting functions
export {
    formatUserTokenShare,
    formatTokenShare,
    formatAgent,
    formatAnalytics,
    formatAgentStats,
    formatTokenStats,
    formatCryptoHolding,
    formatDemographics,
    formatDailyImpressions,
    formatPeakHours,
    formatReachByPlatform,
    formatTopInteractions,
    formatFetchedTweet,
    formatTwineet,
    formatVerification,
    formatTransaction,
    defaultUserTokenShare,
};