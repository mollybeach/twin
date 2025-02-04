   // path: pages/api/tweets.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv';
import { URL } from 'url'; // Import URL to parse the request URL

dotenv.config();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); // Use URL to get search parameters
    const username = searchParams.get('username'); // Extract username from query parameters

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
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ message: 'Error fetching tweets' }, { status: 500 });
    }
}