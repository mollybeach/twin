import { create } from 'zustand';
import { persist, createJSONStorage, PersistStorage, StorageValue } from 'zustand/middleware';
import { AgentType, TransactionType, AnalyticsType, NotificationType, MarketplaceStoreType } from '../types/types';

// Storage limit (4.5MB to stay safely under 5MB limit)
const STORAGE_LIMIT = 4.5 * 1024 * 1024;

// Helper function to estimate storage size
const estimateStorageSize = (data: unknown): number => {
  return new Blob([JSON.stringify(data)]).size;
};

// Helper function to clean up old data
const cleanupOldData = (agents: AgentType[]): AgentType[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return agents
    .filter(agent => new Date(agent.createdAt) > thirtyDaysAgo)
    .map(agent => ({
      ...agent,
      tokenShares: {
        ...agent.tokenShares,
        shareholders: agent.tokenShares.shareholders.slice(-20) // Keep only last 20 transactions
      },
      analytics: {
        ...agent.analytics,
        dailyImpressions: agent.analytics.dailyImpressions.slice(-30), // Keep only last 30 days
        topInteractions: agent.analytics.topInteractions.slice(0, 5), // Keep only top 5
        demographics: agent.analytics.demographics.slice(0, 5), // Keep only top 5 age groups
        peakHours: agent.analytics.peakHours.slice(0, 24), // Keep only 24 hours
        cryptoHoldings: agent.analytics.cryptoHoldings.slice(0, 4) // Keep only top 4 holdings
      }
    }));
};

// Custom storage with error handling and size checks
const createCustomStorage = (): PersistStorage<unknown> => {
  const storage = createJSONStorage(() => {
    const storedData = localStorage.getItem('marketplace-storage');
    return storedData ? JSON.parse(storedData) : { agents: [], transactions: [] }; // Initialize as empty if not found
  });
  
  return {
    ...storage,
    setItem: (name: string, value: StorageValue<unknown>) => {
      try {
        if (estimateStorageSize(value) > STORAGE_LIMIT) {
          const state = JSON.parse(value as unknown as string);
          state.agents = cleanupOldData(state.agents);
          
          // If still too large, start removing oldest agents
          while (estimateStorageSize(state) > STORAGE_LIMIT && state.agents.length > 0) {
            state.agents.sort((a: AgentType, b: AgentType) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            state.agents.shift();
          }
          
          value = JSON.stringify(state) as unknown as StorageValue<unknown>;
        }
        
        // Ensure storage is defined and value is a string before setting it
        if (storage && typeof value === 'string') {
          storage.setItem(name, value);
        } else {
          console.error('Storage is undefined or value is not a string:', value);
        }
      } catch (error) {
        console.error('Storage error:', error);
      }
    },
    getItem: storage ? storage.getItem : () => null,
    removeItem: storage ? storage.removeItem : () => null
  };
};

const generateDummyAnalytics = (): AnalyticsType   => {
  const now = new Date();
  const dailyImpressions = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 1000) + 100
  }));

  const cryptoHoldings = [
    {
      symbol: 'BTC',
      amount: Math.random() * 2,
      value: Math.random() * 50000 + 30000,
      change24h: (Math.random() * 10) - 5
    },
    {
      symbol: 'ETH',
      amount: Math.random() * 20,
      value: Math.random() * 3000 + 1500,
      change24h: (Math.random() * 10) - 5
    },
    {
      symbol: 'SOL',
      amount: Math.random() * 200,
      value: Math.random() * 100 + 50,
      change24h: (Math.random() * 10) - 5
    },
    {
      symbol: 'DOGE',
      amount: Math.random() * 10000,
      value: Math.random() * 0.2 + 0.1,
      change24h: (Math.random() * 10) - 5
    }
  ];

  return {
    impressions: Math.floor(Math.random() * 10000) + 1000,
    engagementRate: Math.random() * 5 + 1,
    clickThroughRate: Math.random() * 2 + 0.5,
    dailyImpressions,
    topInteractions: [
      { type: 'Likes', count: Math.floor(Math.random() * 500) + 100 },
      { type: 'Retwineets', count: Math.floor(Math.random() * 300) + 50 },
      { type: 'Replies', count: Math.floor(Math.random() * 200) + 30 },
      { type: 'Quotes', count: Math.floor(Math.random() * 100) + 20 }
    ],
    reachByPlatform: [
      { platform: 'Mobile', count: Math.floor(Math.random() * 6000) + 2000 },
      { platform: 'Desktop', count: Math.floor(Math.random() * 3000) + 1000 },
      { platform: 'Tablet', count: Math.floor(Math.random() * 1000) + 500 }
    ],
    demographics: [
      { age: '18-24', percentage: Math.random() * 20 + 10 },
      { age: '25-34', percentage: Math.random() * 25 + 15 },
      { age: '35-44', percentage: Math.random() * 20 + 10 },
      { age: '45-54', percentage: Math.random() * 15 + 5 },
      { age: '55+', percentage: Math.random() * 10 + 5 }
    ],
    peakHours: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      engagement: Math.floor(Math.random() * 100) + 20
    })),
    cryptoHoldings
  };
};

export const useMarketplaceStore = create<MarketplaceStoreType>()(
  persist(
    (set, get) => ({
      agents: [],
      transactions: [],
      notification: null,
      setNotification: (notification: NotificationType | null) => set({ notification }),
      addAgent: async (agent: AgentType): Promise<string> => {
        const notification: NotificationType = {
          id: crypto.randomUUID(),
          type: 'create',
          message: `Agent ${agent.twinHandle} created successfully!`,
          twinHandle: agent.twinHandle,
          twitterHandle: agent.twitterHandle,
          timestamp: Date.now(),
        };

        set((state) => ({
          agents: [...state.agents, agent],
          notification,
        }));

        return agent.id;
      },
      buyShares: async (agentId: string, sharesToBuy: number) => {
        const agent = get().agents.find(a => a.id === agentId);
        if (!agent) return;

        set((state) => {
          const transaction: TransactionType = {
            id: crypto.randomUUID(),
            agentId,
            type: 'buy',
            shares: sharesToBuy,
            pricePerShare: agent.tokenShares.pricePerShare,
            totalAmount: agent.tokenShares.pricePerShare * sharesToBuy,
            timestamp: new Date().toISOString(),
          };

          const notification: NotificationType = {
            id: crypto.randomUUID(),
            type: 'buy',
            message: `Bought ${sharesToBuy} shares of @${agent.twinHandle}`,
            twitterHandle: agent.twitterHandle,
            twinHandle: agent.twinHandle,
            timestamp: Date.now(),
          };

          return {
            agents: state.agents.map((a) => {
              if (a.id === agentId && a.tokenShares.availableShares >= sharesToBuy) {
                return {
                  ...a,
                  tokenShares: {
                    ...a.tokenShares,
                    availableShares: a.tokenShares.availableShares - sharesToBuy,
                    shareholders: [...a.tokenShares.shareholders, {
                      userId: 'demo-user',
                      shares: sharesToBuy,
                      purchasePrice: a.tokenShares.pricePerShare,
                      purchaseDate: new Date().toISOString(),
                    }],
                    pricePerShare: a.tokenShares.pricePerShare * 1.01,
                  },
                };
              }
              return a;
            }),
            transactions: [transaction, ...state.transactions],
            notification,
          };
        });
      },
      sellShares: async (agentId: string, sharesToSell: number) => {
        const agent = get().agents.find(a => a.id === agentId);
        if (!agent) return;

        set((state) => {
          const transaction: TransactionType = {
            id: crypto.randomUUID(),
            agentId,
            type: 'sell',
            shares: sharesToSell,
            pricePerShare: agent.tokenShares.pricePerShare,
            totalAmount: agent.tokenShares.pricePerShare * sharesToSell,
            timestamp: new Date().toISOString(),
          };

          const notification: NotificationType = {
            id: crypto.randomUUID(),
            type: 'sell',
            message: `Sold ${sharesToSell} shares of @${agent.twitterHandle}`,
            twinHandle: agent.twinHandle,
            twitterHandle: agent.twitterHandle,
            timestamp: Date.now(),
          };

          return {
            agents: state.agents.map((a) => {
              if (a.id === agentId) {
                return {
                  ...a,
                  tokenShares: {
                    ...a.tokenShares,
                    availableShares: a.tokenShares.availableShares + sharesToSell,
                    shareholders: [...a.tokenShares.shareholders, {
                      userId: 'demo-user',
                      shares: -sharesToSell,
                      purchasePrice: a.tokenShares.pricePerShare,
                      purchaseDate: new Date().toISOString(),
                    }],
                    pricePerShare: a.tokenShares.pricePerShare * 0.99,
                  },
                };
              }
              return a;
            }),
            transactions: [transaction, ...state.transactions],
            notification,
          };
        });
      },
      verifyAgent: async (agentId: string) => {
        let success = false;
        set((state) => ({
          agents: state.agents.map((agent) => {
            if (agent.id === agentId && !agent.verification.isVerified) {
              const userShares = agent.tokenShares.shareholders
                .filter(s => s.userId === 'demo-user')
                .reduce((sum, s) => sum + s.shares, 0);
              
              const userValue = userShares * agent.tokenShares.pricePerShare;
              
              if (userValue >= 100) {
                success = true;
                return {
                  ...agent,
                  verification: {
                    isVerified: true,
                    verificationDate: new Date().toISOString(),
                  },
                  tokenShares: {
                    ...agent.tokenShares,
                    pricePerShare: agent.tokenShares.pricePerShare * 1.1,
                  },
                };
              }
            }
            return agent;
          }),
        }));
        return success;
      },
      getUserShares: (agentId: string) => {
        const agent = get().agents.find(a => a.id === agentId);
        if (!agent) return 0;

        return agent.tokenShares.shareholders
          .filter(s => s.userId === 'demo-user')
          .reduce((sum, s) => sum + s.shares, 0);
      },
      getAgents: () => get().agents,
      updateAnalytics: (agentId: string) => {
        set((state) => ({
          agents: state.agents.map(agent => 
            agent.id === agentId
              ? { ...agent, analytics: generateDummyAnalytics() }
              : agent
          )
        }));
      },
      getTransactionHistory: (agentId?: string) => {
        const state = get();
        return state.transactions
          .filter(t => !agentId || t.agentId === agentId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
    }),
    {
      name: 'marketplace-storage',
      storage: createCustomStorage(),
      version: 5,
    }
  )
);