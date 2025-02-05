// path: app/api/agents/[agentId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'edgedb';
import { AgentType } from '../../../types/types';

export async function GET(_req: NextRequest, { params }: { params: { agentId: string } }) {
    const { agentId } = params;

    if (!agentId) {
        return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

    const edgeDBCloudClient = createClient({
        instanceName: 'mollybeach/twindb',
        secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
    });

    try {
        const query = `
            SELECT Agent {
                id,
                agentId,
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
                    agentId,
                    clickThroughRate,
                    engagementRate,
                    impressions,
                    cryptoHoldings: {
                        agentId,
                        amount,
                        symbol,
                        value,
                        change24h
                    },
                    demographics: {
                        agentId,
                        age,
                        percentage
                    },
                    dailyImpressions: {
                        agentId,
                        count,
                        date
                    },
                    peakHours: {
                        agentId,
                        engagement,
                        hour
                    },
                    reachByPlatform: {
                        agentId,
                        platform,
                        count
                    },
                    topInteractions: {
                        agentId,
                        kind,
                        count
                    }
                },
                fetchedTweets: {
                    agentId,
                    text,
                    edit_history_tweet_ids,
                    timestamp
                },
                modelData,
                stats: {
                    agentId,
                    interactions,
                    replies,
                    uptime
                },
                tokenShares: {
                    agentId,
                    totalShares,
                    availableShares,
                    pricePerShare,
                    shareholders: {
                        agentId,
                        userId,
                        shares,
                        purchasePrice,
                        purchaseDate
                    }
                },
                tokenStats: {
                    agentId,
                    price,
                    change24h,
                    volume24h,
                    marketCap
                },
                twineets: {
                    id,
                    agentId,
                    content,
                    timestamp,
                    likes,
                    retwineets,
                    replies,
                    isLiked,
                    isRetwineeted
                },
                verification: {
                    agentId,
                    isVerified,
                    verificationDate
                },
                transactions: {
                    agentId,
                    kind,
                    shares,
                    pricePerShare,
                    totalAmount,
                    timestamp
                }
            } FILTER .agentId = <str>$agentId;
        `;

        const result = await edgeDBCloudClient.querySingle<AgentType>(query, { agentId });

        if (!result) {
            return NextResponse.json({ message: 'Agent not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching agent:', error);
        return NextResponse.json({ message: 'Error fetching agent' }, { status: 500 });
    }
}