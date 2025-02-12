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
                userId,
                twinId,
                autoReply,
                timestamp,
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
                    tweetId,
                    timestamp
                },
                modelData,
                stats: {
                    twinId,
                    interactions,
                    repliesCount
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
                    repliesCount
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
                    trade,
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
/*
export async function PUT(req: NextRequest) {
    const { twinId, fetchedTweets, twineets } = await req.json(); // Ensure twinId is included
    console.log('PUT REQUEST RECEIVED: ', twinId, fetchedTweets, twineets);
    
    try {
        // Ensure fetchedTweets and twineets are arrays of the correct type
        const fetchedTweetsArray = fetchedTweets.map((tweet: FetchedTweetType) => ({
            twinId: tweet.twinId,
            text: tweet.text,
            tweetId: tweet.tweetId,
            timestamp: tweet.timestamp,
        }));

        const twineetsArray = twineets.map((twineet: TwineetType) => ({
            id: twineet.id,
            twinId: twineet.twinId,
            content: twineet.content,
            timestamp: twineet.timestamp,
            likesCount: twineet.likesCount,
            retwineetsCount: twineet.retwineetsCount,
            repliesCount: twineet.repliesCount,
            isLiked: twineet.isLiked,
            isRetwineeted: twineet.isRetwineeted,
        }));

        console.log('fetchedTweetsArray: ', fetchedTweetsArray);
        console.log('typeof fetchedTweetsArray: ', typeof fetchedTweetsArray);
        console.log('twineetsArray: ', twineetsArray);
        console.log('typeof twineetsArray: ', typeof twineetsArray);
        const query = `
        UPDATE Twin
        FILTER .twinId = <str>$twinId
        SET {
            twineets := <array<Twineet>>$twineets,
            fetchedTweets := <array<FetchedTweet>>$fetchedTweets
        };
        `;

        await edgeDBCloudClient.querySingle<TwinType>(query, { 
            twinId, 
            twineets: twineetsArray,
            fetchedTweets: fetchedTweetsArray, 
         
        });
        console.log('Twin updated successfully: ', twinId, fetchedTweetsArray, twineetsArray);

        return NextResponse.json({ message: 'Twin updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating twin:', error);
        return NextResponse.json({ message: 'Error updating twin' }, { status: 500 });
    }
}*/