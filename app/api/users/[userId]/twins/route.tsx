// api/users/[userId]/twins/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client'; // Adjust the import based on your project structure
import { TwinType } from '../../../../types/types'; // Adjust the import based on your project structure


export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[3];

    try {
        // Query to fetch user token shares
        const query = `
            SELECT Twin {
                twinId,
                twinHandle,
                price,
                profileImage,
                isListed,
                tokenShares {
                    totalShares,
                    availableShares,
                    pricePerShare
                }
            }
            FILTER .userId = <str>$userId;
        `;

        const userTwins: TwinType[] = await edgeDBCloudClient.query(query, { userId });

        return NextResponse.json(userTwins);
    } catch (error) {
        console.error('Error fetching user twins:', error);
        return NextResponse.json({ error: 'Failed to fetch user twins' }, { status: 500 });
    }
}