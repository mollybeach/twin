import axios from 'axios';
import { FetchedTweetsType } from '../types/types';
import { VerificationResponseType } from '../types/types';

export async function verifyTwitterAccount(handle: string): Promise<VerificationResponseType> {
  // Simulated API call to Twitter's OAuth endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, verify all handles except "invalid_user"
      if (handle === 'invalid_user') {
        resolve({ verified: false, error: 'Account not found' });
      } else {
        resolve({ verified: true });
      }
    }, 1000);
  });
}

export const fetchTweets = async (username: string): Promise<FetchedTweetsType[]> => {
  try {
    console.log(`Fetching tweets for username: ${username}`); // Log the username
    const response = await axios.get(`http://localhost:3002/api/tweets`, {
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
    throw new Error('Failed to fetch tweets. Please check the username and try again.');
  }
};
