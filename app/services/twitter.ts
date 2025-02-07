// path: app/services/twitter.ts

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
          twinId: '',
          isVerified: false, 
          verificationDate: new Date(),
          error: 'Account not found' 
        });
      } else {
        resolve({ 
          twinId: '',
          isVerified: true, 
          verificationDate: new Date(),
          error: '' 
        });
      }
    }, 1000);
  });
}

