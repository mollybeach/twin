//path: server/queries.ts
/*
import edgeql from '../dbschema/edgeql-js'
import { Agent, Analytics, FetchedTweet, Twineet, Verification, UserTokenShare, TokenShare, TokenStats, Transaction, CryptoHolding, DailyImpressions, PeakHours, ReachByPlatform, TopInteractions, Demographics } from '../dbschema/edgeql-js/modules/default';
import {
    AgentType
} from '../app/types/types';
import { formatAgent } from './formatData';
export const insertQuery = (agent: AgentType) => {
    const format = formatAgent(agent);

    const analyticsQuery =  edgeql.insert(Analytics, {
        agentId: format.analytics.agentId,
        clickThroughRate: edgeql.decimal(format.analytics.clickThroughRate.toString()),
        engagementRate: edgeql.decimal(format.analytics.engagementRate.toString()),
        impressions: format.analytics.impressions,
        cryptoHoldings: edgeql.insert(edgeql.CryptoHolding, {
            agentId: format.analytics.agentId,
            amount: edgeql.decimal(format.analytics.cryptoHoldings.amount.toString()),
            symbol: format.analytics.cryptoHoldings.symbol,
            change24h: edgeql.decimal(format.analytics.cryptoHoldings.change24h.toString()),
            value: edgeql.decimal(format.analytics.cryptoHoldings.value.toString()),
        }),
        demographics: edgeql.insert( Demographics, {
            agentId: format.analytics.agentId,
            age: format.analytics.demographics.age,
            percentage: edgeql.decimal(format.analytics.demographics.percentage.toString()),
        }),
        dailyImpressions: edgeql.insert(DailyImpressions, {
            agentId: format.analytics.agentId,
            date: format.analytics.dailyImpressions.date,
            count: format.analytics.dailyImpressions.count,
        }),
        peakHours: edgeql.insert(edgeql.PeakHours, {
            agentId: format.analytics.agentId,
            hour: format.analytics.peakHours.hour,
            engagement: edgeql.decimal(format.analytics.peakHours.engagement.toString()),
        }),
        reachByPlatform: edgeql.insert(ReachByPlatform, {
            agentId: format.analytics.agentId,
            platform: format.analytics.reachByPlatform.platform,
            count: format.analytics.reachByPlatform.count,
        }),
        topInteractions: edgeql.insert(TopInteractions, {
            agentId: format.analytics.agentId,
            kind: format.analytics.topInteractions.kind,
            count: format.analytics.topInteractions.count,
        })
    });

    const fetchedTweetsQuery = await edgeql.insert(FetchedTweet, {
        agentId: format.agentId,
        text: format.fetchedTweets.text,
        edit_history_tweet_ids: format.fetchedTweets.edit_history_tweet_ids,
        timestamp: edgeql.cast(edgeql.datetime, new Date(format.fetchedTweets.timestamp)), // Ensure this is a Date object
    });


    const twineetsQuery = await edgeql.insert(Twineet, {
        agentId: format.analytics.agentId,
        content: format.twineets.content,
        timestamp: edgeql.cast(edgeql.datetime, new Date(format.twineets.timestamp)), // Ensure this is a Date object
    });


    const transactionsQuery = await edgeql.insert(Transaction, {
        agentId: format.analytics.agentId,
        kind: format.transactions.kind,
        shares: format.transactions.shares,
        pricePerShare: edgeql.decimal(format.transactions.pricePerShare.toString()),
        totalAmount: edgeql.decimal(format.transactions.totalAmount.toString()),
        timestamp: edgeql.cast(edgeql.datetime, new Date(format.transactions.timestamp)), // Ensure this is a Date object
    });

    const userTokenSharesQuery = await edgeql.insert(UserTokenShare, {
        agentId: format.analytics.agentId,
        userId: format.userTokenShares.userId,
        shares: edgeql.cast(edgeql.decimal, format.userTokenShares.shares),
        purchasePrice: edgeql.decimal(format.userTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(format.userTokenShares.purchaseDate)), // Ensure this is a Date object
    });

    const tokenSharesQuery = await edgeql.insert(TokenShare, {
        agentId: format.analytics.agentId,
        totalShares: format.tokenShares.totalShares,
        availableShares: format.tokenShares.availableShares,
        pricePerShare: edgeql.decimal(format.tokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = await edgeql.insert(TokenStats, {
        agentId: format.analytics.agentId,
        price: edgeql.decimal(format.tokenStats.price.toString()),
        change24h: edgeql.decimal(format.tokenStats.change24h.toString()),
        volume24h: edgeql.decimal(format.tokenStats.volume24h.toString()),
        marketCap: edgeql.decimal(format.tokenStats.marketCap.toString()),
    });

    const agentQuery = await edgeql.insert(Agent, {   
        agentId: format.analytics.agentId,
        twinHandle: format.agent.twinHandle,
        twitterHandle: format.agent.twitterHandle,
        profileImage: format.agent.profileImage,
        personality: format.agent.personality,
        description: format.agent.description,
        autoReply: format.agent.autoReply,
        isListed: format.agent.isListed,
        modelData: format.agent.modelData,
        price: edgeql.decimal(format.agent.price.toString()),
        createdAt: edgeql.cast(edgeql.datetime, new Date(format.agent.createdAt)), 
        analytics: analyticsQuery,
        verification: edgeql.insert(edgeql.Verification, format.verification),
        stats: edgeql.insert(edgeql.AgentStats, format.stats),
        tokenShares: tokenSharesQuery,
        fetchedTweets: format.agent.fetchedTweets.length > 0 ? fetchedTweetsQuery : [],
        twineets: format.agent.twineets.length > 0 ? twineetsQuery : [],
        tokenStats: tokenStatsQuery,
        transactions: format.agent.transactions.length > 0 ? transactionsQuery : []
    });

    const queries = {
        agent: agentQuery,
        analytics: analyticsQuery,
        fetchedTweets: fetchedTweetsQuery,
        twineets: twineetsQuery,
        transactions: transactionsQuery,
        userTokenShares: userTokenSharesQuery,
        tokenShares: tokenSharesQuery,
        tokenStats: tokenStatsQuery
    }

    return queries;
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
};
/**
 * Recursive EdgeQL Insert Data Formatter
 */