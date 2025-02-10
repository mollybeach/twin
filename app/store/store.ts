import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storeType, TwinType, TransactionType, UserType, NotificationType, UserTokenShareType, AnalyticsType, FetchedTweetType } from '../types/types';

const useStore = create<storeType>()(
  persist(
    (set, get) => ({
      // State Variables
      stateAllTwins: [] as TwinType[],
      stateCurrentUserData: null as UserType | null,
      stateCurrentUserId: '',
      stateCurrentUserTwins: [] as TwinType[],
      stateFetchedTweets: [] as FetchedTweetType[],
      stateGeneratedTwineetContent: '',
      stateNotification: null as NotificationType | null,
      stateTransactions: [] as TransactionType[],
      stateTwinAdded: false,
      stateShares: [] as UserTokenShareType[],

      // Setters
      setCurrentUserData: (userData: UserType) => set({ stateCurrentUserData: userData }),
      setNotification: (notification: NotificationType | null) => set({ stateNotification: notification }),
      setCurrentUserTwins: (userTwins: TwinType[]) => set({ stateCurrentUserTwins: userTwins }),
      setFetchedTweets: (fetchedTweets: FetchedTweetType[]) => set({ stateFetchedTweets: fetchedTweets }),
      setTwinAdded: (twinAdded: boolean) => set({ stateTwinAdded: twinAdded }),
      setTransactions: (transactions: TransactionType[]) => set({ stateTransactions: transactions }),
      setGeneratedTwineetContent: (generatedTwineetContent: string) => set({ stateGeneratedTwineetContent: generatedTwineetContent }),
      // Getters
      getNewTwinId: () => crypto.randomUUID(),
      getNewUserId: () => crypto.randomUUID(),
      getUserSharesOfATwin: (twinId: string): number => {
        const userShares = get().stateCurrentUserData?.userTokenShares?.find((a: UserTokenShareType) => a.twinId === twinId);
        return userShares ? userShares.shares : 0;
      },
      getTransactionHistory: (twinId?: string): TransactionType[] => {
        return get().stateTransactions.filter(transaction => transaction.twinId === twinId);
      },

      getAllTwins: async (): Promise<TwinType[]> => {
        try {
          const response = await fetch('/api/twins');
          if (!response.ok) throw new Error("Failed to fetch twins");
          const twins: TwinType[] = await response.json();
          set({ stateAllTwins: twins });
          return twins;
        } catch (error) {
          console.error("Error fetching twins:", error);
          return [];
        }
      },

      getBuyShares: async (twinId: string, currentUserId: string, sharesToBuy: number): Promise<void> => {
        try {
          const response = await fetch(`/api/twins/${twinId}/buy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ twinId, currentUserId, sharesToBuy }),
          });
          if (!response.ok) {
            throw new Error('Failed to buy shares');
          }
          const data = await response.json();
          set((state) => ({ ...state, stateShares: data.shares }));
        } catch (error) {
          console.error('Error buying shares:', error);
          throw error;
        }
      },

      getCreateTwin: async (twin: TwinType): Promise<string> => {
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
          set(state => ({ stateAllTwins: [...state.stateAllTwins, data], stateTwinAdded: true }));
          return data;
        } catch (error) {
          console.error('Error adding twin:', error);
          throw error;
        }
      },

      getCurrentUser: async (): Promise<UserType> => {
        try {
          const response = await fetch(`/api/users/${get().stateCurrentUserId}`);
          if (!response.ok) throw new Error("Failed to fetch user data");
          const userData: UserType = await response.json();
          set((state) => ({ ...state, stateCurrentUserData: userData }));
          return userData;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return {} as UserType;
        }
      },

      getCurrentUserTwins: async (): Promise<TwinType[]> => {
        try {
          const response = await fetch(`/api/users/${get().stateCurrentUserId}/twins`);
          if (!response.ok) throw new Error("Failed to fetch current user's twins");
          const twins: TwinType[] = await response.json();
          set({ stateCurrentUserTwins: twins });
          return twins;
        } catch (error) {
          console.error("Error fetching current user's twins:", error);
          return [] as TwinType[];
        }
      },

      getGeneratedTwineetContent: async (tweets: FetchedTweetType[], personality: string) => {
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
            stateGeneratedTwineetContent: generatedText,
          }));
          return { generatedText };
        } catch (error) {
          console.error('Failed to generate response:', error);
          throw new Error('Failed to generate response from OpenAI.');
        }
      },

      getLogin: async (username: string, password: string) => {
        try {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error('Invalid username or password');
          }

          const data = await response.json();
          set({ stateCurrentUserData: data, stateCurrentUserId: data.userId });
          localStorage.setItem('userData', JSON.stringify(data));
          return data;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      getLogout: async () => {
        try {
          const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Logout failed');
          }
          set({ stateCurrentUserData: null, stateCurrentUserId: '' });
          localStorage.removeItem('userData'); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },

      getSellShares: async (twinId: string, shares: number): Promise<void> => {
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
          const data = await response.json();
          set((state) => ({ ...state, stateShares: data.shares }));
        } catch (error) {
          console.error('Error selling shares:', error);
          throw error; 
        }
      },

      getTransactionsUserHistory: async (userId: string): Promise<TransactionType[]> => {
        try {
          const response = await fetch(`/api/users/${userId}/transactions`);
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const transactions: TransactionType[] = await response.json();
          return transactions;
              
        } catch (error) {
          console.error("Error fetching transactions:", error);
          throw error;
        }
      },

      getTweets: async (username: string) => {
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
            console.log('Fetched tweets:', tweets); // Log the response to check its structure
            set((state) => ({ ...state, stateFetchedTweets: tweets }));
            return tweets;
        } catch (error) {
            console.error('Error fetching tweets:', error);
            throw error; 
        }
      },

      getUpdateAnalytics: async (twinId: string): Promise<AnalyticsType> => {
        const twin = get().stateAllTwins.find((a: TwinType) => a.twinId === twinId);
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

      getUserShares: async (userId: string): Promise<UserTokenShareType[]> => {
        try {
            const response = await fetch(`/api/users/${userId}/shares`);
            if (!response.ok) throw new Error("Failed to fetch user shares");
            const sharesData = await response.json();
            set((state) => ({ ...state, stateShares: sharesData }));
            return sharesData;
        } catch (error) {
            console.error("Error fetching user shares:", error);
            return [];
        }
    },

      getVerifyTwin: async (twinId: string): Promise<boolean> => {
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
          return result.success;
        } catch (error) {
          console.error('Error verifying twin:', error);
          return false;
        }
      },

      getTransactionTwinHistory: async (twinId: string): Promise<TransactionType[]> => {
        try {
          const response = await fetch(`/api/twins/${twinId}/transactions`);
          if (!response.ok) throw new Error("Failed to fetch twin transactions");
          const transactions: TransactionType[] = await response.json();
          return transactions;
        } catch (error) {
          console.error("Error fetching twin transactions:", error);
          throw error;
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


