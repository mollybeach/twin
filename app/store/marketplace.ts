import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AgentType, TransactionType, NotificationType, UserTokenShareType, AnalyticsType, MarketplaceStoreType } from '../types/types';

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
    .filter((agent) => new Date(agent.createdAt) > thirtyDaysAgo)
    .map((agent) => ({
      ...agent,
      tokenShares: {
        ...agent.tokenShares,
        shareholders: agent.tokenShares.shareholders.slice(-20), // Keep only last 20 transactions
      },
      analytics: {
        ...agent.analytics,
        dailyImpressions: agent.analytics.dailyImpressions.slice(-30), // Keep only last 30 days
        topInteractions: agent.analytics.topInteractions.slice(0, 5), // Keep only top 5
        demographics: agent.analytics.demographics.slice(0, 5), // Keep only top 5 age groups
        peakHours: agent.analytics.peakHours.slice(0, 24), // Keep only 24 hours
        cryptoHoldings: agent.analytics.cryptoHoldings.slice(0, 4), // Keep only top 4 holdings
      },
    }));
};

// Custom storage with error handling and size checks
const createCustomStorage = () => {
  return {
    getItem: (name: string) => {
      const storedData = localStorage.getItem(name);
      return storedData ? JSON.parse(storedData) : { agents: [], transactions: [], notifications: [] };
    },
    setItem: (name: string, value: unknown) => {
      try {
        let state = JSON.parse(value as string);

        // Clean up old data if storage exceeds the limit
        if (estimateStorageSize(state) > STORAGE_LIMIT) {
          state.agents = cleanupOldData(state.agents);

          // Remove oldest agents if still too large
          while (estimateStorageSize(state) > STORAGE_LIMIT && state.agents.length > 0) {
            state.agents.sort((a: AgentType, b: AgentType) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            state.agents.shift();
          }

          state = JSON.stringify(state);
        }

        localStorage.setItem(name, state);
      } catch (error) {
        console.error('Storage error:', error);
      }
    },
    removeItem: (name: string) => localStorage.removeItem(name),
  };
};

// Generate dummy analytics for an agent
const generateDummyAnalytics = (agentId: string): AnalyticsType => {
  const now = new Date();
  const dailyImpressions = Array.from({ length: 30 }, (_, i) => ({
    agentId,
    date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 1000) + 100,
  }));

  const cryptoHoldings = [
    { agentId, symbol: 'BTC', amount: Math.random() * 2, value: Math.random() * 50000 + 30000, change24h: Math.random() * 10 - 5 },
    { agentId, symbol: 'ETH', amount: Math.random() * 20, value: Math.random() * 3000 + 1500, change24h: Math.random() * 10 - 5 },
    { agentId, symbol: 'SOL', amount: Math.random() * 200, value: Math.random() * 100 + 50, change24h: Math.random() * 10 - 5 },
    { agentId, symbol: 'DOGE', amount: Math.random() * 10000, value: Math.random() * 0.2 + 0.1, change24h: Math.random() * 10 - 5 },
  ];

  return {
    agentId,
    impressions: Math.floor(Math.random() * 10000) + 1000,
    engagementRate: Math.random() * 5 + 1,
    clickThroughRate: Math.random() * 2 + 0.5,
    dailyImpressions: [
      { agentId, date: new Date(), count: Math.floor(Math.random() * 1000) + 100 },
      { agentId, date: new Date(), count: Math.floor(Math.random() * 1000) + 100 },
      { agentId, date: new Date(), count: Math.floor(Math.random() * 1000) + 100 },
    ],
    topInteractions: [
      { agentId, kind: 'likes', count: Math.floor(Math.random() * 500) + 100 },
      { agentId, kind: 'retwineets', count: Math.floor(Math.random() * 300) + 50 },
      { agentId, kind: 'replies', count: Math.floor(Math.random() * 200) + 30 },
      { agentId, kind: 'quotes', count: Math.floor(Math.random() * 100) + 20 },
    ],
    reachByPlatform: [
      { agentId, platform: 'mobile', count: Math.floor(Math.random() * 6000) + 2000 },
      { agentId, platform: 'desktop', count: Math.floor(Math.random() * 3000) + 1000 },
      { agentId, platform: 'tablet', count: Math.floor(Math.random() * 1000) + 500 },
    ],
    demographics: [
      { agentId, age: '18-24', percentage: Math.random() * 20 + 10 },
      { agentId, age: '25-34', percentage: Math.random() * 25 + 15 },
      { agentId, age: '35-44', percentage: Math.random() * 20 + 10 },
      { agentId, age: '45-54', percentage: Math.random() * 15 + 5 },
      { agentId, age: '55+', percentage: Math.random() * 10 + 5 },
    ],
    peakHours: Array.from({ length: 24 }, (_, i) => ({
      agentId,
      hour: i,
      engagement: Math.floor(Math.random() * 100) + 20,
    })),
    cryptoHoldings,
  };
};

// Create the marketplace store
const useMarketplaceStore = create<MarketplaceStoreType>()(
  persist(
    (set, get) => ({
      agents: [],
      transactions: [],
      notifications: [],
      notification: null, // Added missing 'notification' property
      setNotification: (notification: NotificationType | null) => set({ notification }),
      addAgent: async (agent: AgentType) => {
        set((state) => ({
          agents: [
            ...state.agents,
            {
              ...agent,
              verification: {
                agentId: agent.agentId,
                isVerified: false,
                verificationDate: new Date(),
              },
            },
          ],
        }));
        return agent.agentId;
      },
      buyShares: async (agentId: string, shares: number) => {
        const agent = get().agents.find((a) => a.agentId === agentId);
        if (!agent) return;

        const newUserTokenShare: UserTokenShareType = {
          agentId,
          userId: 'demo-user',
          shares,
          purchasePrice: agent.tokenShares.pricePerShare,
          purchaseDate: new Date(),
        };

        set((state) => ({
          agents: state.agents.map((a) =>
            a.agentId === agentId
              ? {
                  ...a,
                  tokenShares: {
                    ...a.tokenShares,
                    availableShares: a.tokenShares.availableShares - shares,
                    shareholders: [...a.tokenShares.shareholders, newUserTokenShare],
                  },
                }
              : a
          ),
        }));
      },
      sellShares: async (agentId: string, shares: number) => {
        const agent = get().agents.find((a) => a.agentId === agentId);
        if (!agent) return;

        const transaction: TransactionType = {
          agentId,
          kind: 'sell',
          shares,
          pricePerShare: agent.tokenShares.pricePerShare,
          totalAmount: agent.tokenShares.pricePerShare * shares,
          timestamp: new Date()
        };

        set((state) => ({
          agents: state.agents.map((a) =>
            a.agentId === agentId
              ? {
                  ...a,
                  tokenShares: {
                    ...a.tokenShares,
                    availableShares: a.tokenShares.availableShares + shares,
                  },
                }
              : a
          ),
          transactions: [transaction, ...state.transactions],
        }));
      },
      verifyAgent: async (agentId: string) => {
        let success = false;
        set((state) => ({
          agents: state.agents.map((agent) => {
            if (agent.agentId === agentId && !agent.verification.isVerified) {
              const userShares = agent.tokenShares.shareholders
                .filter((s) => s.userId === 'demo-user')
                .reduce((sum, s) => sum + s.shares, 0);

              const userValue = userShares * agent.tokenShares.pricePerShare;

              if (userValue >= 100) {
                success = true;
                return {
                  ...agent,
                  verification: {
                    agentId: agentId,
                    isVerified: true,
                    verificationDate: new Date(),
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
        const agent = get().agents.find((a) => a.agentId === agentId);
        if (!agent) return 0;

        return agent.tokenShares.shareholders
          .filter((s) => s.userId === 'demo-user')
          .reduce((sum, s) => sum + s.shares, 0);
      },
      getAgents: () => get().agents,
      updateAnalytics: (agentId: string) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.agentId === agentId
              ? { ...agent, analytics: generateDummyAnalytics(agentId) }
              : agent
          ),
        }));
      },
      getTransactionHistory: (agentId?: string) => {
        const state = get();
        return state.transactions
          .filter((t) => !agentId || t.agentId === agentId)
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

export { useMarketplaceStore };