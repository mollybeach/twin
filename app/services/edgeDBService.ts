/*
import edgeql, { createClient } from '../../dbschema/edgeql-js'

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

import {
    TwinType,
    FetchedTweetType,
    TwineetType,
    TransactionType,
} from '../types/types';

import {
    formatTwin,
    formatTokenShare,
    formatFetchedTweet,
    formatTwineet,
    formatCryptoHolding,
    formatDailyImpressions,
    formatDemographics,
    formatPeakHours,
    formatReachByPlatform,
    formatTopInteractions,
    formatVerification,
    formatTwinStats,
    formatAnalytics,
    formatTokenStats,
    formatTransaction,
    formatUserTokenShare,
} from '../utils/formatData';

// Function to insert an twin
export async function insertTwin(twinData: TwinType): Promise<void> {
    const formattedTwin = formatTwin(twinData);
    const formattedAnalytics = formatAnalytics(twinData.analytics);
    const formattedCryptoHoldings = formatCryptoHolding(twinData.analytics.cryptoHoldings[twinData.analytics.cryptoHoldings.length - 1]); // how do i make it the last index of the array
    const formattedDemographics = formatDemographics(twinData.analytics.demographics[twinData.analytics.demographics.length - 1]);
    const formattedDailyImpressions = formatDailyImpressions(twinData.analytics.dailyImpressions[twinData.analytics.dailyImpressions.length - 1]);
    const formattedPeakHours = formatPeakHours(twinData.analytics.peakHours[twinData.analytics.peakHours.length - 1]);
    const formattedReachByPlatform = formatReachByPlatform(twinData.analytics.reachByPlatform[twinData.analytics.reachByPlatform.length - 1]);
    const formattedTopInteractions = formatTopInteractions(twinData.analytics.topInteractions[twinData.analytics.topInteractions.length - 1]);
    const formattedFetchedTweets = formatFetchedTweet(twinData.fetchedTweets[twinData.fetchedTweets.length - 1]);
    const formattedTwineets = formatTwineet(twinData.twineets[twinData.twineets.length - 1] || twinData.twineets[0]);
    const formattedTransactions = formatTransaction(twinData.transaction[twinData.transaction.length - 1]);
    const formattedTokenShares = formatTokenShare(twinData.tokenShares);
    const formattedTokenStats = formatTokenStats(twinData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(twinData.tokenShares.shareholders[twinData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(edgeql.Analytics, {
        twinId: formattedAnalytics.twinId,
        clickThroughRate: edgeql.decimal(formattedAnalytics.clickThroughRate.toString()),
        engagementRate: edgeql.decimal(formattedAnalytics.engagementRate.toString()),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
            twinId: formattedAnalytics.twinId,
            amount: edgeql.decimal(formattedCryptoHoldings.amount.toString()),
            symbol: formattedCryptoHoldings.symbol,
            change24h: edgeql.decimal(formattedCryptoHoldings.change24h.toString()),
            value: edgeql.decimal(formattedCryptoHoldings.value.toString()),
        }),
        demographics: edgeql.insert(edgeql.Demographics, {
            twinId: formattedAnalytics.twinId,
            age: formattedDemographics.age,
            percentage: edgeql.decimal(formattedDemographics.percentage.toString()),
        }),
        dailyImpressions: edgeql.insert(edgeql.DailyImpressions, {
            twinId: formattedAnalytics.twinId,
            date: formattedDailyImpressions.date,
            count: formattedDailyImpressions.count,
        }),
        peakHours: edgeql.insert(edgeql.PeakHours, {
            twinId: formattedAnalytics.twinId,
            hour: formattedPeakHours.hour,
            engagement: edgeql.decimal(formattedPeakHours.engagement.toString()),
        }),
        reachByPlatform: edgeql.insert(edgeql.ReachByPlatform, {
            twinId: formattedAnalytics.twinId,
            platform: formattedReachByPlatform.platform,
            count: formattedReachByPlatform.count,
        }),
        topInteractions: edgeql.insert(edgeql.TopInteractions, {
            twinId: formattedAnalytics.twinId,
            kind: formattedTopInteractions.kind,
            count: formattedTopInteractions.count,
        })
    });
    const fetchedTweetsQuery = edgeql.insert(edgeql.FetchedTweet, {
        twinId: formattedFetchedTweets.twinId,
        text: formattedFetchedTweets.text,
        edit_history_tweet_ids: formattedFetchedTweets.edit_history_tweet_ids,
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedFetchedTweets.timestamp)), // Ensure this is a Date object
    });

    const twineetsQuery = edgeql.insert(edgeql.Twineet, {
        twinId: formattedTwineets.twinId,
        content: formattedTwineets.content,
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedTwineets.timestamp)), // Ensure this is a Date object
    });

    const transactionsQuery = edgeql.insert(edgeql.Transaction, {
        twinId: formattedTransactions.twinId,
        trade: formattedTransactions.trade,
        shares: formattedTransactions.shares,
        pricePerShare: edgeql.decimal(formattedTransactions.pricePerShare.toString()),
        totalAmount: edgeql.decimal(formattedTransactions.totalAmount.toString()),
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedTransactions.timestamp)), // Ensure this is a Date object
    });

    const userTokenSharesQuery = edgeql.insert(edgeql.UserTokenShare, {
        twinId: formattedUserTokenShares.twinId,
        userId: formattedUserTokenShares.userId,
        shares: formattedUserTokenShares.shares,
        purchasePrice: edgeql.decimal(formattedUserTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(formattedUserTokenShares.purchaseDate)), // Ensure this is a Date object
    });

    const tokenSharesQuery = edgeql.insert(edgeql.TokenShare, {
        twinId: formattedTokenShares.twinId,
        totalShares: formattedTokenShares.totalShares,
        availableShares: formattedTokenShares.availableShares,
        pricePerShare: edgeql.decimal(formattedTokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = edgeql.insert(edgeql.TokenStats, {
        twinId: formattedTokenStats.twinId,
        price: edgeql.decimal(formattedTokenStats.price.toString()),
        change24h: edgeql.decimal(formattedTokenStats.change24h.toString()),
        volume24h: formattedTokenStats.volume24h,
        marketCap: formattedTokenStats.marketCap,
    });
    
    const insertTwinQuery = edgeql.insert(edgeql.Twin, {
        twinId: formattedTwin.twinId,
        twinHandle: formattedTwin.twinHandle,
        twitterHandle: formattedTwin.twitterHandle,
        profileImage: formattedTwin.profileImage,
        personality: formattedTwin.personality,
        description: formattedTwin.description,
        autoReply: formattedTwin.autoReply,
        isListed: formattedTwin.isListed,
        price: formattedTwin.price,
        timestamp: edgeql.cast(edgeql.datetime, formattedTwin.timestamp),
        analytics: analyticsQuery,
        verification: edgeql.insert(edgeql.Verification, formatVerification(formattedTwin.verification)),
        stats: edgeql.insert(edgeql.TwinStats, formatTwinStats(formattedTwin.stats)),
        tokenShares: tokenSharesQuery,
        fetchedTweets: fetchedTweetsQuery,
        twineets: twineetsQuery,
        tokenStats: tokenStatsQuery,
        transactions: transactionsQuery,
    });

    await insertTwinQuery.run(edgeDBCloudClient);
}

export async function insertFetchedTweet(twinId: string, fetchedTweet: FetchedTweetType): Promise<void> {
    const formattedFetchedTweet = formatFetchedTweet(fetchedTweet);
    const fetchedTweetsQuery = edgeql.update(edgeql.Twin, (twin) => ({
        filter: edgeql.op(twin.twinId, '=', twinId),
        set: {
            fetchedTweets: {
                '+=': edgeql.insert(edgeql.FetchedTweet, formattedFetchedTweet),
            },
        },
    }));

    await fetchedTweetsQuery.run(edgeDBCloudClient);
}

export async function insertTwineet(twinId: string, twineet: TwineetType): Promise<void> {
    const formattedTwineet = formatTwineet(twineet);
    const twineetsQuery = edgeql.update(edgeql.Twin, (twin) => ({
        filter: edgeql.op(twin.twinId, '=', twinId),
        set: {
            twineets: {
                '+=': edgeql.insert(edgeql.Twineet, formattedTwineet),
            },
        },
    }));

    await twineetsQuery.run(edgeDBCloudClient);
}

export async function insertTransaction(twinId: string, transaction: TransactionType): Promise<void> {
    const formattedTransaction = formatTransaction(transaction);
    const transactionsQuery = edgeql.update(edgeql.Twin, (twin) => ({
        filter: edgeql.op(twin.twinId, '=', twinId), 
        set: {
            transactions: {
                '+=': edgeql.insert(edgeql.Transaction, formattedTransaction),
            },
        },
    }));

    await transactionsQuery.run(edgeDBCloudClient);
}

export async function fetchTwineets(): Promise<TwineetType[]> {
    const twineetsQuery = edgeql.select(edgeql.Twineet, () => (  {
        id: true,
        twinId: true,
        content: true,
        timestamp: true,
        likesCount: true,
        retwineetsCount: true,
        repliesCount: true,
        isLiked: true,
        isRetwineeted: true,
    }));
    const result = await twineetsQuery.run(edgeDBCloudClient);
    return result as TwineetType[];
}

export async function fetchTwineetsByTwinId(twinId: string): Promise<TwineetType[]> {
    const twineetsQuery = edgeql.select(edgeql.Twineet, (twineet) => ({
        filter_single: edgeql.op(twineet.twinId, '=', twinId),
    }));
    const result = await twineetsQuery.run(edgeDBCloudClient);
    return result as unknown as TwineetType[];
}   

*/