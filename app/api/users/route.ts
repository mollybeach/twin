// path: app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../lib/client';

export async function GET(req: NextRequest) {
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
        `;

        const result = await edgeDBCloudClient.query(query);
        console.log('All users data:', result);

        return NextResponse.json(result, { status: 200 });  
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}