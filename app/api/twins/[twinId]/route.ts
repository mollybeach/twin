// path: app/api/twins/[twinId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';
import { TwinType } from '../../../types/types';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twinId = pathname.split('/')[3];

    if (!twinId) {
        return NextResponse.json({ message: 'Twin ID is required' }, { status: 400 });
    }

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
            } FILTER .twinId = <str>$twinId;
        `;

        const result = await edgeDBCloudClient.querySingle<TwinType>(query, { twinId });

        if (!result) {
            return NextResponse.json({ message: 'Twin not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching twin:', error);
        return NextResponse.json({ message: 'Error fetching twin' }, { status: 500 });
    }
}