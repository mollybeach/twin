// path: server/formatData.ts

import {
    UserTokenShareType,
    TokenShareType,
    TwinType,
    AnalyticsType,
    FetchedTweetType,
    TwineetType,
    VerificationResponseType,
    TwinStatsType,
    TokenStatsType,
    CryptoHoldingType,
    DailyImpressionsType,
    DemographicsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
    TransactionType,
} from '../types/types';

export function formatUserTokenShare(share: UserTokenShareType) {
    return {
        twinId: share.twinId,
        userId: share.userId,
        shares: parseFloat(share.shares.toString()),
        purchasePrice: parseFloat(share.purchasePrice.toString()),
        purchaseDate: share.purchaseDate,
    };
}

export function formatTokenShare(tokenShare: TokenShareType) {
    return {
        twinId: tokenShare.twinId,
        totalShares: tokenShare.totalShares,
        availableShares: tokenShare.availableShares,
        pricePerShare: parseFloat(tokenShare.pricePerShare.toString()),
        shareholders: tokenShare?.shareholders?.map(formatUserTokenShare) || [],
    };
}

export function formatTwin(twin: TwinType) {
    return {
        twinId: twin.twinId,
        twinHandle: twin.twinHandle,
        twitterHandle: twin.twitterHandle,
        profileImage: twin.profileImage,
        personality: twin.personality,
        description: twin.description,
        autoReply: twin.autoReply,
        isListed: twin.isListed,
        price: parseFloat(twin.price.toString()),
        modelData: twin.modelData, 
        timestamp: new Date(twin.timestamp),
        analytics: formatAnalytics(twin.analytics),
        fetchedTweets: twin.fetchedTweets?.map(formatFetchedTweet) || [],
        twineets: twin.twineets?.map(formatTwineet) || [],
        verification: formatVerification(twin.verification),
        stats: formatTwinStats(twin.stats),
        tokenShares: formatTokenShare(twin.tokenShares),
        tokenStats: formatTokenStats(twin.tokenStats),
        transactions: twin.transactions?.map(formatTransaction) || [],
    };
}

export function formatCryptoHolding(cryptoHolding: CryptoHoldingType) {
    return {
        twinId: cryptoHolding.twinId,
        amount: parseFloat(cryptoHolding.amount.toString()), 
        symbol: cryptoHolding.symbol,
        change24h: parseFloat(cryptoHolding.change24h.toString()), 
        value: parseFloat(cryptoHolding.value.toString())
    };
}

export function formatAnalytics(analytics: AnalyticsType) {
    return {
        twinId: analytics.twinId,
        clickThroughRate: parseFloat(analytics.clickThroughRate.toString()),
        engagementRate: parseFloat(analytics.engagementRate.toString()), 
        impressions: analytics.impressions,
        cryptoHoldings: analytics.cryptoHoldings.map(formatCryptoHolding),
        demographics: analytics.demographics.map(formatDemographics),
        dailyImpressions: analytics.dailyImpressions.map(formatDailyImpressions),
        peakHours: analytics.peakHours.map(formatPeakHours),
        reachByPlatform: analytics.reachByPlatform.map(formatReachByPlatform),
        topInteractions: analytics.topInteractions.map(formatTopInteractions),
    };
}

export function formatTwinStats(stats: TwinStatsType) {
    return {
        twinId: stats.twinId,
        repliesCount: stats.repliesCount,
        interactions: stats.interactions,
        uptime: stats.uptime,
    };
}

export function formatTokenStats(tokenStats: TokenStatsType) {
    return {
        twinId: tokenStats.twinId,
        price: parseFloat(tokenStats.price.toString()), 
        change24h: parseFloat(tokenStats.change24h.toString()), 
        volume24h: parseFloat(tokenStats.volume24h.toString()), 
        marketCap: parseFloat(tokenStats.marketCap.toString()), 
    };
}

export function formatDemographics(demographics: DemographicsType) {
    return {
        twinId: demographics.twinId,
        age: demographics.age,
        percentage: parseFloat(demographics.percentage.toString()), 
    };
}

export function formatDailyImpressions(dailyImpressions: DailyImpressionsType) {
    return {
        twinId: dailyImpressions.twinId,
        date: dailyImpressions.date,
        count: parseInt(dailyImpressions.count.toString()), 
    };
}

export function formatPeakHours(peakHours: PeakHoursType) {
    return {
        twinId: peakHours.twinId,
        hour: parseInt(peakHours.hour.toString()), 
        engagement: parseFloat(peakHours.engagement.toString()), 
    };
}

export function formatReachByPlatform(reach: ReachByPlatformType) {
    return {
        twinId: reach.twinId,
        platform: reach.platform,
        count: parseInt(reach.count.toString()), 
    };
}

export function formatTopInteractions(interactions: TopInteractionsType) {
    return {
        twinId: interactions.twinId,
        kind: interactions.kind,
        count: parseInt(interactions.count.toString()), 
    };
}

export function formatFetchedTweet(tweet: FetchedTweetType) {
    return {
        twinId: tweet.twinId,
        text: tweet.text,
        edit_history_tweet_ids: tweet.edit_history_tweet_ids,
        timestamp: new Date(tweet.timestamp), 
    };
}

export function formatTwineet(twineet: TwineetType) {
    return {
        twinId: twineet.twinId,
        content: twineet.content,
        timestamp: twineet.timestamp, 
        likesCount: twineet.likesCount,
        retwineetsCount: twineet.retwineetsCount,
        repliesCount: twineet.repliesCount,
        isLiked: twineet.isLiked,
        isRetwineeted: twineet.isRetwineeted,
    };
}

export function formatVerification(verification: VerificationResponseType) {
    return {
        twinId: verification.twinId,
        isVerified: verification.isVerified,
        verificationDate: verification.verificationDate,
    };
}

export function formatTransaction(transaction: TransactionType) {
    return {
        twinId: transaction.twinId,
        trade: transaction.trade,
        shares: transaction.shares,
        pricePerShare: transaction.pricePerShare,
        totalAmount: transaction.totalAmount,
        timestamp: transaction.timestamp, 
    };
}