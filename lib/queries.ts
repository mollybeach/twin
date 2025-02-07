// path: lib/queries.ts
import edgeql from '../dbschema/edgeql-js'
import { edgeDBCloudClient } from '../lib/client';
import { Twin, Analytics, CryptoHolding, PeakHours, FetchedTweet, Twineet, UserTokenShare, TokenShare, TokenStats, Transaction,  DailyImpressions, ReachByPlatform, TopInteractions, Demographics } from '../dbschema/edgeql-js/modules/default';
import dotenv from 'dotenv';
dotenv.config();

import {
    formatTwin,
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
    formatTwinStats,
} from '../app/utils/formatData';

import {
    TwinType 
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

export async function insertTwin(twinData: TwinType): Promise<void> {
    console.log('twinData', twinData);
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
    const formattedTransactions = formatTransaction(twinData.transactions[twinData.transactions.length - 1]);
    const formattedTokenShares = formatTokenShare(twinData.tokenShares);
    const formattedTokenStats = formatTokenStats(twinData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(twinData.tokenShares.shareholders[twinData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(Analytics, {
        twinId: formattedAnalytics.twinId,
        clickThroughRate: eQlDecimal(twinData.analytics.clickThroughRate),  
        engagementRate: eQlDecimal(twinData.analytics.engagementRate),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(CryptoHolding, {
            twinId: formattedAnalytics.twinId,
            amount: eQlDecimal(formattedCryptoHoldings.amount),
            symbol: formattedCryptoHoldings.symbol,
            change24h: eQlDecimal(formattedCryptoHoldings.change24h),
            value: eQlDecimal(formattedCryptoHoldings.value),
        }),
        demographics: edgeql.insert( Demographics, {
            twinId: formattedAnalytics.twinId,
            age: formattedDemographics.age,
            percentage: eQlDecimal(formattedDemographics.percentage),
        }),
        dailyImpressions: edgeql.insert(DailyImpressions, {
            twinId: formattedAnalytics.twinId,
            date: eQlDate(formattedDailyImpressions.date),
            count: formattedDailyImpressions.count,
        }),
        peakHours: edgeql.insert(PeakHours, {
            twinId: formattedAnalytics.twinId,
            hour: formattedPeakHours.hour,
            engagement: eQlDecimal(formattedPeakHours.engagement),
        }),
        reachByPlatform: edgeql.insert(ReachByPlatform, {
            twinId: formattedAnalytics.twinId,
            platform: formattedReachByPlatform.platform,
            count: formattedReachByPlatform.count,
        }),
        topInteractions: edgeql.insert(TopInteractions, {
            twinId: formattedAnalytics.twinId,
            kind: formattedTopInteractions.kind,
            count: formattedTopInteractions.count,
        })
    });
    
    const fetchedTweetsQuery = await edgeql.insert(FetchedTweet, {
        twinId: formattedFetchedTweets.twinId,
        text: formattedFetchedTweets.text,
        edit_history_tweet_ids: formattedFetchedTweets.edit_history_tweet_ids,
        timestamp: eQlDate(formattedFetchedTweets.timestamp), 
    });

    const twineetsQuery = await edgeql.insert(Twineet, {
        twinId: formattedTwineets.twinId,
        content: formattedTwineets.content,
        isLiked: formattedTwineets.isLiked,
        isRetwineeted: formattedTwineets.isRetwineeted,
        likes: formattedTwineets.likes,
        retwineets: formattedTwineets.retwineets,
        replies: formattedTwineets.replies,
        timestamp: eQlDate(formattedTwineets.timestamp)
    });

    const transactionsQuery = await edgeql.insert(Transaction, {
        twinId: formattedTransactions.twinId,
        kind: formattedTransactions.kind,
        shares: formattedTransactions.shares,
        pricePerShare: eQlDecimal(formattedTransactions.pricePerShare),
        totalAmount: eQlDecimal(formattedTransactions.totalAmount),
        timestamp: eQlDate(formattedTransactions.timestamp), 
    });

    const userTokenSharesQuery = await edgeql.insert(UserTokenShare, {
        twinId: formattedUserTokenShares.twinId,
        userId: formattedUserTokenShares.userId,
        shares: edgeql.cast(edgeql.decimal, formattedUserTokenShares.shares),
        purchasePrice: edgeql.decimal(formattedUserTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(formattedUserTokenShares.purchaseDate)), 
    });

    const tokenSharesQuery = await edgeql.insert(TokenShare, {
        twinId: formattedTokenShares.twinId,
        totalShares: formattedTokenShares.totalShares,
        availableShares: formattedTokenShares.availableShares,
        pricePerShare: edgeql.decimal(formattedTokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = await edgeql.insert(TokenStats, {
        twinId: formattedTokenStats.twinId,
        price: edgeql.decimal(formattedTokenStats.price.toString()),
        change24h: edgeql.decimal(formattedTokenStats.change24h.toString()),
        volume24h: edgeql.decimal(formattedTokenStats.volume24h.toString()),
        marketCap: edgeql.decimal(formattedTokenStats.marketCap.toString()),
    });
    
    const insertTwinQuery = await edgeql.insert(Twin, {
        twinId: formattedTwin.twinId,
        twinHandle: formattedTwin.twinHandle,
        twitterHandle: formattedTwin.twitterHandle,
        profileImage: formattedTwin.profileImage,
        personality: formattedTwin.personality,
        description: formattedTwin.description,
        autoReply: formattedTwin.autoReply,
        isListed: formattedTwin.isListed,
        price: eQlDecimal(formattedTwin.price),
        createdAt: eQlDate(formattedTwin.createdAt), 
        modelData: formattedTwin.modelData,
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
