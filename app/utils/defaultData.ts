// Default data for the agent

import { AgentType } from '../types/types';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const defaultAgent: AgentType = {
        agentId: '',
        createdAt: new Date(),
        twinHandle: '',
        twitterHandle: '',
        profileImage: 'https://i.imgur.com/HDQ3OTC.png', 
        personality: '',
        description: 'This is a default description for the agent.',
        autoReply: Math.random() < 0.5,
        price: getRandomInt(100, 1000),
        isListed: Math.random() < 0.5,
        modelData: {},
        fetchedTweets: [],
        twineets: [],
        stats: { 
            agentId: '',
            replies: getRandomInt(0, 100),
            interactions: getRandomInt(0, 100),
            uptime: `${getRandomInt(0, 24)}h ${getRandomInt(0, 59)}m` 
        },
        tokenShares: {
            agentId: '',
            totalShares: getRandomInt(0, 1000),
            availableShares: getRandomInt(0, 1000),
            pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
            shareholders: [
                {
                    agentId: '',
                    userId: `user-${Math.random().toString(36).substr(2, 9)}`,
                    shares: getRandomInt(1, 100),
                    purchasePrice: parseFloat((Math.random() * 100).toFixed(2)),
                    purchaseDate: new Date()
                }
            ]
        },
        verification: {
            agentId: '',
            isVerified: Math.random() < 0.5,
            verificationDate: new Date()
        },
        analytics: {
            agentId: '',
            impressions: getRandomInt(0, 1000),
            engagementRate: parseFloat((Math.random() * 100).toFixed(2)),
            clickThroughRate: parseFloat((Math.random() * 100).toFixed(2)),
            cryptoHoldings: [
                {
                    agentId: '',
                    amount: getRandomInt(0, 1000),
                    symbol: 'BTC',
                    value: getRandomInt(0, 1000),
                    change24h: parseFloat((Math.random() * 10 - 5).toFixed(2))
                }   
            ],
            demographics: [
                {
                    agentId: '',
                    age: '18-24',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    agentId: '',
                    age: '25-34',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    agentId: '',
                    age: '35-44',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    agentId: '',
                    age: '45-54',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    agentId: '',
                    age: '55+',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            dailyImpressions: [
                {
                    agentId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                }
            ],
            peakHours: [
                {
                    agentId: '',
                    hour: getRandomInt(0, 23),
                    engagement: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            reachByPlatform: [
                {
                    agentId: '',
                    platform: 'mobile',
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    platform: 'desktop',
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    platform: 'tablet',
                    count: getRandomInt(0, 1000)
                }
            ],
            topInteractions: [
                {
                    agentId: '',
                    kind: 'likes',
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    kind: 'retwineets',
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    kind: 'replies',
                    count: getRandomInt(0, 1000)
                },
                {
                    agentId: '',
                    kind: 'quotes',
                    count: getRandomInt(0, 1000)
                }
            ]
        },
        tokenStats: {
            agentId: '',
            price: parseFloat((Math.random() * 100).toFixed(2)),
            change24h: parseFloat((Math.random() * 10 - 5).toFixed(2)),
            volume24h: getRandomInt(0, 10000),
            marketCap: parseFloat((Math.random() * 100000).toFixed(2))
        },
        transactions: [
            {
                agentId: '',
                kind: getRandomInt(0, 1) === 0 ? 'buy' : 'sell',
                shares: getRandomInt(1, 100),
                pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
                totalAmount: parseFloat((Math.random() * 1000).toFixed(2)),
                timestamp: new Date()
            }
        ]
}