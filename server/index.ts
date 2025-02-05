// path: server/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import edgeql from '../dbschema/edgeql-js'
import { edgeDBCloudClient } from '../lib/client';
//import { Agent, FetchedTweet } from '../dbschema/interfaces'; // Import generated types
import { Agent, Analytics, FetchedTweet, Twineet, Verification, UserTokenShare, TokenShare, TokenStats, Transaction, CryptoHolding, DailyImpressions, PeakHours, ReachByPlatform, TopInteractions, Demographics } from '../dbschema/edgeql-js/modules/default';
import dotenv from 'dotenv';

dotenv.config();


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
    TransactionType 
} from '../app/types/types';

const port = process.env.PORT || 3002;
const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002';

const app = express();

const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:3002', 
    'https://twin-three.vercel.app'
];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}));

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

function formatUserTokenShare(share: UserTokenShareType) {
    return {
        agentId: share.agentId,
        userId: share.userId,
        shares: parseFloat(share.shares.toString()),
        purchasePrice: parseFloat(share.purchasePrice.toString()),
        purchaseDate: share.purchaseDate,
    };
}

function formatTokenShare(tokenShare: TokenShareType) {
    return {
        agentId: tokenShare.agentId,
        totalShares: tokenShare.totalShares,
        availableShares: tokenShare.availableShares,
        pricePerShare: parseFloat(tokenShare.pricePerShare.toString()),
        shareholders: tokenShare?.shareholders?.map(formatUserTokenShare) || [],
    };
}

function formatAgent(agent: any): AgentType {
    return {
        agentId: agent.agentId,
        twinHandle: agent.twinHandle,
        twitterHandle: agent.twitterHandle,
        profileImage: agent.profileImage,
        personality: agent.personality,
        description: agent.description,
        autoReply: agent.autoReply,
        isListed: agent.isListed,
        price: parseFloat(agent.price),
        modelData: agent.modelData, 
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

function formatCryptoHolding(cryptoHolding: CryptoHoldingType) {
    return {
        agentId: cryptoHolding.agentId,
        amount: parseFloat(cryptoHolding.amount.toString()), 
        symbol: cryptoHolding.symbol,
        change24h: parseFloat(cryptoHolding.change24h.toString()), 
        value: parseFloat(cryptoHolding.value.toString())
    };
}

function formatAnalytics(analytics: AnalyticsType) {
    return {
        agentId: analytics.agentId,
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

function formatAgentStats(stats: AgentStatsType) {
    return {
        agentId: stats.agentId,
        replies: stats.replies,
        interactions: stats.interactions,
        uptime: stats.uptime,
    };
}

function formatTokenStats(tokenStats: TokenStatsType) {
    return {
        agentId: tokenStats.agentId,
        price: parseFloat(tokenStats.price.toString()), 
        change24h: parseFloat(tokenStats.change24h.toString()), 
        volume24h: parseFloat(tokenStats.volume24h.toString()), 
        marketCap: parseFloat(tokenStats.marketCap.toString()), 
    };
}

function formatDemographics(demographics: DemographicsType) {
    return {
        agentId: demographics.agentId,
        age: demographics.age,
        percentage: parseFloat(demographics.percentage.toString()), 
    };
}

function formatDailyImpressions(dailyImpressions: DailyImpressionsType) {
    return {
        agentId: dailyImpressions.agentId,
        date: dailyImpressions.date,
        count: parseInt(dailyImpressions.count.toString()), 
    };
}

function formatPeakHours(peakHours: PeakHoursType) {
    return {
        agentId: peakHours.agentId,
        hour: parseInt(peakHours.hour.toString()), 
        engagement: parseFloat(peakHours.engagement.toString()), 
    };
}

function formatReachByPlatform(reach: ReachByPlatformType) {
    return {
        agentId: reach.agentId,
        platform: reach.platform,
        count: parseInt(reach.count.toString()), 
    };
}

function formatTopInteractions(interactions: TopInteractionsType) {
    return {
        agentId: interactions.agentId,
        kind: interactions.kind,
        count: parseInt(interactions.count.toString()), 
    };
}

function formatFetchedTweet(tweet: FetchedTweetType) {
    return {
        agentId: tweet.agentId,
        text: tweet.text,
        edit_history_tweet_ids: tweet.edit_history_tweet_ids,
        timestamp: new Date(tweet.timestamp), 
    };
}

function formatTwineet(twineet: TwineetType) {
    return {
        agentId: twineet.agentId,
        content: twineet.content,
        timestamp: twineet.timestamp, 
        likes: twineet.likes,
        retwineets: twineet.retwineets,
        replies: twineet.replies,
        isLiked: twineet.isLiked,
        isRetwineeted: twineet.isRetwineeted,
    };
}

function formatVerification(verification: VerificationResponseType) {
    return {
        agentId: verification.agentId,
        isVerified: verification.isVerified,
        verificationDate: verification.verificationDate,
    };
}

function formatTransaction(transaction: TransactionType) {
    return {
        agentId: transaction.agentId,
        kind: transaction.kind,
        shares: transaction.shares,
        pricePerShare: transaction.pricePerShare,
        totalAmount: transaction.totalAmount,
        timestamp: transaction.timestamp, 
    };
}

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
    const formattedTransactions = formatTransaction(agentData.transactions[agentData.transactions.length - 1]);
    const formattedTokenShares = formatTokenShare(agentData.tokenShares);
    const formattedTokenStats = formatTokenStats(agentData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(agentData.tokenShares.shareholders[agentData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(Analytics, {
        agentId: formattedAnalytics.agentId,
        clickThroughRate: eQlDecimal(agentData.analytics.clickThroughRate),  
        engagementRate: eQlDecimal(agentData.analytics.engagementRate),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
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
        peakHours: edgeql.insert(edgeql.PeakHours, {
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
        timestamp: eQlDate(formattedTwineets.timestamp), 
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

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
});

app.use(limiter);

app.listen(port, () => {
    console.log(`Server running at ${url}`);
});