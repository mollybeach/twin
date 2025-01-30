import axios from 'axios';

interface VerificationResponse {
  verified: boolean;
  error?: string;
}

export async function verifyTwitterAccount(handle: string): Promise<VerificationResponse> {
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

export const fetchTweets = async (twitterHandle: string) => {
    try {
        const response = await axios.get(`https://api.twitter.com/2/tweets?username=${twitterHandle}`, {
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`, // Use your Twitter Bearer Token
            },
        });
        return response.data.data; // Adjust based on the actual response structure
    } catch (error) {
        console.error('Error fetching tweets:', error);
        throw error;
    }
};