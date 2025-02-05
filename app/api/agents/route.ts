import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'edgedb';
import { AgentType } from '../../types/types';
import { insertAgent } from '../../../server/index';

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

export async function GET() {
    
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
            };
        `;

        const result = await edgeDBCloudClient.query<AgentType[]>(query);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ message: 'Error fetching agents' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const newAgentData = await req.json();
    console.log('POST Request received with data:', newAgentData);
    try {
        await insertAgent(newAgentData); 
        return NextResponse.json({ message: 'Agent created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating agent:', error);
        return NextResponse.json({ message: 'Error creating agent' }, { status: 500 });
    }
}
