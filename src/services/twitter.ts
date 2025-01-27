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