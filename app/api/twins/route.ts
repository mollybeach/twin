import { NextRequest, NextResponse } from 'next/server';
import { TwinType } from '../../types/types';
import { insertTwin } from '../../../lib/queries';
import { edgeDBCloudClient } from '../../../lib/client';

export async function GET() {
    try {
        const query = `
            SELECT Twin {
                id,
                twinId,
                autoReply,
                createdAt,
                description,
                personality,
                price,
                profileImage,
                isListed,
                twinHandle,
                twitterHandle,
                analytics: {
                    twinId,
                    clickThroughRate,
                    engagementRate,
                    impressions,
                    cryptoHoldings: {
                        twinId,
                        amount,
                        symbol,
                        value,
                        change24h
                    },
                    demographics: {
                        twinId,
                        age,
                        percentage
                    },
                    dailyImpressions: {
                        twinId,
                        count,
                        date
                    },
                    peakHours: {
                        twinId,
                        engagement,
                        hour
                    },
                    reachByPlatform: {
                        twinId,
                        platform,
                        count
                    },
                    topInteractions: {
                        twinId,
                        kind,
                        count
                    }
                },
                fetchedTweets: {
                    twinId,
                    text,
                    edit_history_tweet_ids,
                    timestamp
                },
                modelData,
                stats: {
                    twinId,
                    interactions,
                    replies,
                    uptime
                },
                tokenShares: {
                    twinId,
                    totalShares,
                    availableShares,
                    pricePerShare,
                    shareholders: {
                        twinId,
                        userId,
                        shares,
                        purchasePrice,
                        purchaseDate
                    }
                },
                tokenStats: {
                    twinId,
                    price,
                    change24h,
                    volume24h,
                    marketCap
                },
                twineets: {
                    id,
                    twinId,
                    content,
                    timestamp,
                    likes,
                    retwineets,
                    replies,
                    isLiked,
                    isRetwineeted
                },
                verification: {
                    twinId,
                    isVerified,
                    verificationDate
                },
                transactions: {
                    twinId,
                    kind,
                    shares,
                    pricePerShare,
                    totalAmount,
                    timestamp
                }
            };
        `;

        const result = await edgeDBCloudClient.query<TwinType[]>(query);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching twins:', error);
        return NextResponse.json({ message: 'Error fetching twins' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const newTwinData = await req.json();
    console.log('POST Request received with data:', newTwinData);
    try {
        await insertTwin(newTwinData); 
        return NextResponse.json({ message: 'Twin created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating twin:', error);
        return NextResponse.json({ message: 'Error creating twin' }, { status: 500 });
    }
}
