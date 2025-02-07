// Default data for the twin

import { TwinType } from '../types/types';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const defaultTwin: TwinType = {
        twinId: '',
        createdAt: new Date(),
        twinHandle: '',
        twitterHandle: '',
        profileImage: 'https://i.imgur.com/HDQ3OTC.png', 
        personality: ['friendly', 'professional', 'casual', 'witty'][Math.floor(Math.random() * 4)],
        description: 'This is a default description for the twin.',
        autoReply: true,
        price: getRandomInt(100, 1000),
        isListed: Math.random() < 0.5,
        modelData: {},
        fetchedTweets: [],
        twineets: [],
        stats: { 
            twinId: '',
            replies: getRandomInt(0, 100),
            interactions: getRandomInt(0, 100),
            uptime: `${getRandomInt(0, 24)}h ${getRandomInt(0, 59)}m` 
        },
        tokenShares: {
            twinId: '',
            totalShares: getRandomInt(0, 1000),
            availableShares: getRandomInt(0, 1000),
            pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
            shareholders: [
                {
                    twinId: '',
                    userId: `user-${Math.random().toString(36).substr(2, 9)}`,
                    shares: getRandomInt(1, 100),
                    purchasePrice: parseFloat((Math.random() * 100).toFixed(2)),
                    purchaseDate: new Date()
                }
            ]
        },
        verification: {
            twinId: '',
            isVerified: Math.random() < 0.5,
            verificationDate: new Date()
        },
        analytics: {
            twinId: '',
            impressions: getRandomInt(0, 1000),
            engagementRate: parseFloat((Math.random() * 100).toFixed(2)),
            clickThroughRate: parseFloat((Math.random() * 100).toFixed(2)),
            cryptoHoldings: [
                {
                    twinId: '',
                    amount: getRandomInt(0, 1000),
                    symbol: 'BTC',
                    value: getRandomInt(0, 1000),
                    change24h: parseFloat((Math.random() * 10 - 5).toFixed(2))
                }   
            ],
            demographics: [
                {
                    twinId: '',
                    age: '18-24',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: '',
                    age: '25-34',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: '',
                    age: '35-44',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: '',
                    age: '45-54',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: '',
                    age: '55+',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            dailyImpressions: [
                {
                    twinId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                }
            ],
            peakHours: [
                {
                    twinId: '',
                    hour: getRandomInt(0, 23),
                    engagement: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            reachByPlatform: [
                {
                    twinId: '',
                    platform: 'mobile',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    platform: 'desktop',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    platform: 'tablet',
                    count: getRandomInt(0, 1000)
                }
            ],
            topInteractions: [
                {
                    twinId: '',
                    kind: 'likes',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    kind: 'retwineets',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    kind: 'replies',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: '',
                    kind: 'quotes',
                    count: getRandomInt(0, 1000)
                }
            ]
        },
        tokenStats: {
            twinId: '',
            price: parseFloat((Math.random() * 100).toFixed(2)),
            change24h: parseFloat((Math.random() * 10 - 5).toFixed(2)),
            volume24h: getRandomInt(0, 10000),
            marketCap: parseFloat((Math.random() * 100000).toFixed(2))
        },
        transactions: [
            {
                twinId: '',
                kind: getRandomInt(0, 1) === 0 ? 'buy' : 'sell',
                shares: getRandomInt(1, 100),
                pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
                totalAmount: parseFloat((Math.random() * 1000).toFixed(2)),
                timestamp: new Date()
            }
        ]
}