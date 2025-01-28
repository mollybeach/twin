// server/server.js
const express = require('express');
const OpenAI = require('openai');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle generating responses
app.post('/generate', async(req, res) => {
    const { prompt } = req.body; // Extract prompt from request body
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Specify the model to use
            messages: [{ role: 'user', content: prompt }], // Set the message
            max_tokens: 150, // Limit the number of tokens in the response
        });
        res.json(response); // Send the response back to the client
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response'); // Handle errors
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});