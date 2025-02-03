// path: api/index.ts
import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import { createClient } from 'edgedb';
import edgeql from '../dbschema/edgeql-js'
//import { Agent, FetchedTweet } from '../dbschema/interfaces'; // Import generated types

import dotenv from 'dotenv';

dotenv.config();

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
} from '../app/types/types';
// Function to format UserTokenShare
function formatUserTokenShare(share: UserTokenShareType) {
    return {
        agentId: share.agentId,
        userId: share.userId,
        shares: parseFloat(share.shares.toString()),
        purchasePrice: parseFloat(share.purchasePrice.toString()),
        purchaseDate: share.purchaseDate,
    };
}

// Function to format TokenShare
function formatTokenShare(tokenShare: TokenShareType) {
    return {
        agentId: tokenShare.agentId,
        totalShares: tokenShare.totalShares,
        availableShares: tokenShare.availableShares,
        pricePerShare: parseFloat(tokenShare.pricePerShare.toString()),
        shareholders: tokenShare?.shareholders?.map(formatUserTokenShare) || [],
    };
}
// Function to format Agent
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
        price: parseFloat(agent.price), // Ensure price is a number
        createdAt: new Date(agent.createdAt),
        analytics: formatAnalytics(agent.analytics),
        fetchedTweets: agent.fetchedTweets?.map(formatFetchedTweet) || [],
        twineets: agent.twineets?.map(formatTwineet) || [],
        verification: formatVerification(agent.verification),
        stats: formatAgentStats(agent.stats),
        tokenShares: formatTokenShare(agent.tokenShares),
        tokenStats: formatTokenStats(agent.tokenStats),
        transactions: agent.transactions?.map(formatTransaction) || [],
        modelData: agent.modelData, // Ensure this is included
    };
}

function formatCryptoHolding(cryptoHolding: CryptoHoldingType) {
    return {
        agentId: cryptoHolding.agentId,
        amount: parseFloat(cryptoHolding.amount.toString()), // Ensure this is a number
        symbol: cryptoHolding.symbol,
        change24h: parseFloat(cryptoHolding.change24h.toString()), // Ensure this is a number
        value: parseFloat(cryptoHolding.value.toString()), // Ensure this is a number
    };
}

// Function to format Analytics
function formatAnalytics(analytics: AnalyticsType) {
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
        price: parseFloat(tokenStats.price.toString()), // Ensure this is a number
        change24h: parseFloat(tokenStats.change24h.toString()), // Ensure this is a number
        volume24h: parseFloat(tokenStats.volume24h.toString()), // Ensure this is a number
        marketCap: parseFloat(tokenStats.marketCap.toString()), // Ensure this is a number
    };
}

// Function to format Demographics
function formatDemographics(demographics: DemographicsType) {
    return {
        agentId: demographics.agentId,
        age: demographics.age,
        percentage: parseFloat(demographics.percentage.toString()), // Ensure this is a number
    };
}

// Function to format DailyImpressions
function formatDailyImpressions(dailyImpressions: DailyImpressionsType) {
    return {
        agentId: dailyImpressions.agentId,
        date: dailyImpressions.date,
        count: parseInt(dailyImpressions.count.toString()), // Ensure this is a number
    };
}

// Function to format PeakHours
function formatPeakHours(peakHours: PeakHoursType) {
    return {
        agentId: peakHours.agentId,
        hour: parseInt(peakHours.hour.toString()), // Ensure this is a number
        engagement: parseFloat(peakHours.engagement.toString()), // Ensure this is a number
    };
}

// Function to format ReachByPlatform
function formatReachByPlatform(reach: ReachByPlatformType) {
    return {
        agentId: reach.agentId,
        platform: reach.platform,
        count: parseInt(reach.count.toString()), // Ensure this is a number
    };
}

// Function to format TopInteractions
function formatTopInteractions(interactions: TopInteractionsType) {
    return {
        agentId: interactions.agentId,
        kind: interactions.kind,
        count: parseInt(interactions.count.toString()), // Ensure this is a number
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
    const formattedTransactions = formatTransaction(agentData.transactions[agentData.transactions.length - 1]);
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
        shares: edgeql.cast(edgeql.decimal, formattedUserTokenShares.shares.toString()),
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
        volume24h: edgeql.decimal(formattedTokenStats.volume24h.toString()),
        marketCap: edgeql.decimal(formattedTokenStats.marketCap.toString()),
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
        price: edgeql.decimal(formattedAgent.price.toString()),
        createdAt: edgeql.cast(edgeql.datetime, new Date(formattedAgent.createdAt)), // Ensure this is a Date object
        analytics: analyticsQuery,
        verification: edgeql.insert(edgeql.Verification, formatVerification(formattedAgent.verification)),
        stats: edgeql.insert(edgeql.AgentStats, formatAgentStats(formattedAgent.stats)),
        tokenShares: tokenSharesQuery,
        fetchedTweets: fetchedTweetsQuery,
        twineets: twineetsQuery,
        tokenStats: tokenStatsQuery,
        transactions: transactionsQuery,
    });
    const insertAgentQueryResult = insertAgentQuery;
    await insertAgentQueryResult.run(edgeDBCloudClient);
}

export async function fetchTwineets(): Promise<TwineetType[]> {
    const twineetsQuery = edgeql.select(edgeql.Twineet, () => ({
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
    const twineetsQuery = edgeql.select(edgeql.Twineet, () => ({
        filter: edgeql.op(edgeql.Twineet.agentId, '=', agentId),
    }));
    const result = await twineetsQuery.run(edgeDBCloudClient);
    return result as TwineetType[];
}

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
});

// Apply rate limiting to all requests
app.use(limiter);

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle generating responses
app.post('/generate', async (req: Request, res: Response) => {
    const { prompt } = req.body; // Extract prompt from request body
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Specify the model to use
            messages: [{ role: 'user', content: prompt }], // User's message
            max_tokens: 150, // Limit the number of tokens in the response
        });
        res.json(completion); // Send the response back to the client
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

// Route to fetch tweets
app.get('/api/tweets', async (req: Request, res: Response) => {
    const { username } = req.query;
    try {
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        const userId = userResponse.data.data.id; // Get the user ID

        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            params: { max_results: 5 },
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).send('Error fetching tweets');
    }
});

// Route to handle agent creation
app.post('/api/agents', async (req: Request, res: Response) => {
    const newAgentData = req.body; // Get the new agent data from the request body

    try {
        await insertAgent(newAgentData);
        res.status(201).send('Agent created successfully');
    } catch (error) {
        console.error('Error creating agent:', error);
        res.status(500).send('Error creating agent');
    }
});

// Route to insert fetched tweet
app.post('/api/fetched-tweets', async (req: Request, res: Response) => {
    const { agentId, fetchedTweet } = req.body; // Get agentId and fetchedTweet from the request body

    try {
        // Step 1: Fetch the current agent data
        const currentAgent = await fetchAgentByAgentId(agentId); // Fetch the agent by ID

        // Step 2: Create a copy of the current agent data and update the fetchedTweets array
        if (!currentAgent) {
            throw new Error('Agent not found');
        }

        const updatedAgent = {
            ...currentAgent,
            fetchedTweets: [...currentAgent.fetchedTweets, fetchedTweet], // Add the new fetched tweet to the existing array
            agentId: currentAgent.agentId || agentId, // Ensure agentId is not undefined
        };

        // Step 3: Insert the updated agent data
        await insertAgent(updatedAgent as AgentType); // Insert the agent with updated fetched tweets

        res.status(201).send('Fetched tweet inserted successfully');
    } catch (error) {
        console.error('Error inserting fetched tweet:', error);
        res.status(500).send('Error inserting fetched tweet');
    }
});

// Route to insert twineet
app.post('/api/twineets', async (req: Request, res: Response) => {
    const { agentId, twineet } = req.body; // Get agentId and twineet from the request body

    try {
        // Step 1: Fetch the current agent data
        const currentAgent = await fetchAgentByAgentId(agentId); // Fetch the agent by ID

        // Step 2: Create a copy of the current agent data and update the twineets array
        if (!currentAgent) {
            throw new Error('Agent not found');
        }

        const updatedAgent = {
            ...currentAgent,
            twineets: [...currentAgent.twineets, twineet], // Add the new twineet to the existing array
            agentId: currentAgent.agentId || agentId, // Ensure agentId is not undefined
        };

        // Step 3: Insert the updated agent data
        await insertAgent(updatedAgent as AgentType); // Insert the agent with updated twineets

        res.status(201).send('Twineet inserted successfully');
    } catch (error) {
        console.error('Error inserting twineet:', error);
        res.status(500).send('Error inserting twineet');
    }
});

// Route to insert transaction
app.post('/api/transactions', async (req: Request, res: Response) => {
    const { agentId, transaction } = req.body; // Get agentId and transaction from the request body

    try {
        // Step 1: Fetch the current agent data
        const currentAgent = await fetchAgentByAgentId(agentId); // Fetch the agent by ID

        // Step 2: Create a copy of the current agent data and update the transactions array
        if (!currentAgent) {
            throw new Error('Agent not found');
        }

        const updatedAgent = {
            ...currentAgent,
            transactions: [...currentAgent.transactions, transaction], // Add the new transaction to the existing array
            agentId: currentAgent.agentId || agentId, // Ensure agentId is not undefined
        };

        // Step 3: Insert the updated agent data
        await insertAgent(updatedAgent as AgentType); // Insert the agent with updated transactions

        res.status(201).send('Transaction inserted successfully');
    } catch (error) {
        console.error('Error inserting transaction:', error);
        res.status(500).send('Error inserting transaction');
    }
});

// Route to fetch twineets
app.get('/api/twineets', async (req: Request, res: Response) => {
    try {
        const twineets = await fetchTwineets();
        res.json(twineets);
    } catch (error) {
        console.error('Error fetching twineets:', error);
        res.status(500).send('Error fetching twineets');
    }
});

// Route to fetch twineets by agent ID
app.get('/api/twineets/:agentId', async (req: Request, res: Response) => {
    const { agentId } = req.params; // Get agentId from the request parameters
    try {
        const twineets = await fetchTwineetsByAgentId(agentId);
        res.json(twineets);
    } catch (error) {
        console.error('Error fetching twineets by agent ID:', error);
        res.status(500).send('Error fetching twineets by agent ID');
    }
});

// Function to fetch an agent by ID
export async function fetchAgentByAgentId(agentId: string): Promise<AgentType | null> {
    const query = edgeql.select(edgeql.Agent, agent => ({
        filter: edgeql.op(agent.agentId, '=', agentId),
        limit: 1,
        ...edgeql.Agent['*']
    }));

    const result = await query.run(edgeDBCloudClient);
    return result.length > 0 ? formatAgent(result[0]) : null;
}

// Function to fetch all agents
export async function getAllAgents(): Promise<AgentType[]> {
    const query = edgeql.select(edgeql.Agent, () => ({
        ...edgeql.Agent['*']
    }));

    const result = await query.run(edgeDBCloudClient);
    return result.map(agent => formatAgent(agent));
}

// Function to fetch agent metrics history
export async function getAgentMetricsHistory(agentId: string, limit: number): Promise<AnalyticsType[]> {
    const query = edgeql.select(edgeql.Analytics, analytics => ({
        filter: edgeql.op(analytics.agentId, '=', agentId),
        limit,
        ...edgeql.Analytics['*']
    }));

    const result = await query.run(edgeDBCloudClient);
    return result.map((item: any) => ({
        ...item,
        cryptoHoldings: item.cryptoHoldings.map((holding: any) => ({
            ...holding,
            amount: parseFloat(holding.amount) // Ensure amount is a number
        }))
    }));
}

// Function to fetch token stats history
export async function getTokenStatsHistory(agentId: string, limit: number): Promise<TokenStatsType[]> {
    const query = edgeql.select(edgeql.TokenStats, stats => ({
        filter: edgeql.op(stats.agentId, '=', agentId),
        limit,
        ...edgeql.TokenStats['*']
    }));

    const result = await query.run(edgeDBCloudClient);
    return result.map((item: any) => ({
        ...item,
        price: parseFloat(item.price), // Ensure price is a number
        change24h: parseFloat(item.change24h), // Ensure change24h is a number
        volume24h: parseFloat(item.volume24h), // Ensure volume24h is a number
        marketCap: parseFloat(item.marketCap) // Ensure marketCap is a number
    }));
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});