// path: server/server.js
const express = require('express');
const OpenAI = require('openai');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

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
app.post('/generate', async(req, res) => {
    const { prompt } = req.body; // Extract prompt from request body
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Specify the model to use
            messages: [
                { role: 'user', content: prompt }, // User's message
            ],
            max_tokens: 150, // Limit the number of tokens in the response
        });
        res.json(completion); // Send the response back to the client
    } catch (error) {
        console.error('Error generating response:', error);
        if (error.code === 'insufficient_quota') {
            return res.status(429).send('Quota exceeded. Please check your OpenAI plan.');
        }
        res.status(500).send('Error generating response'); // Handle other errors
    }
});

app.get('/api/tweets', async(req, res) => {
    const { username } = req.query;
    try {
        // Get user ID from username
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`, // Use your actual token
            },
        });

        const userId = userResponse.data.data.id; // Get the user ID

        // Fetch tweets using the user ID
        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            params: {
                max_results: 5, // Limit the number of tweets to 5
            },
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});