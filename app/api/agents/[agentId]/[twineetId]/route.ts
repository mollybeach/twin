// path: app/api/twineets/[agentId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { TwineetType } from '../../../../types/types';
import { edgeDBCloudClient } from '../../../../../lib/client';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const agentId = pathname.split('/')[3];

    console.log('Fetching twineets for agentId:', agentId);

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

        if (result.length === 0) {
            console.log('No twineets found for agentId:', agentId);
            return NextResponse.json({ message: 'No twineets found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const newTwineet = await req.json();
    const { agentId, content } = newTwineet;

    if (!agentId || !content) {
        return NextResponse.json({ message: 'Agent ID and content are required' }, { status: 400 });
    }

    try {
        const query = `
            INSERT Twineet {
                agentId := <str>$agentId,
                content := <str>$content,
                timestamp := datetime_current(),
                likes := 0,
                retwineets := 0,
                replies := 0,
                isLiked := false,
                isRetwineeted := false
            };
        `;

        await edgeDBCloudClient.execute(query, { agentId, content });
        return NextResponse.json({ message: 'Twineet created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating twineet:', error);
        return NextResponse.json({ message: 'Error creating twineet' }, { status: 500 });
    }
}
