// path: app/api/twineets/route.ts
import { NextResponse } from 'next/server';
import { TwineetType } from '../../types/types';
import { edgeDBCloudClient } from '../../../lib/client';

export async function GET() {
    try {
        const query = `
            SELECT Twineet {
                id,
                agentId,
                content,
                timestamp,
                likes,
                retwineets,
                replies,
                isLiked,
                isRetwineeted
            };
        `;

        const result = await edgeDBCloudClient.query<TwineetType[]>(query);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 });
    }
}
