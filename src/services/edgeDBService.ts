import { FetchedTweetsType, TwineetType } from '../types/types'; // Adjust the import path as necessary
import edgeql from '../../dbschema/edgeql-js';
import { createClient } from 'edgedb';

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN
});

export const localClient = createClient();
// Function to insert fetched tweets and twineets into the database
export async function insertFetchedTweetsAndTwineets(agentId: string, fetchedTweets: FetchedTweetsType[], twineets: TwineetType[]) {
    // Insert fetched tweets
    for (const tweet of fetchedTweets) {
        const insertTweet = edgeql.insert(edgeql.FetchedTweet, {
            text: tweet.text,
            edit_history_tweet_ids: tweet.edit_history_tweet_ids,
            timestamp: new Date(),
            agentId: agentId
        });
        await insertTweet.run(edgeDBCloudClient);
    }

    // Insert twineets
    for (const twineet of twineets) {
        const insertTwineet = edgeql.insert(edgeql.Twineet, {
            agentId: agentId,
            content: twineet.content,
            timestamp: new Date(),
            likes: twineet.likes,
            retwineets: twineet.retwineets,
            replies: twineet.replies,
            isLiked: twineet.isLiked,
            isRetwineeted: twineet.isRetwineeted,
        });
        await insertTwineet.run(edgeDBCloudClient);
    }
}
