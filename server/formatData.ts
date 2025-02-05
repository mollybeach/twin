// path: server/formatData.ts

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
} from '../app/types/types';

export function formatAgent(agent: AgentType): AgentType {
    return {
        agentId: agent.agentId,
        twinHandle: agent.twinHandle,
        twitterHandle: agent.twitterHandle,
        profileImage: agent.profileImage,
        personality: agent.personality,
        description: agent.description,
        autoReply: agent.autoReply,
        isListed: agent.isListed,
        modelData: agent.modelData,
        price: parseFloat(agent.price.toString()), // Ensure price is a number
        createdAt: new Date(agent.createdAt),
        analytics: formatAnalytics(agent.analytics),
        fetchedTweets: agent.fetchedTweets?.map(formatFetchedTweet) || [],
        twineets: agent.twineets?.map(formatTwineet) || [],
        verification: formatVerification(agent.verification),
        stats: formatAgentStats(agent.stats),
        tokenShares: formatTokenShare(agent.tokenShares),
        tokenStats: formatTokenStats(agent.tokenStats),
        transactions: agent.transactions?.map(formatTransaction) || [],
    };
}
export function formatUserTokenShare(share: UserTokenShareType) {
    try {
        const purchaseDate = new Date(share.purchaseDate);
        if (isNaN(purchaseDate.getTime())) {
            console.error('Invalid purchase date for user token share:', share.purchaseDate);
            throw new Error('Invalid purchase date for user token share');
        }
        return {
            agentId: share.agentId,
            userId: share.userId,
            shares: parseFloat(share.shares.toString()),
            purchasePrice: parseFloat(share.purchasePrice.toString()),
            purchaseDate: purchaseDate, // Use the validated purchase date
        };
    } catch (error) {
        console.error('Error formatting user token share:', error);
        throw error; // Rethrow the error after logging
    }
}

// Function to format TokenShare
export function formatTokenShare(tokenShare: TokenShareType) {
    return {
        agentId: tokenShare.agentId,
        totalShares: tokenShare.totalShares,
        availableShares: tokenShare.availableShares,
        pricePerShare: parseFloat(tokenShare.pricePerShare.toString()),
        shareholders: tokenShare?.shareholders?.map(formatUserTokenShare) || [],
    };
}
export function formatCryptoHolding(cryptoHolding: CryptoHoldingType) {
    return {
        agentId: cryptoHolding.agentId,
        amount: parseFloat(cryptoHolding.amount.toString()), // Ensure this is a number
        symbol: cryptoHolding.symbol,
        change24h: parseFloat(cryptoHolding.change24h.toString()), // Ensure this is a number
        value: parseFloat(cryptoHolding.value.toString()), // Ensure this is a number
    };
}

// Function to format Analytics
export function formatAnalytics(analytics: AnalyticsType) {
    return {
        agentId: analytics.agentId,
        clickThroughRate: parseFloat(analytics.clickThroughRate.toString()), // Ensure this is a number
        engagementRate: parseFloat(analytics.engagementRate.toString()), // Ensure this is a number
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
export function formatAgentStats(stats: AgentStatsType) {
    return {
        agentId: stats.agentId,
        replies: stats.replies,
        interactions: stats.interactions,
        uptime: stats.uptime,
    };
}

// Function to format TokenStats
export function formatTokenStats(tokenStats: TokenStatsType) {
    return {
        agentId: tokenStats.agentId,
        price: parseFloat(tokenStats.price.toString()), // Ensure this is a number
        change24h: parseFloat(tokenStats.change24h.toString()), // Ensure this is a number
        volume24h: parseFloat(tokenStats.volume24h.toString()), // Ensure this is a number
        marketCap: parseFloat(tokenStats.marketCap.toString()), // Ensure this is a number
    };
}

// Function to format Demographics
export function formatDemographics(demographics: DemographicsType) {
    return {
        agentId: demographics.agentId,
        age: demographics.age,
        percentage: parseFloat(demographics.percentage.toString()), // Ensure this is a number
    };
}

// Function to format DailyImpressions
export function formatDailyImpressions(dailyImpression: DailyImpressionsType) {
    try {
        const date = new Date(dailyImpression.date);
        if (isNaN(date.getTime())) {
            console.error('Invalid date for daily impressions:', dailyImpression.date);
            throw new Error('Invalid date for daily impressions');
        }
        return {
            agentId: dailyImpression.agentId,
            count: dailyImpression.count,
            date: date, // Use the validated date
        };
    } catch (error) {
        console.error('Error formatting daily impressions:', error);
        throw error; // Rethrow the error after logging
    }
}

// Function to format PeakHours
export function formatPeakHours(peakHours: PeakHoursType) {
    return {
        agentId: peakHours.agentId,
        hour: parseInt(peakHours.hour.toString()), // Ensure this is a number
        engagement: parseFloat(peakHours.engagement.toString()), // Ensure this is a number
    };
}

// Function to format ReachByPlatform
export function formatReachByPlatform(reach: ReachByPlatformType) {
    return {
        agentId: reach.agentId,
        platform: reach.platform,
        count: parseInt(reach.count.toString()), // Ensure this is a number
    };
}

// Function to format TopInteractions
export function formatTopInteractions(interactions: TopInteractionsType) {
    return {
        agentId: interactions.agentId,
        kind: interactions.kind,
        count: parseInt(interactions.count.toString()), // Ensure this is a number
    };
}

// Function to format FetchedTweet
export function formatFetchedTweet(tweet: FetchedTweetType) {
    try {
        const timestamp = new Date(tweet.timestamp);
        if (isNaN(timestamp.getTime())) {
            console.error('Invalid timestamp for tweet:', tweet.timestamp);
            throw new Error('Invalid timestamp for tweet');
        }
        return {
            agentId: tweet.agentId,
            text: tweet.text,
            edit_history_tweet_ids: tweet.edit_history_tweet_ids,
            timestamp: timestamp, // Use the validated timestamp
        };
    } catch (error) {
        console.error('Error formatting fetched tweet:', error);
        throw error; // Rethrow the error after logging
    }
}
// Function to format Twineet
export function formatTwineet(twineet: TwineetType) {
    try {
        const timestamp = new Date(twineet.timestamp);
        if (isNaN(timestamp.getTime())) {
            console.error('Invalid timestamp for twineet:', twineet.timestamp);
            throw new Error('Invalid timestamp for twineet');
        }
        return {
            agentId: twineet.agentId,
            content: twineet.content,
            timestamp: timestamp, // Use the validated timestamp
            likes: twineet.likes,
            retwineets: twineet.retwineets,
            replies: twineet.replies,
            isLiked: twineet.isLiked,
            isRetwineeted: twineet.isRetwineeted,
        };
    } catch (error) {
        console.error('Error formatting twineet:', error);
        throw error; // Rethrow the error after logging
    }
}
// Function to format Verification
export function formatVerification(verification: VerificationResponseType) {
    return {
        agentId: verification.agentId,
        isVerified: verification.isVerified,
        verificationDate: verification.verificationDate
    };
}

// Function to format Transaction
export function formatTransaction(transaction: TransactionType) {
    try {
        const timestamp = new Date(transaction.timestamp);
        if (isNaN(timestamp.getTime())) {
            console.error('Invalid timestamp for transaction:', transaction.timestamp);
            throw new Error('Invalid timestamp for transaction');
        }
        return {
            agentId: transaction.agentId,
            kind: transaction.kind,
            shares: transaction.shares,
            pricePerShare: parseFloat(transaction.pricePerShare.toString()),
            totalAmount: parseFloat(transaction.totalAmount.toString()),
            timestamp: timestamp, // Use the validated timestamp
        };
    } catch (error) {
        console.error('Error formatting transaction:', error);
        throw error; // Rethrow the error after logging
    }
}

export function formatAgentData(agentData: AgentType) {
    return {
        agent : formatAgent(agentData),
        analytics : formatAnalytics(agentData.analytics),
        cryptoHoldings : agentData.analytics.cryptoHoldings.map(formatCryptoHolding),
        demographics : agentData.analytics.demographics.map(formatDemographics),
        dailyImpressions : agentData.analytics.dailyImpressions.map(formatDailyImpressions),
        peakHours : agentData.analytics.peakHours.map(formatPeakHours),
        reachByPlatform : agentData.analytics.reachByPlatform.map(formatReachByPlatform),
        topInteractions : agentData.analytics.topInteractions.map(formatTopInteractions),
        fetchedTweets : agentData.fetchedTweets.map(formatFetchedTweet),
        stats : formatAgentStats(agentData.stats),
        twineets : agentData.twineets.map(formatTwineet),
        transactions : agentData.transactions.map(formatTransaction),
        tokenShares : formatTokenShare(agentData.tokenShares),
        tokenStats : formatTokenStats(agentData.tokenStats),
        userTokenShares : agentData.tokenShares.shareholders.map(formatUserTokenShare),
        verification : formatVerification(agentData.verification),

    };
}