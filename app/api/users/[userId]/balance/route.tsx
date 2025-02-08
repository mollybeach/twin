// /api/users/[userId]/shares/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client'; // Adjust the import based on your project structure

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[3];

    try {
        const query = `
            SELECT User {
                userId
                walletBalance
            }
            FILTER .userId = <str>$userId;
        `;

        const user = await edgeDBCloudClient.query(query, { userId });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user balance:', error);
        return NextResponse.json({ error: 'Failed to fetch user balance' }, { status: 500 });
    }
}


