// Default data for the twin

import { TwinType } from '../types/types';
import { TwinIdType, UserIdType } from '../types/types';
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDescription = () => {
    const descriptions = [
        'This Twin is a friendly and professional twin.',
        'This Twin is a casual and witty twin.',
        'This Twin is a witty and casual twin.',
        'This Twin is evil and wants to destroy the world'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}
// Factory function to create a new default twin
export const defaultTwin = (newTwinId: TwinIdType, myUserId: UserIdType): TwinType => {

    return {
        twinId: newTwinId,
        userId: myUserId,
        timestamp: new Date(),
        twinHandle: '',
        twitterHandle: '',
        profileImage: 'https://i.imgur.com/HDQ3OTC.png', 
        personality: ['friendly', 'professional', 'casual', 'witty'][Math.floor(Math.random() * 4)],
        description: getRandomDescription(),
        autoReply: true,
        price: getRandomInt(100, 1000),
        isListed: Math.random() < 0.5,
        modelData: {},
        fetchedTweets: [],
        twineets: [],
        stats: { 
            twinId: newTwinId,
            repliesCount: getRandomInt(0, 100),
            interactions: getRandomInt(0, 100),
            uptime: `${getRandomInt(0, 24)}h ${getRandomInt(0, 59)}m` 
        },
        tokenShares: {
            twinId: newTwinId,
            totalShares: getRandomInt(0, 1000),
            availableShares: getRandomInt(0, 1000),
            pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
            shareholders: [
                {
                    twinId: newTwinId,
                    userId: myUserId,
                    shares: getRandomInt(1, 100),
                    purchasePrice: parseFloat((Math.random() * 100).toFixed(2)),
                    purchaseDate: new Date()
                }
            ]
        },
        verification: {
            twinId: newTwinId,
            isVerified: Math.random() < 0.5,
            verificationDate: new Date()
        },
        analytics: {
            twinId: newTwinId,
            impressions: getRandomInt(0, 1000),
            engagementRate: parseFloat((Math.random() * 100).toFixed(2)),
            clickThroughRate: parseFloat((Math.random() * 100).toFixed(2)),
            cryptoHoldings: [
                {
                    twinId: newTwinId,
                    amount: getRandomInt(0, 1000),
                    symbol: 'BTC',
                    value: getRandomInt(0, 1000),
                    change24h: parseFloat((Math.random() * 10 - 5).toFixed(2))
                }   
            ],
            demographics: [
                {
                    twinId: newTwinId,
                    age: '18-24',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: newTwinId,
                    age: '25-34',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: newTwinId,
                    age: '35-44',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: newTwinId,
                    age: '45-54',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                },
                {
                    twinId: newTwinId,
                    age: '55+',
                    percentage: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            dailyImpressions: [
                {
                    twinId: newTwinId,
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    date: new Date(),
                    count: getRandomInt(0, 1000)
                }
            ],
            peakHours: [
                {
                    twinId: newTwinId,
                    hour: getRandomInt(0, 23),
                    engagement: parseFloat((Math.random() * 100).toFixed(2))
                }
            ],
            reachByPlatform: [
                {
                    twinId: newTwinId,
                    platform: 'mobile',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    platform: 'desktop',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    platform: 'tablet',
                    count: getRandomInt(0, 1000)
                }
            ],
            topInteractions: [
                {
                    twinId: newTwinId,
                    kind: 'likes',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    kind: 'retwineets',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    kind: 'replies',
                    count: getRandomInt(0, 1000)
                },
                {
                    twinId: newTwinId,
                    kind: 'quotes',
                    count: getRandomInt(0, 1000)
                }
            ]
        },
        tokenStats: {
            twinId: newTwinId,
            price: parseFloat((Math.random() * 100).toFixed(2)),
            change24h: parseFloat((Math.random() * 10 - 5).toFixed(2)),
            volume24h: getRandomInt(0, 10000),
            marketCap: parseFloat((Math.random() * 100000).toFixed(2))
        },
        transactions: [
            {
                twinId: newTwinId,
                trade: getRandomInt(0, 1) === 0 ? 'buy' : 'sell',
                shares: getRandomInt(1, 100),
                pricePerShare: parseFloat((Math.random() * 100).toFixed(2)),
                totalAmount: parseFloat((Math.random() * 1000).toFixed(2)),
                timestamp: new Date()
            }
        ]
    }
}
