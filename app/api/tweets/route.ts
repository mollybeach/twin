// path: app/api/tweets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); 
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        const userId = userResponse.data.data.id; 

        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            params: { max_results: 5 },
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        const tweets = response.data.data.map((tweet: { id: string; text: string; edit_history_tweet_ids: string[] }) => ({
            id: tweet.id,
            text: tweet.text,
            edit_history_tweet_ids: tweet.edit_history_tweet_ids,
        }));

        return NextResponse.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ message: 'Error fetching tweets' }, { status: 500 }); // Handle errors
    }
}