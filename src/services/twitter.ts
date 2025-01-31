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

export const fetchTweets = async (username: string): Promise<string[]> => {
  try {
    console.log(`Fetching tweets for username: ${username}`); // Log the username
    const response = await axios.get(`http://localhost:3002/api/tweets`, {
      params: {
        username: username,
      },
    });
    console.log('Response:', response.data); // Log the response data
    return response.data.data.map((tweet: { text: string }) => tweet.text);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw new Error('Failed to fetch tweets. Please check the username and try again.');
  }
};