// path: lib/queries.ts
import edgeql from '../dbschema/edgeql-js'
import { edgeDBCloudClient } from '../lib/client';
import { Agent, Analytics, CryptoHolding, PeakHours, FetchedTweet, Twineet, UserTokenShare, TokenShare, TokenStats, Transaction,  DailyImpressions, ReachByPlatform, TopInteractions, Demographics } from '../dbschema/edgeql-js/modules/default';
import dotenv from 'dotenv';
dotenv.config();

import {
    formatAgent,
    formatAnalytics,
    formatCryptoHolding,
    formatDemographics,
    formatDailyImpressions,
    formatPeakHours,
    formatReachByPlatform,
    formatTopInteractions,
    formatFetchedTweet,
    formatTwineet,
    formatTransaction,
    formatTokenShare,
    formatTokenStats,
    formatUserTokenShare,
    formatVerification,
    formatAgentStats,
} from '../app/utils/formatData';

import {
    AgentType 
} from '../app/types/types';

const eQlString = (value: string) => {
    console.log('String', value)
    return value;
}
const eQlDate = (date: Date) => {
    console.log('Date', date)
    return edgeql.cast(edgeql.datetime, date);
}

const eQlDecimal = (value: number) => {
    console.log('Decimal', value)
    return edgeql.decimal(value.toString());
}

export async function insertAgent(agentData: AgentType): Promise<void> {
    console.log('agentData', agentData);
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
    const formattedTransactions = formatTransaction(agentData.transactions[agentData.transactions.length - 1]);
    const formattedTokenShares = formatTokenShare(agentData.tokenShares);
    const formattedTokenStats = formatTokenStats(agentData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(agentData.tokenShares.shareholders[agentData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(Analytics, {
        agentId: formattedAnalytics.agentId,
        clickThroughRate: eQlDecimal(agentData.analytics.clickThroughRate),  
        engagementRate: eQlDecimal(agentData.analytics.engagementRate),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(CryptoHolding, {
            agentId: formattedAnalytics.agentId,
            amount: eQlDecimal(formattedCryptoHoldings.amount),
            symbol: formattedCryptoHoldings.symbol,
            change24h: eQlDecimal(formattedCryptoHoldings.change24h),
            value: eQlDecimal(formattedCryptoHoldings.value),
        }),
        demographics: edgeql.insert( Demographics, {
            agentId: formattedAnalytics.agentId,
            age: formattedDemographics.age,
            percentage: eQlDecimal(formattedDemographics.percentage),
        }),
        dailyImpressions: edgeql.insert(DailyImpressions, {
            agentId: formattedAnalytics.agentId,
            date: eQlDate(formattedDailyImpressions.date),
            count: formattedDailyImpressions.count,
        }),
        peakHours: edgeql.insert(PeakHours, {
            agentId: formattedAnalytics.agentId,
            hour: formattedPeakHours.hour,
            engagement: eQlDecimal(formattedPeakHours.engagement),
        }),
        reachByPlatform: edgeql.insert(ReachByPlatform, {
            agentId: formattedAnalytics.agentId,
            platform: formattedReachByPlatform.platform,
            count: formattedReachByPlatform.count,
        }),
        topInteractions: edgeql.insert(TopInteractions, {
            agentId: formattedAnalytics.agentId,
            kind: formattedTopInteractions.kind,
            count: formattedTopInteractions.count,
        })
    });
    
    const fetchedTweetsQuery = await edgeql.insert(FetchedTweet, {
        agentId: formattedFetchedTweets.agentId,
        text: formattedFetchedTweets.text,
        edit_history_tweet_ids: formattedFetchedTweets.edit_history_tweet_ids,
        timestamp: eQlDate(formattedFetchedTweets.timestamp), 
    });

    const twineetsQuery = await edgeql.insert(Twineet, {
        agentId: formattedTwineets.agentId,
        content: formattedTwineets.content,
        isLiked: formattedTwineets.isLiked,
        isRetwineeted: formattedTwineets.isRetwineeted,
        likes: formattedTwineets.likes,
        retwineets: formattedTwineets.retwineets,
        replies: formattedTwineets.replies,
        timestamp: eQlDate(formattedTwineets.timestamp)
    });

    const transactionsQuery = await edgeql.insert(Transaction, {
        agentId: formattedTransactions.agentId,
        kind: formattedTransactions.kind,
        shares: formattedTransactions.shares,
        pricePerShare: eQlDecimal(formattedTransactions.pricePerShare),
        totalAmount: eQlDecimal(formattedTransactions.totalAmount),
        timestamp: eQlDate(formattedTransactions.timestamp), 
    });

    const userTokenSharesQuery = await edgeql.insert(UserTokenShare, {
        agentId: formattedUserTokenShares.agentId,
        userId: formattedUserTokenShares.userId,
        shares: edgeql.cast(edgeql.decimal, formattedUserTokenShares.shares),
        purchasePrice: edgeql.decimal(formattedUserTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(formattedUserTokenShares.purchaseDate)), 
    });

    const tokenSharesQuery = await edgeql.insert(TokenShare, {
        agentId: formattedTokenShares.agentId,
        totalShares: formattedTokenShares.totalShares,
        availableShares: formattedTokenShares.availableShares,
        pricePerShare: edgeql.decimal(formattedTokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = await edgeql.insert(TokenStats, {
        agentId: formattedTokenStats.agentId,
        price: edgeql.decimal(formattedTokenStats.price.toString()),
        change24h: edgeql.decimal(formattedTokenStats.change24h.toString()),
        volume24h: edgeql.decimal(formattedTokenStats.volume24h.toString()),
        marketCap: edgeql.decimal(formattedTokenStats.marketCap.toString()),
    });
    
    const insertAgentQuery = await edgeql.insert(Agent, {
        agentId: formattedAgent.agentId,
        twinHandle: formattedAgent.twinHandle,
        twitterHandle: formattedAgent.twitterHandle,
        profileImage: formattedAgent.profileImage,
        personality: formattedAgent.personality,
        description: formattedAgent.description,
        autoReply: formattedAgent.autoReply,
        isListed: formattedAgent.isListed,
        price: eQlDecimal(formattedAgent.price),
        createdAt: eQlDate(formattedAgent.createdAt), 
        modelData: formattedAgent.modelData,
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
