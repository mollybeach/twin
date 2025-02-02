   // path: pages/api/generate.ts
    import { NextApiRequest, NextApiResponse } from 'next';
    import OpenAI from 'openai';
    import dotenv from 'dotenv';
    
    dotenv.config();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === 'POST') {
            const { prompt } = req.body; // Extract prompt from request body
            try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 150,
                });
                res.status(200).json(completion);
            } catch (error) {
                console.error('Error generating response:', error);
                res.status(500).send('Error generating response');
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }