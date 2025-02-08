// path: app/api/users/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';
import { UserType } from '../../../types/types';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[3];
    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }
// get AL the user data  and the inner data
    try {
        const query = `
            SELECT User {
                userId,
                username,
                email,
                walletBalance,
                walletAddress,
                createdAt,
                birthday,
                twins : {
                    twinId,
                    twinHandle,
                    twitterHandle,
                    profileImage,
                    isListed,
                    price,
                    twineets : {
                        twinId,
                        content,
                        timestamp,
                        likes,
                        retwineets,
                        replies
                    }
                },
                notifications :{
                    twinId,
                    kind,
                    message,
                    twinHandle,
                    twitterHandle,
                    timestamp
                },
                tokenShares : {
                    twinId,
                    pricePerShare,
                    totalShares,
                    availableShares,
                    shareholders : {
                        twinId,
                        userId,
                        shares,
                        purchasePrice,
                        purchaseDate
                    }
                },
                userTokenShares :{
                    twinId,
                    shares,
                    purchasePrice,
                    purchaseDate
                },
                likes :{
                    twinId,
                    userId
                },
                retwineets :{
                    twinId,
                    userId
                },
                replies :{
                    twinId,
                    userId
                }
            }
            FILTER .userId = <str>$userId
        `;
        const result = await edgeDBCloudClient.querySingle<UserType>(query, { userId })
        console.log('User data:', result);

        if (!result) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(result);  
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
    }
}
