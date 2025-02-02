   // path: pages/api/tweets.ts
    import { NextApiRequest, NextApiResponse } from 'next';
    import axios from 'axios';
    import dotenv from 'dotenv';
    dotenv.config();
    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    }