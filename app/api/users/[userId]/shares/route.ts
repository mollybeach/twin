// /api/users/[userId]/shares/route.ts
import { NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client'; // Adjust the import based on your project structure
import { UserTokenShareType } from '../../../../types/types'; // Adjust the import based on your project structure

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        // Query to fetch user token shares
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