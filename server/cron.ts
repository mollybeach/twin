// server/cron.ts
/*
import cron from 'node-cron';
import axios from 'axios';
import { edgeDBCloudClient } from '../lib/client';
import dotenv from 'dotenv';
import { TwinType, FetchedTweetType } from '../app/types/types';

dotenv.config();

// Schedule the task to run every 5 minutes
//cron.schedule('*///1 * * * *', async () => {
/*
    try {
        // Fetch all Twins from the database
        const twinsQuery = `
            SELECT Twin {
                twinId,
                personality,
                twitterHandle,
                fetchedTweets,
                twineets : {
                    content
                }
            };
        `;
        const twins: TwinType[] = await edgeDBCloudClient.query(twinsQuery);

        // Generate and post a Twineet for each Twin
        for (const twin of twins) {
            // Fetch new tweets from Twitter API
            const newTweetsResponse = await axios.get(`http://localhost:3000/api/tweets?username=${encodeURIComponent(twin.twitterHandle)}`);
            const newTweets: FetchedTweetType[] = newTweetsResponse.data;

            // Update fetchedTweets with new tweets if they are not duplicates
            const existingTweetTexts = new Set(twin.fetchedTweets.map(tweet => tweet.text)); // Use text for comparison

            newTweets.forEach(tweet => {
                if (!existingTweetTexts.has(tweet.text)) {
                    twin.fetchedTweets.push(tweet); // Add new tweet to fetchedTweets
                }
            });

            // Combine fetched tweets and existing twineets
            const fetchedTweets = twin.fetchedTweets.map(tweet => tweet.text);
            const existingTwineets = twin.twineets.map(twineet => twineet.content);

            const combinedTexts = [...fetchedTweets, ...existingTwineets];
            if (combinedTexts.length === 0) {
                console.log(`No tweets or twineets for twin ${twin.twinId}, skipping...`);
                continue; // Skip if there are no fetched tweets or existing twineets
            }

            const prompt = `Based on the following tweets and twineets: ${combinedTexts.join(', ')}, generate a twineet for a ${twin.personality} AI twin.`;

            // Call the existing API route to generate a Twineet
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/generate`, {
                prompt,
            });

            if (response.status === 200) {
                const generatedTwineet = response.data.choices[0].message?.content || response.data.choices[0].text;

                // Prepare the Twineet object
                const twineet = {
                    twinId: twin.twinId,
                    content: generatedTwineet,
                    timestamp: new Date(),
                    likesCount: 0,
                    retwineetsCount: 0,
                    repliesCount: 0,
                    isLiked: false,
                    isRetwineeted: false,
                };

                // Insert the Twineet into the database
                const insertQuery = `
                    INSERT Twineet {
                        twinId := <str>$twinId,
                        content := <str>$content,
                        timestamp := datetime_current(),
                        likesCount := 0,
                        retwineetsCount := 0,
                        repliesCount := 0,
                        isLiked := false,
                        isRetwineeted := false
                    };
                `;
                await edgeDBCloudClient.execute(insertQuery, twineet);
                console.log(`Posted twineet for twin ${twin.twinId}: ${generatedTwineet}`);
            } else {
                console.error(`Failed to generate twineet for twin ${twin.twinId}`);
            }
        }
    } catch (error) {
        console.error('Error generating twineets:', error);
    }
});*/