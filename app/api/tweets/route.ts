// path: app/api/tweets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); // Use URL to get search parameters
    const username = searchParams.get('username'); // Extract username from query parameters

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        // Step 1: Fetch user ID by username
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        const userId = userResponse.data.data.id; // Get the user ID

        // Step 2: Fetch tweets for the user
        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            params: { max_results: 5 }, // Adjust the number of results as needed
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        // Step 3: Format the tweets
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