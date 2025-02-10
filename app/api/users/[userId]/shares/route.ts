// /api/users/[userId]/shares/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';
import { UserTokenShareType } from '../../../../types/types'; // Adjust the import based on your project structure


export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[3];

    try {
        const query = `
            SELECT UserTokenShare {
                twinId,
                shares,
                purchasePrice,
                purchaseDate
            }
            FILTER .userId = <str>$userId;
        `;
        const userShares: UserTokenShareType[] = await edgeDBCloudClient.query(query, { userId });
        return NextResponse.json(userShares);
    } catch (error) {
        console.error('Error fetching user shares:', error);
        return NextResponse.json({ error: 'Failed to fetch user shares' }, { status: 500 });
    }
}