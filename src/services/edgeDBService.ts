import edgeql, { createClient } from '../../dbschema/edgeql-js'

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

import {
    AgentType,
    FetchedTweetType,
    TwineetType,
    TransactionType
} from '../types/types';

import {
    formatAgent,
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
    formatAgentStats,
    formatAnalytics,
    formatTokenStats,
    formatTransaction,
    formatUserTokenShare,
} from '../utils/formatData';

// Function to insert an agent
export async function insertAgent(agentData: AgentType): Promise<void> {
    const formattedAgent = formatAgent(agentData);
    const formattedAnalytics = formatAnalytics(agentData.analytics);
    const formattedCryptoHoldings = formatCryptoHolding(agentData.analytics.cryptoHoldings[agentData.analytics.cryptoHoldings.length - 1]); // how do i make it the last index of the array
    const formattedDemographics = formatDemographics(agentData.analytics.demographics[agentData.analytics.demographics.length - 1]);
    const formattedDailyImpressions = formatDailyImpressions(agentData.analytics.dailyImpressions[agentData.analytics.dailyImpressions.length - 1]);
    const formattedPeakHours = formatPeakHours(agentData.analytics.peakHours[agentData.analytics.peakHours.length - 1]);
    const formattedReachByPlatform = formatReachByPlatform(agentData.analytics.reachByPlatform[agentData.analytics.reachByPlatform.length - 1]);
    const formattedTopInteractions = formatTopInteractions(agentData.analytics.topInteractions[agentData.analytics.topInteractions.length - 1]);
    const formattedFetchedTweets = formatFetchedTweet(agentData.fetchedTweets[agentData.fetchedTweets.length - 1]);
    const formattedTwineets = formatTwineet(agentData.twineets[agentData.twineets.length - 1] || agentData.twineets[0]);
    const formattedTransactions = formatTransaction(agentData.transaction[agentData.transaction.length - 1]);
    const formattedTokenShares = formatTokenShare(agentData.tokenShares);
    const formattedTokenStats = formatTokenStats(agentData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(agentData.tokenShares.shareholders[agentData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(edgeql.Analytics, {
        agentId: formattedAnalytics.agentId,
        clickThroughRate: edgeql.decimal(formattedAnalytics.clickThroughRate.toString()),
        engagementRate: edgeql.decimal(formattedAnalytics.engagementRate.toString()),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
            agentId: formattedAnalytics.agentId,
            amount: edgeql.decimal(formattedCryptoHoldings.amount.toString()),
            symbol: formattedCryptoHoldings.symbol,
            change24h: edgeql.decimal(formattedCryptoHoldings.change24h.toString()),
            value: edgeql.decimal(formattedCryptoHoldings.value.toString()),
        }),
        demographics: edgeql.insert(edgeql.Demographics, {
            agentId: formattedAnalytics.agentId,
            age: formattedDemographics.age,
            percentage: edgeql.decimal(formattedDemographics.percentage.toString()),
        }),
        dailyImpressions: edgeql.insert(edgeql.DailyImpressions, {
            agentId: formattedAnalytics.agentId,
            date: formattedDailyImpressions.date,
            count: formattedDailyImpressions.count,
        }),
        peakHours: edgeql.insert(edgeql.PeakHours, {
            agentId: formattedAnalytics.agentId,
            hour: formattedPeakHours.hour,
            engagement: edgeql.decimal(formattedPeakHours.engagement.toString()),
        }),
        reachByPlatform: edgeql.insert(edgeql.ReachByPlatform, {
            agentId: formattedAnalytics.agentId,
            platform: formattedReachByPlatform.platform,
            count: formattedReachByPlatform.count,
        }),
        topInteractions: edgeql.insert(edgeql.TopInteractions, {
            agentId: formattedAnalytics.agentId,
            kind: formattedTopInteractions.kind,
            count: formattedTopInteractions.count,
        })
    });
    const fetchedTweetsQuery = edgeql.insert(edgeql.FetchedTweet, {
        agentId: formattedFetchedTweets.agentId,
        text: formattedFetchedTweets.text,
        edit_history_tweet_ids: formattedFetchedTweets.edit_history_tweet_ids,
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedFetchedTweets.timestamp)), // Ensure this is a Date object
    });

    const twineetsQuery = edgeql.insert(edgeql.Twineet, {
        agentId: formattedTwineets.agentId,
        content: formattedTwineets.content,
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedTwineets.timestamp)), // Ensure this is a Date object
    });

    const transactionsQuery = edgeql.insert(edgeql.Transaction, {
        agentId: formattedTransactions.agentId,
        kind: formattedTransactions.kind,
        shares: formattedTransactions.shares,
        pricePerShare: edgeql.decimal(formattedTransactions.pricePerShare.toString()),
        totalAmount: edgeql.decimal(formattedTransactions.totalAmount.toString()),
        timestamp: edgeql.cast(edgeql.datetime, new Date(formattedTransactions.timestamp)), // Ensure this is a Date object
    });

    const userTokenSharesQuery = edgeql.insert(edgeql.UserTokenShare, {
        agentId: formattedUserTokenShares.agentId,
        userId: formattedUserTokenShares.userId,
        shares: formattedUserTokenShares.shares,
        purchasePrice: edgeql.decimal(formattedUserTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(formattedUserTokenShares.purchaseDate)), // Ensure this is a Date object
    });

    const tokenSharesQuery = edgeql.insert(edgeql.TokenShare, {
        agentId: formattedTokenShares.agentId,
        totalShares: formattedTokenShares.totalShares,
        availableShares: formattedTokenShares.availableShares,
        pricePerShare: edgeql.decimal(formattedTokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = edgeql.insert(edgeql.TokenStats, {
        agentId: formattedTokenStats.agentId,
        price: edgeql.decimal(formattedTokenStats.price.toString()),
        change24h: edgeql.decimal(formattedTokenStats.change24h.toString()),
        volume24h: formattedTokenStats.volume24h,
        marketCap: formattedTokenStats.marketCap,
    });
    
    const insertAgentQuery = edgeql.insert(edgeql.Agent, {
        agentId: formattedAgent.agentId,
        twinHandle: formattedAgent.twinHandle,
        twitterHandle: formattedAgent.twitterHandle,
        profileImage: formattedAgent.profileImage,
        personality: formattedAgent.personality,
        description: formattedAgent.description,
        autoReply: formattedAgent.autoReply,
        isListed: formattedAgent.isListed,
        price: formattedAgent.price,
        createdAt: edgeql.cast(edgeql.datetime, formattedAgent.createdAt),
        analytics: analyticsQuery,
        verification: edgeql.insert(edgeql.Verification, formatVerification(formattedAgent.verification)),
        stats: edgeql.insert(edgeql.AgentStats, formatAgentStats(formattedAgent.stats)),
        tokenShares: tokenSharesQuery,
        fetchedTweets: fetchedTweetsQuery,
        twineets: twineetsQuery,
        tokenStats: tokenStatsQuery,
        transactions: transactionsQuery,
    });

    await insertAgentQuery.run(edgeDBCloudClient);
}

export async function insertFetchedTweet(agentId: string, fetchedTweet: FetchedTweetType): Promise<void> {
    const formattedFetchedTweet = formatFetchedTweet(fetchedTweet);
    const fetchedTweetsQuery = edgeql.update(edgeql.Agent, (agent) => ({
        filter: edgeql.op(agent.agentId, '=', agentId),
        set: {
            fetchedTweets: {
                '+=': edgeql.insert(edgeql.FetchedTweet, formattedFetchedTweet),
            },
        },
    }));

    await fetchedTweetsQuery.run(edgeDBCloudClient);
}

export async function insertTwineet(agentId: string, twineet: TwineetType): Promise<void> {
    const formattedTwineet = formatTwineet(twineet);
    const twineetsQuery = edgeql.update(edgeql.Agent, (agent) => ({
        filter: edgeql.op(agent.agentId, '=', agentId),
        set: {
            twineets: {
                '+=': edgeql.insert(edgeql.Twineet, formattedTwineet),
            },
        },
    }));

    await twineetsQuery.run(edgeDBCloudClient);
}

export async function insertTransaction(agentId: string, transaction: TransactionType): Promise<void> {
    const formattedTransaction = formatTransaction(transaction);
    const transactionsQuery = edgeql.update(edgeql.Agent, (agent) => ({
        filter: edgeql.op(agent.agentId, '=', agentId), 
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
        agentId: true,
        content: true,
        timestamp: true,
        likes: true,
        retwineets: true,
        replies: true,
        isLiked: true,
        isRetwineeted: true,
    }));
    const result = await twineetsQuery.run(edgeDBCloudClient);
    return result as TwineetType[];
}

export async function fetchTwineetsByAgentId(agentId: string): Promise<TwineetType[]> {
    const twineetsQuery = edgeql.select(edgeql.Twineet, (twineet) => ({
        filter_single: edgeql.op(twineet.agentId, '=', agentId),
    }));
    const result = await twineetsQuery.run(edgeDBCloudClient);
    return result as unknown as TwineetType[];
}   

