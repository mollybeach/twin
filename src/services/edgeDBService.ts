// src/services/edgeDBService.ts
import edgeql from '../../dbschema/edgeql-js';
import { createClient } from 'edgedb';
import {
    AgentStatsType,
   // AnalyticsType,
    CryptoHoldingType,
    DailyImpressionsType,
    DemographicsType,
    FetchedTweetsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
    TwineetType,
    UserTokenShareType,
    VerificationResponseType,
} from '../types/types';

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

export const localClient = createClient();

// Insert CryptoHolding
export async function insertCryptoHolding(
    agentId: string,
    amount: string,
    symbol: string,
    change24h: string,
    value: string
) {
const insertCryptoHolding = edgeql.insert(edgeql.CryptoHolding, {
    agentId,
    amount: edgeql.decimal(amount),
    symbol,
    change24h: edgeql.decimal(change24h),
    value: edgeql.decimal(value),
});
    await insertCryptoHolding.run(edgeDBCloudClient);
}

// Insert Demographics
export async function insertDemographics(agentId: string, age: string, percentage: string) {
  const insertDemographics = edgeql.insert(edgeql.Demographics, {
    agentId,
    age,
    percentage: edgeql.decimal(percentage),
});
  await insertDemographics.run(edgeDBCloudClient);
}

// Insert DailyImpressions
export async function insertDailyImpressions(agentId: string, date: string, count: number) {
  const insertDailyImpressions = edgeql.insert(edgeql.DailyImpressions, {
    agentId,
    date,
    count,
  });
  await insertDailyImpressions.run(edgeDBCloudClient);
}

// Insert PeakHours
export async function insertPeakHours(agentId: string, hour: number, engagement: string) {
  const insertPeakHours = edgeql.insert(edgeql.PeakHours, {
    agentId,
    hour,
    engagement: edgeql.decimal(engagement),
  });
  await insertPeakHours.run(edgeDBCloudClient);
}

// Insert ReachByPlatform
export async function insertReachByPlatform(agentId: string, platform: string, count: number) {
  const insertReachByPlatform = edgeql.insert(edgeql.ReachByPlatform, {
    agentId,
    platform,
    count,
  });
  await insertReachByPlatform.run(edgeDBCloudClient);
}

// Insert TopInteractions
export async function insertTopInteractions(agentId: string, kind: string, count: number) {
  const insertTopInteractions = edgeql.insert(edgeql.TopInteractions, {
    agentId,
    kind,
    count,
  });
  await insertTopInteractions.run(edgeDBCloudClient);
}

// Insert Analytics
export async function insertAnalytics(
    agentId: string,
    clickThroughRate: string,
    engagementRate: string,
    impressions: number,
    cryptoHoldings: CryptoHoldingType,
    demographics: DemographicsType,
    dailyImpressions: DailyImpressionsType,
    peakHours: PeakHoursType,
    reachByPlatform: ReachByPlatformType,
    topInteractions: TopInteractionsType
) {
    const insertAnalytics = edgeql.insert(edgeql.Analytics, {
        agentId,
        clickThroughRate: edgeql.decimal(clickThroughRate),
        engagementRate: edgeql.decimal(engagementRate),
        impressions,
        cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
            agentId,
            amount: edgeql.decimal(cryptoHoldings.amount.toString()),
            symbol: cryptoHoldings.symbol,
            change24h: edgeql.decimal(cryptoHoldings.change24h.toString()),
            value: edgeql.decimal(cryptoHoldings.value.toString()),
        }),
        demographics: edgeql.insert(edgeql.Demographics, {
            agentId,
            age: demographics.age,
            percentage: edgeql.decimal(demographics.percentage.toString()),
        }),
        dailyImpressions: edgeql.insert(edgeql.DailyImpressions, {
            agentId,
            date: dailyImpressions.date,
            count: dailyImpressions.count,
        }),
        peakHours: edgeql.insert(edgeql.PeakHours, {
            agentId,
            hour: peakHours.hour,
            engagement: edgeql.decimal(peakHours.engagement.toString()),
        }),
        reachByPlatform: edgeql.insert(edgeql.ReachByPlatform, {
            agentId,
            platform: reachByPlatform.platform,
            count: reachByPlatform.count,
        }),
        topInteractions: edgeql.insert(edgeql.TopInteractions, {
            agentId,
            kind: topInteractions.kind,
            count: topInteractions.count,
        }),
    });

    await insertAnalytics.run(edgeDBCloudClient);
}
// Insert UserTokenShare
export async function insertUserTokenShare(
    agentId: string,
    userId: string,
    shares: number,
    purchasePrice: string,
    purchaseDate: Date
) {
const insertUserTokenShare = edgeql.insert(edgeql.UserTokenShare, {
    agentId,
    userId,
    shares,
    purchasePrice: edgeql.decimal(purchasePrice),
    purchaseDate,
});
    await insertUserTokenShare.run(edgeDBCloudClient);
}

// Insert TokenShare
export async function insertTokenShare(
    agentId: string,
    totalShares: number,
    availableShares: number,
    pricePerShare: string,
    shareholders: UserTokenShareType
) {
    const insertTokenShare = edgeql.insert(edgeql.TokenShare, {
        agentId,
        totalShares,
        availableShares,
        pricePerShare: edgeql.decimal(pricePerShare),
        shareholders: edgeql.insert(edgeql.UserTokenShare, {
            agentId,
            userId: shareholders.userId,
            shares: shareholders.shares,
            purchasePrice: edgeql.decimal(shareholders.purchasePrice.toString()),
            purchaseDate: new Date(shareholders.purchaseDate),
        }),
    });
    await insertTokenShare.run(edgeDBCloudClient);
}
// Insert TokenStats
export async function insertTokenStats(
    agentId: string,
    price: string,
    change24h: string,
    volume24h: string,
    marketCap: string
) {
    const insertTokenStats = edgeql.insert(edgeql.TokenStats, {
        agentId,
        price: edgeql.decimal(price),
        change24h: edgeql.decimal(change24h),
        volume24h: edgeql.decimal(volume24h),
        marketCap: edgeql.decimal(marketCap),
    });
    await insertTokenStats.run(edgeDBCloudClient);
}

// Insert Transaction
export async function insertTransaction(
    agentId: string,
    kind: 'buy' | 'sell',
    shares: number,
    pricePerShare: string,
    totalAmount: string
) {
    const insertTransaction = edgeql.insert(edgeql.Transaction, {
        agentId,
        kind,
        shares,
        pricePerShare: edgeql.decimal(pricePerShare),
        totalAmount: edgeql.decimal(totalAmount),
    });
    await insertTransaction.run(edgeDBCloudClient);
}

// Insert FetchedTweet
export async function insertFetchedTweet(agentId: string, text: string, editHistoryTweetIds: string[]) {
    const insertFetchedTweet = edgeql.insert(edgeql.FetchedTweet, {
        agentId,
        text,
        edit_history_tweet_ids: editHistoryTweetIds,
        timestamp: new Date(),
    });
    await insertFetchedTweet.run(edgeDBCloudClient);
}

// Insert Twineet
export async function insertTwineet(
    agentId: string,
    content: string,
    likes: number,
    retwineets: number,
    replies: number,
    isLiked: boolean,
    isRetwineeted: boolean
) {
    const insertTwineet = edgeql.insert(edgeql.Twineet, {
        agentId,
        content,
        timestamp: new Date(),
        likes,
        retwineets,
        replies,
        isLiked,
        isRetwineeted,
    });
    await insertTwineet.run(edgeDBCloudClient);
}

// Insert Verification
export async function insertVerification(agentId: string, isVerified: boolean, verificationDate: Date) {
    const insertVerification = edgeql.insert(edgeql.Verification, {
        agentId,
        isVerified,
        verificationDate,
    });
    await insertVerification.run(edgeDBCloudClient);
}

// Insert AgentStats
export async function insertAgentStats(agentId: string, replies: number, interactions: number, uptime: string) {
    const insertAgentStats = edgeql.insert(edgeql.AgentStats, {
        agentId,
        replies,
        interactions,
        uptime,
    });
    await insertAgentStats.run(edgeDBCloudClient);
}

// Insert Agent
export async function insertAgent(
    agentId: string,
    twinHandle: string,
    twitterHandle: string,
    profileImage: string,
    personality: string,
    description: string,
    autoReply: boolean,
    isListed: boolean,
    price: string,
    analytics: {
        agentId: string,
        clickThroughRate: string,
        engagementRate: string,
        impressions: number,
        cryptoHoldings: CryptoHoldingType,
        demographics: DemographicsType,
        dailyImpressions: DailyImpressionsType,
        peakHours: PeakHoursType,
        reachByPlatform: ReachByPlatformType,
        topInteractions: TopInteractionsType
    },
    fetchedTweets: FetchedTweetsType,
    twineets: TwineetType,
    verification: VerificationResponseType,
    stats: AgentStatsType
) {
    const insertAgent = edgeql.insert(edgeql.Agent, {
        agentId,
        twinHandle,
        twitterHandle,
        profileImage,
        personality,
        description,
        autoReply,
        isListed,
        price: edgeql.decimal(price),
        analytics: edgeql.insert(edgeql.Analytics, {
            agentId: analytics.agentId,
            clickThroughRate: edgeql.decimal(analytics.clickThroughRate.toString()),
            engagementRate: edgeql.decimal(analytics.engagementRate.toString()),
            impressions: analytics.impressions,
            cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
                agentId: analytics.agentId,
                amount: edgeql.decimal(analytics.cryptoHoldings.amount.toString()),
                symbol: analytics.cryptoHoldings.symbol,
                change24h: edgeql.decimal(analytics.cryptoHoldings.change24h.toString()),
                value: edgeql.decimal(analytics.cryptoHoldings.value.toString()),
            }),
            demographics: edgeql.insert(edgeql.Demographics, {
                agentId: analytics.agentId,
                age: analytics.demographics.age,
                percentage: edgeql.decimal(analytics.demographics.percentage.toString()),
            }),
            dailyImpressions: edgeql.insert(edgeql.DailyImpressions, {
                agentId: analytics.agentId,
                date: analytics.dailyImpressions.date,
                count: analytics.dailyImpressions.count,
            }),
            peakHours: edgeql.insert(edgeql.PeakHours, {
                agentId: analytics.agentId,
                hour: analytics.peakHours.hour,
                engagement: edgeql.decimal(analytics.peakHours.engagement.toString()),
            }),
            reachByPlatform: edgeql.insert(edgeql.ReachByPlatform, {
                agentId: analytics.agentId,
                platform: analytics.reachByPlatform.platform,
                count: analytics.reachByPlatform.count,
            }),
            topInteractions: edgeql.insert(edgeql.TopInteractions, {
                agentId: analytics.agentId,
                kind: analytics.topInteractions.kind,
                count: analytics.topInteractions.count,
            })
        }),
        fetchedTweets: edgeql.insert(edgeql.FetchedTweet, {
            agentId: fetchedTweets.agentId,
            text: fetchedTweets.text,
            edit_history_tweet_ids: fetchedTweets.edit_history_tweet_ids,
            timestamp: edgeql.datetime(new Date(fetchedTweets.timestamp).toISOString()),
        }),
        twineets: edgeql.insert(edgeql.Twineet, {
            agentId: twineets.agentId,
            content: twineets.content,
            timestamp: edgeql.datetime(new Date(twineets.timestamp).toISOString()),
            likes: twineets.likes,
            retwineets: twineets.retwineets,
            replies: twineets.replies,
            isLiked: twineets.isLiked,
            isRetwineeted: twineets.isRetwineeted,
        }),
        verification: edgeql.insert(edgeql.Verification, {
            agentId: verification.agentId,
            isVerified: verification.isVerified,
            verificationDate: new Date(verification.verificationDate),
        }),
        stats: edgeql.insert(edgeql.AgentStats, {
            agentId: stats.agentId,
            replies: stats.replies,
            interactions: stats.interactions,
            uptime: stats.uptime,
        }),
    });
    await insertAgent.run(edgeDBCloudClient);
}

// Insert Notification
export async function insertNotification(
    agentId: string,
    kind: 'create' | 'buy' | 'sell',
    message: string,
    twinHandle: string,
    twitterHandle: string
) {
    const insertNotification = edgeql.insert(edgeql.Notification, {
        agentId,
        kind,
        message,
        twinHandle,
        twitterHandle,
        timestamp: new Date(),
    });
    await insertNotification.run(edgeDBCloudClient);
}