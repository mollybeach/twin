import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storeType, TwinType, TransactionType, UserType, NotificationType, UserTokenShareType, AnalyticsType, FetchedTweetType } from '../types/types';

const useStore = create<storeType>()(
  persist(
    (set, get) => ({
      notification: null as NotificationType | null,
      setNotification: (notification: NotificationType | null) => set({ notification }),
      allTwins: [] as TwinType[],
      currentUserData: null as UserType | null, 
      setCurrentUserData: (userData: UserType) => set({ currentUserData: userData }), // Method to set user data
      currentUserTwins: [] as TwinType[], 
      setCurrentUserTwins: (userTwins: TwinType[]) => set({ currentUserTwins: userTwins }),
      transactions: [] as TransactionType[],
      setTransactions: (transactions: TransactionType[]) => set({ transactions }),
      currentUserId: '',
      fetchedTweets: [] as FetchedTweetType[],
      setFetchedTweets: (fetchedTweets: FetchedTweetType[]) => set({ fetchedTweets }),
      twinAdded: false,
      setTwinAdded: (twinAdded: boolean) => set({ twinAdded }),
      generatedTwineetContent: '',
      setGeneratedTwineetContent: (generatedTwineetContent: string) => set({ generatedTwineetContent }),
      getNewTwinId: () => crypto.randomUUID(),
      getNewUserId: () => crypto.randomUUID(),
      addTwin: async (twin: TwinType): Promise<string> => {
        try {
          const response = await fetch('/api/twins', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(twin),
          });
          if (!response.ok) {
            throw new Error('Failed to add twin');
          }
          const data = await response.json();
          set(state => ({ allTwins: [...state.allTwins, data], twinAdded: true })); // Update state with the new twin
          return data; // Return the ID of the added twin
        } catch (error) {
          console.error('Error adding twin:', error);
          throw error; // Rethrow the error for handling in the component
        }
      },

      buyShares: async (twinId: string, shares: number): Promise<void> => {
        try {
          const response = await fetch(`/api/twins/${twinId}/buy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shares }),
          });
          if (!response.ok) {
            throw new Error('Failed to buy shares');
          }
        } catch (error) {
          console.error('Error buying shares:', error);
          throw error;
        }
      },

      sellShares: async (twinId: string, shares: number): Promise<void> => {
        try {
          const response = await fetch(`/api/twins/${twinId}/sell`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shares }),
          });
          if (!response.ok) {
            throw new Error('Failed to sell shares');
          }
          // Optionally update local state or perform additional logic here
        } catch (error) {
          console.error('Error selling shares:', error);
          throw error; 
        }
      },

      verifyTwin: async (twinId: string): Promise<boolean> => {
        try {
          const response = await fetch(`/api/twins/${twinId}/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to verify twin');
          }
          const result = await response.json();
          return result.success; // Assuming the API returns a success flag
        } catch (error) {
          console.error('Error verifying twin:', error);
          return false; // Return false on error
        }
      },
      getUserShares: (twinId: string): number => {
        const userShares = get().currentUserData?.userTokenShares?.find((a: UserTokenShareType) => a.twinId === twinId);
        return userShares ? userShares.shares : 0; // Return the number of shares or 0 if not found
      },
      getTwins: () => get().allTwins,
      updateAnalytics: async (twinId: string): Promise<AnalyticsType> => {
        const twin = get().allTwins.find((a: TwinType) => a.twinId === twinId);
        if (twin) {
          twin.analytics = {
            twinId: twinId,
            clickThroughRate: 0,
            engagementRate: 0,
            impressions: 0,
            cryptoHoldings: [],
            demographics: [],
            dailyImpressions: [],
            peakHours: [],
            reachByPlatform: [],
            topInteractions: [],
          };
          return twin.analytics;
        } else {
          throw new Error('Twin not found');
        }
      },

      getTransactionHistory: (twinId?: string): TransactionType[] => {
        return get().transactions.filter(transaction => transaction.twinId === twinId);
      },

      fetchCurrentUserTwins: async () => {
        try {
          const response = await fetch(`/api/users/${get().currentUserId}/twins`);
          if (!response.ok) throw new Error("Failed to fetch current user's twins");
          const twins: TwinType[] = await response.json();
          set({ currentUserTwins: twins }); // Update state with fetched twins
        } catch (error) {
          console.error("Error fetching current user's twins:", error);
        }
      },

      fetchAllTwins: async () => {
        try {
          const response = await fetch('/api/twins');
          if (!response.ok) throw new Error("Failed to fetch twins");
          const twins: TwinType[] = await response.json();
          set({ allTwins: twins });
        } catch (error) {
          console.error("Error fetching twins:", error);
        }
      },

      fetchUserShares: async (userId: string) => {
        try {
          const response = await fetch(`/api/users/${userId}/shares`);
          if (!response.ok) throw new Error("Failed to fetch user shares");
          const sharesData = await response.json();
          set((state) => ({ ...state, userShares: sharesData }));     
        } catch (error) {
          console.error("Error fetching user shares:", error);
        }
      },

      fetchTransactions: async (userId: string) => {
        try {
          const response = await fetch(`/api/users/${userId}/transactions`);
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const transactions: TransactionType[] = await response.json();
          set({ transactions });
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      },

      fetchCurrentUser: async () => {
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (!response.ok) throw new Error("Failed to fetch user data");
          const userData: UserType = await response.json();
          set((state) => ({ ...state, currentUserData: userData }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },

      fetchTweets: async (username: string) => {
        try {
          const response = await fetch(`/api/tweets?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch tweets');
          }
          const tweets = await response.json();
          set((state) => ({ ...state, fetchedTweets: tweets })); 
          return tweets;
        } catch (error) {
          console.error('Error fetching tweets:', error);
          throw error; 
        }
      },

      generateTwineetContent: async (tweets: FetchedTweetType[], personality: string) => {
        const prompt = `Based on the following tweets: ${tweets.map(tweet => tweet.text).join(', ')}, generate a twineet for a ${personality} AI twin.`;
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
          });
          if (!response.ok) {
            throw new Error('Failed to generate response from OpenAI');
          }
          const modelData = await response.json();
          const generatedText = modelData.choices[0].message?.content || modelData.choices[0].text;
          
          set((state) => ({ 
            ...state,
            generatedTwineetContent: generatedText,
          }));
          return { generatedText };
        } catch (error) {
          console.error('Failed to generate response:', error);
          throw new Error('Failed to generate response from OpenAI.');
        }
      }
    }),
    {
      name: 'app-storage',
      version: 1,
    }
  )
);

export { useStore };


