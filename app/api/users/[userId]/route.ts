// path: app/api/users/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userId = pathname.split('/')[4];
    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const query = `
            SELECT User {
                id,
                username,
                email
            }
            FILTER .id = <uuid>$userId
        `;

        const result = await edgeDBCloudClient.query(query, { userId });
        console.log('User data:', result);

        if (result.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(result[0], { status: 200 });  
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
    }
}
