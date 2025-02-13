// path: app/api/tweets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv';
import { FetchedTweetType } from '../../types/types';
import { edgeDBCloudClient } from '../../../lib/client';
import yetweets from '../../../lib/yetweets.json'; // Import the yetweets.json file

dotenv.config();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); 
    const username = searchParams.get('username');
    const twinId = searchParams.get('twinId');
    console.log('username', username);
    console.log('twinId', twinId);

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        // Check if the username is 'kanyewest'
        if (username.toLowerCase() === 'kanyewest') {
            // Use the data from yetweets.json and limit to 100 tweets
            console.log('using yetweets.json');
            const tweets = yetweets.posts.slice(0, 100).map((post, index) => ({
                id: `tweet-${index}`, // Generate a unique ID for each tweet
                twinId: twinId,
                text: post.text,
                timestamp: new Date(), // Set the current date as the timestamp
                tweetId: `tweet-${index}`, // Use the index as a unique tweet ID
            }));

            return NextResponse.json(tweets);
        } 

        // Fetch tweets from Twitter API for other usernames
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        const userId = userResponse.data.data.id; 

        console.log('user response.data.data ', userResponse.data.data);

        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            params: { max_results: 100 },
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        console.log('response.data.data ', response.data.data);

        const tweets = response.data.data.map((tweet: { id: string; text: string; edit_history_tweet_ids: string[]}) => ({
            id: tweet.id,
            twinId: twinId,
            text: tweet.text,
            timestamp: new Date(),
            tweetId: tweet.edit_history_tweet_ids[0],
        }));

        return NextResponse.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ message: 'Error fetching tweets' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const { ...updatedData } = await req.json(); // Destructure to get twinId and the rest of the data
    console.log('POSTREQUEST RECEIVED: ', updatedData);
    try {
    for (const tweet of updatedData.newTweets) {
        const query = `
            INSERT FetchedTweet {
                twinId := <str>$twinId,
                text := <str>$text,
                timestamp := <datetime>$timestamp,
                tweetId := <str>$tweetId
            }
        `;

        await edgeDBCloudClient.querySingle<FetchedTweetType>(query, { twinId: tweet.twinId, text: tweet.text, timestamp: new Date(tweet.timestamp), tweetId: tweet.tweetId });
    }
    return NextResponse.json({ message: 'FetchedTweets created successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error creating fetchedTweet:', error);
        return NextResponse.json({ message: 'Error creating fetchedTweet' }, { status: 500 });
    }   
    }  


