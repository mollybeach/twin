// path: server/server.ts
import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import axios from 'axios';

// Import the functions from edgeDBService
import {
    insertAgent,
    insertFetchedTweet,
    insertTwineet,
    insertTransaction,
    fetchTwineets,
    fetchTwineetsByAgentId,
} from './edgeDBService';

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
        await insertFetchedTweet(agentId, fetchedTweet);
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
        await insertTwineet(agentId, twineet);
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
        await insertTransaction(agentId, transaction);
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});