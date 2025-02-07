// path: app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../lib/client';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[3];

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const query = `
            SELECT User {
                id,
                username,
                email,
                birthday,
                walletAddress,
                createdAt,
                transactions,
                twins,
                notifications,
                tokenShares,
                userTokenShares,
                twins: {
                    id,
                    twinHandle,
                    profileImage,
                    description,
                    price,
                    tokenShares: {
                        availableShares,
                        totalShares,
                        pricePerShare,
                        shareholders
                    },
                    verification: {
                        isVerified
                    },
                    stats: {
                        replies,
                        interactions
                    }
                } FILTER .owner.id != <uuid>$userId
            }
        `;

        const result = await edgeDBCloudClient.query(query);
        console.log('User data:', result);

        return NextResponse.json(result, { status: 200 });  
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}