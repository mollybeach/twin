// Default data for the agent

import { AgentType } from '../types/types';

export const defaultAgent: AgentType = {
        agentId: '',
        createdAt: new Date(),
        twinHandle: '',
        twitterHandle: '',
        profileImage: 'https://i.imgur.com/HDQ3OTC.png', 
        personality: 'friendly',
        description: '',
        autoReply: true,
        price: 1000,
        isListed: false,
        modelData: {},
        fetchedTweets: [],
        twineets: [],
        stats: { 
            agentId: '',
            replies: 0, 
            interactions: 0, 
            uptime: '0h 0m' 
        },
        tokenShares: {
            agentId: '',
            totalShares: 0,
            availableShares: 0,
            pricePerShare: 0,
            shareholders: [
                {
                    agentId: '',
                    userId: '',
                    shares: 0,
                    purchasePrice: 0,
                    purchaseDate: new Date()
                }
            ]
        },
        verification: {
            agentId: '',
            isVerified: false,
            verificationDate: new Date()
        },
        analytics: {
            agentId: '',
            impressions: 0,
            engagementRate: 0,
            clickThroughRate: 0,
            cryptoHoldings: {
                agentId: '',
                amount: 0,
                symbol: '',
                change24h: 0,
                value: 0
            },
            demographics: {
                agentId: '',
                age: '',
                percentage: 0
            },
            dailyImpressions: {
                agentId: '',
                count: 0,
                date: new Date()
            },
            peakHours: {
                agentId: '',
                engagement: 0,
                hour: 0
            },
            reachByPlatform: {
                agentId: '',
                platform: '',
                count: 0
            },
            topInteractions: {
                agentId: '',
                kind: '',
                count: 0
            },
        },
        tokenStats: {
            agentId: '',
            price: 0,
            change24h: 0,
            volume24h: 0,
            marketCap: 0
        },
        transactions: [
            {
                agentId: '',
                kind: 'buy',
                shares: 0,
                pricePerShare: 0,
                totalAmount: 0,
                timestamp: new Date()
            }
        ]
}