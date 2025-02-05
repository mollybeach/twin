// path: api/index.ts
import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import { createClient } from 'edgedb';
import edgeql from '../dbschema/edgeql-js';
import { 
    Agent, 
    Analytics, 
    FetchedTweet, 
    Twineet, 
    Verification, 
    UserTokenShare, 
    TokenShare, 
    TokenStats, 
    Transaction, 
    CryptoHolding, 
    DailyImpressions, 
    PeakHours, 
    ReachByPlatform, 
    TopInteractions, 
    Demographics, 
    AgentStats
} from '../dbschema/edgeql-js/modules/default';

import {
    AgentType,
    AnalyticsType,
    FetchedTweetType,
    TwineetType,
    VerificationResponseType,
    UserTokenShareType,
    TokenShareType,
    TokenStatsType,
    TransactionType,
    CryptoHoldingType,
    DailyImpressionsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
    DemographicsType,
} from '../app/types/types';

import { formatAgent } from './formatData';
import dotenv from 'dotenv';

dotenv.config();

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});



const port = process.env.PORT || 5000;
const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000';

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

/**
 * Recursive EdgeQL Insert Data Formatter
 */
const eQlDate = (date: Date) => {
    console.log('Date', date)
    return edgeql.cast(edgeql.datetime, date);
}

// Generic function to cast a number to an EdgeQL decimal
const eQlDecimal = (value: number) => {
    console.log('Decimal', value)
    return edgeql.decimal(value.toString());
}

// Generic function to cast a string to an EdgeQL string
const eQlString = (value: string) => {
    console.log('String', value)
    return value;
}


const eQlInsert = (data: any): any => {
        if (!data || typeof data !== 'object') return data;
    
        const formatted: any = {};
        let count = 0;
    
        for (const key in data) {
            console.log("count", count);
            count++;
            console.log('Key: ', key, ' Data: ', data[key]);
    
            if (Array.isArray(data[key])) {
                console.log('Array: ', data[key]);
                const mappedArray: any[] = data[key].map(eQlInsert);
    
                formatted[key] = mappedArray.length > 0 
                    ? edgeql.set(...mappedArray)
                    : edgeql.set(); // Empty set for EdgeDB
    
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                console.log('Object: ', data[key]);
                formatted[key] = eQlInsert(data[key]);
    
            } else {
                console.log('Primitive: ', data[key]);
                formatted[key] = data[key];
            }
        }
    
        return formatted;
    };

/**
 * Insert Agent into EdgeDB
 */
export async function insertAgent(agentData: AgentType): Promise<AgentType> {
    console.log('Inserting agent:', agentData);

    const insertQuery = edgeql.insert(Agent, {
        agentId: eQlString(agentData.agentId),
        twinHandle: eQlString(agentData.twinHandle),
        twitterHandle: eQlString(agentData.twitterHandle),
        profileImage: eQlString(agentData.profileImage),
        personality: eQlString(agentData.personality),
        description: eQlString(agentData.description),
        autoReply: agentData.autoReply,
        isListed: agentData.isListed,
        modelData: eQlString(JSON.stringify(agentData.modelData)),
        price: eQlDecimal(agentData.price),
        createdAt: eQlDate(agentData.createdAt),
        analytics: eQlInsert(agentData.analytics),
        verification: agentData.verification 
            ? edgeql.insert(Verification, eQlInsert(agentData.verification)) 
            : {},
        stats: agentData.stats 
            ? edgeql.insert(AgentStats, eQlInsert(agentData.stats)) 
            : {},
        tokenShares: agentData.tokenShares 
            ? edgeql.insert(TokenShare, eQlInsert(agentData.tokenShares)) 
            : {},
        fetchedTweets: agentData.fetchedTweets?.length 
            ? edgeql.set(agentData.fetchedTweets.map(tweet => edgeql.insert(FetchedTweet, eQlInsert(tweet))))
            : {},
        twineets: agentData.twineets?.length 
            ? edgeql.set(agentData.twineets.map(twineet => edgeql.insert(Twineet, eQlInsert(twineet))))
            : {},
        tokenStats: agentData.tokenStats 
            ? edgeql.insert(TokenStats, eQlInsert(agentData.tokenStats)) 
            : {},
        transactions: agentData.transactions?.length 
            ? edgeql.set(agentData.transactions.map(tx => edgeql.insert(Transaction, eQlInsert(tx))))
            : {},
    });

    try {
        await (await insertQuery).run(edgeDBCloudClient);
        return agentData;
    } catch (error) {
        console.error('Error inserting agent:', error);
        throw new Error('Failed to insert agent');
    }
}
export async function fetchTwineets(): Promise<TwineetType[]> {
    const query = edgeql.select(Twineet, () => ({
        id: true,
        agentId: true,
        content: true,
        timestamp: true,
        isRetwineeted: true,
        likes: true,
        retwineets: true,
        replies: true,
        isLiked: true
    }));

    const result = await edgeDBCloudClient.query(JSON.stringify(query)); // Execute the query
    return result as TwineetType[]; // Cast the result to the expected type
}

export async function fetchTwineetsByAgentId(agentId: string): Promise<TwineetType[]> {
    const twineetsQuery = edgeql.select(Twineet, (twineet : TwineetType) => ({
        id: true,
        agentId: true,
        content: true,
        timestamp: true,
        isRetwineeted: true,
        likes: true,
        retwineets: true,
        replies: true,
        isLiked: true,  
        filter: edgeql.op(twineet.agentId, '=', agentId),
    }))

    const result = await edgeDBCloudClient.query(JSON.stringify(twineetsQuery));
    return result as TwineetType[];
}

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
    const { prompt } = req.body; 
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', 
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150, 
        });
        res.json(completion); 
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
            ...currentAgent.result,
            fetchedTweets: [...(currentAgent.result.fetchedTweets || []), fetchedTweet], // Add the new fetched tweet to the existing array
            agentId: currentAgent.result.agentId || agentId, // Ensure agentId is not undefined
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
            ...currentAgent.result,
            twineets: [...currentAgent.result.twineets, twineet], // Add the new twineet to the existing array
            agentId: currentAgent.result.agentId || agentId, // Ensure agentId is not undefined
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
            ...currentAgent.result,
            transactions: [...currentAgent.result.transactions, transaction], // Add the new transaction to the existing array
            agentId: currentAgent.result.agentId || agentId, // Ensure agentId is not undefined
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
app.get('/api/twineets', async (_req: Request, res: Response) => {
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

interface FetchAgentByAgentIdResult {
    status: string;
    result : AgentType
}

interface GetAllAgentsResult {
    status: string;
    result : AgentType[]
}

// Function to fetch an agent by ID
export async function fetchAgentByAgentId(agentId: string): Promise<FetchAgentByAgentIdResult | null> {
    const query = edgeql.select(edgeql.Agent, (agent : AgentType) => ({
        filter: edgeql.op(agent.agentId, '=', agentId),
        limit: 1,
        result: edgeql.Agent
    }));
    const result = await edgeDBCloudClient.query(JSON.stringify(query));
    if (Array.isArray(result) && result.length > 0) {
        return { status: 'success', result: formatAgent(result[0] as AgentType) };
    }
    return null;
}

// Function to fetch all agents
export async function getAllAgents(): Promise<GetAllAgentsResult | null> {
    const query = edgeql.select(edgeql.Agent, () => ({
        result: edgeql.Agent
    }));
    const result = await edgeDBCloudClient.query(JSON.stringify(query));
    if (Array.isArray(result) && result.length > 0) {
        return { status: 'success', result: result.map(agent => formatAgent(agent as AgentType)) };
    }
    return null;
}


// Start the server
app.listen(port, () => {
    console.log(`Server running at ${url}` );
});