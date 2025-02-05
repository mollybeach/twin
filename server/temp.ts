// path: server/edgeDBService.ts
/*import edgeql, { createClient } from '../dbschema/edgeql-js'

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

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
} from '../src/types/types';
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
        transactions: agent.transaction?.map(formatTransaction) || [],
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

*/

// Utility functions for type casting
/*
const eQlDate = (date: Date) => edgeql.cast(edgeql.datetime, date);
const eQlDecimal = (value: number) => edgeql.cast(edgeql.decimal, value);
const eQlString = (value: string) =>  value;
*/
/*// Recursive Formatting Data Insert Function
const eQlInsert = (data: any) => {
    const castedData: any = {}; 

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                // If it's a linked object, insert it using the EdgeDB insert format
                if (linkTypeMapping[key]) {
                    console.log('Link Type Object Mapping', linkTypeMapping[key]);
                    castedData[key] = edgeql.insert(linkTypeMapping[key], eQlInsert(data[key]));
                } else {
                    console.log('Not a Link Type Object Mapping', key);
                    castedData[key] = eQlInsert(data[key]);
                }
            } else if (Array.isArray(data[key])) {
                // If it's an array, check if it's a linked type and insert each item as a subquery
                if (linkTypeMapping[key]) {
                    console.log('Link Type Array Mapping', linkTypeMapping[key]);
                    castedData[key] = data[key].map(item => edgeql.insert(linkTypeMapping[key], eQlInsert(item)));
                } else {
                    console.log('Not a Link Type Array Mapping', key);
                    castedData[key] = data[key].map(item => eQlInsert(item));
                }
            } else {
                // Handle primitive types
                if (typeof data[key] === 'string') {
                    console.log('Primitive Type String', key);
                    castedData[key] = qQlString(data[key]); 
                } else if (typeof data[key] === 'number') {
                    console.log('Primitive Type Number ', key);
                    castedData[key] = eQlDecimal(data[key]); 
                } else if (data[key] instanceof Date) {
                    console.log('Primitive Type Date', key);
                    castedData[key] = eQlDate(data[key]);
                } else {
                    console.log('Primitive Type Other', key);
                    castedData[key] = data[key];
                }
            }
        }
    }
    console.log('Casted Data', castedData);
    return castedData;
}
*/