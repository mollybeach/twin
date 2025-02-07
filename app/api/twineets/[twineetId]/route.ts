// path: app/api/twineets/[twineetId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { TwineetType } from '../../../types/types';
import { edgeDBCloudClient } from '../../../../lib/client';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twineetId = pathname.split('/')[3];

    console.log('Fetching twineet for twineetId:', twineetId);

    if (!twineetId) {
        return NextResponse.json({ message: 'Twineet ID is required' }, { status: 400 });
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
            FILTER .id = <uuid>$twineetId;
        `;

        const result = await edgeDBCloudClient.querySingle<TwineetType>(query, { twineetId });

        if (!result) {
            console.log('No twineet found for twineetId:', twineetId);
            return NextResponse.json({ message: 'Twineet not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching twineet:', error);
        return NextResponse.json({ message: 'Error fetching twineet' }, { status: 500 });
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