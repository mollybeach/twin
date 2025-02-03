// path: app/services/twitter.ts
import axios from 'axios';
import { FetchedTweetType } from '../types/types';
import { VerificationResponseType } from '../types/types';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyTwitterAccount(handle: string): Promise<VerificationResponseType> {
  // Simulated API call to Twitter's OAuth endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, verify all handles except "invalid_user"
      if (handle === 'invalid_user') {
        resolve({ 
          agentId: '',
          isVerified: false, 
          verificationDate: new Date(),
          error: 'Account not found' 
        });
      } else {
        resolve({ 
          agentId: '',
          isVerified: true, 
          verificationDate: new Date(),
          error: '' 
        });
      }
    }, 1000);
  });
}

export const fetchTweets = async (username: string): Promise<FetchedTweetType[]> => {
  try {
    console.log(`Fetching tweets for username: ${username}`); // Log the username
    const response = await axios.get(process.env.NEXT_PUBLIC_URL + '/api/tweets', {
      params: {
        username: username,
      },
    });
    console.log('Response:', response.data); // Log the response data
    // Map the response data to the Tweet format
    return response.data.data.map((tweet: { id: string; text: string; edit_history_tweet_ids: string[] }) => ({
      id: tweet.id,
      text: tweet.text,
      edit_history_tweet_ids: tweet.edit_history_tweet_ids,
    }));
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw new Error('Failed to fetch tweets. Please try again :' + error);
  }
};
