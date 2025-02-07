import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TwinType, TransactionType, NotificationType, UserTokenShareType, AnalyticsType, MarketplaceStoreType } from '../types/types';

// Storage limit (4.5MB to stay safely under 5MB limit)
const STORAGE_LIMIT = 4.5 * 1024 * 1024;

// Helper function to estimate storage size
const estimateStorageSize = (data: unknown): number => {
  return new Blob([JSON.stringify(data)]).size;
};

// Helper function to clean up old data
const cleanupOldData = (twins: TwinType[]): TwinType[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return twins
    .filter((twin) => new Date(twin.createdAt) > thirtyDaysAgo)
    .map((twin) => ({
      ...twin,
      tokenShares: {
        ...twin.tokenShares,
        shareholders: twin.tokenShares.shareholders.slice(-20), // Keep only last 20 transactions
      },
      analytics: {
        ...twin.analytics,
        dailyImpressions: twin.analytics.dailyImpressions.slice(-30), // Keep only last 30 days
        topInteractions: twin.analytics.topInteractions.slice(0, 5), // Keep only top 5
        demographics: twin.analytics.demographics.slice(0, 5), // Keep only top 5 age groups
        peakHours: twin.analytics.peakHours.slice(0, 24), // Keep only 24 hours
        cryptoHoldings: twin.analytics.cryptoHoldings.slice(0, 4), // Keep only top 4 holdings
      },
    }));
};

// Custom storage with error handling and size checks
const createCustomStorage = () => {
  return {
    getItem: (name: string) => {
      const storedData = localStorage.getItem(name);
      return storedData ? JSON.parse(storedData) : { twins: [], transactions: [], notifications: [] };
    },
    setItem: (name: string, value: unknown) => {
      try {
        let state = JSON.parse(value as string);

        // Clean up old data if storage exceeds the limit
        if (estimateStorageSize(state) > STORAGE_LIMIT) {
          state.twins = cleanupOldData(state.twins);

          // Remove oldest twins if still too large
          while (estimateStorageSize(state) > STORAGE_LIMIT && state.twins.length > 0) {
            state.twins.sort((a: TwinType, b: TwinType) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            state.twins.shift();
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

// Create the marketplace store
const useMarketplaceStore = create<MarketplaceStoreType>()(
  persist(
    (set, get) => ({
      twins: [],
      transactions: [],
      notifications: [],
      notification: null,
      setNotification: (notification: NotificationType | null) => set({ notification }),
      addTwin: async (twin: TwinType) => {
        set((state) => ({
          twins: [
            ...state.twins,
            {
              ...twin,
              verification: {
                twinId: twin.twinId,
                isVerified: false,
                verificationDate: new Date(),
              },
            },
          ],
        }));
        return twin.twinId;
      },
      buyShares: async (twinId: string, shares: number) => {
        const twin = get().twins.find((a) => a.twinId === twinId);
        if (!twin) return;

        const newUserTokenShare: UserTokenShareType = {
          twinId,
          userId: 'demo-user',
          shares,
          purchasePrice: twin.tokenShares.pricePerShare,
          purchaseDate: new Date(),
        };

        set((state) => ({
          twins: state.twins.map((a) =>
            a.twinId === twinId
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
      sellShares: async (twinId: string, shares: number) => {
        const twin = get().twins.find((a) => a.twinId === twinId);
        if (!twin) return;

        const transaction: TransactionType = {
          twinId,
          kind: 'sell',
          shares,
          pricePerShare: twin.tokenShares.pricePerShare,
          totalAmount: twin.tokenShares.pricePerShare * shares,
          timestamp: new Date(),
        };

        set((state) => ({
          twins: state.twins.map((a) =>
            a.twinId === twinId
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
      verifyTwin: async (twinId: string) => {
        let success = false;
        set((state) => ({
          twins: state.twins.map((twin) => {
            if (twin.twinId === twinId && !twin.verification.isVerified) {
              const userShares = twin.tokenShares.shareholders
                .filter((s) => s.userId === 'demo-user')
                .reduce((sum, s) => sum + s.shares, 0);

              const userValue = userShares * twin.tokenShares.pricePerShare;

              if (userValue >= 100) {
                success = true;
                return {
                  ...twin,
                  verification: {
                    twinId: twinId,
                    isVerified: true,
                    verificationDate: new Date(),
                  },
                  tokenShares: {
                    ...twin.tokenShares,
                    pricePerShare: twin.tokenShares.pricePerShare * 1.1,
                  },
                };
              }
            }
            return twin;
          }),
        }));
        return success;
      },
      getUserShares: (twinId: string) => {
        const twin = get().twins.find((a) => a.twinId === twinId);
        if (!twin) return 0;

        return twin.tokenShares.shareholders
          .filter((s) => s.userId === 'demo-user')
          .reduce((sum, s) => sum + s.shares, 0);
      },
      getTwins: () => get().twins,
      updateAnalytics: (twinId: string) => {
        set((state) => ({
          twins: state.twins.map((twin) =>
            twin.twinId === twinId
              ? { ...twin, analytics: twin.analytics }
              : twin
          ),
        }));
      },
      getTransactionHistory: (twinId?: string) => {
        const state = get();
        return state.transactions
          .filter((t) => !twinId || t.twinId === twinId)
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