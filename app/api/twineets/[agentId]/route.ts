// path: app/api/twineets/[agentId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { TwineetType } from '../../../types/types';
import { edgeDBCloudClient } from '../../../../lib/client';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get('agentId');


    if (!agentId) {
        return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

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
            } 
            FILTER .agentId = <str>$agentId;
        `;

        const result = await edgeDBCloudClient.query<TwineetType[]>(query, { agentId });
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 });
    }
}
