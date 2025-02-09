// path: app/api/twineets/[twinId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { TwineetType } from '../../../../../types/types';
import { edgeDBCloudClient } from '../../../../../../lib/client';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twinId = pathname.split('/')[3];

    console.log('Fetching twineets for twinId:', twinId);

    if (!twinId) {
        return NextResponse.json({ message: 'Twin ID is required' }, { status: 400 });
    }

    try {
        const query = `
            SELECT Twineet {
                id,
                twinId,
                content,
                timestamp,
                likesCount,
                retwineetsCount,
                repliesCount,
                isLiked,
                isRetwineeted
            } 
            FILTER .twinId = <str>$twinId;
        `;

        const result = await edgeDBCloudClient.query<TwineetType[]>(query, { twinId });

        if (result.length === 0) {
            console.log('No twineets found for twinId:', twinId);
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
    const { twinId, content } = newTwineet;

    if (!twinId || !content) {
        return NextResponse.json({ message: 'Twin ID and content are required' }, { status: 400 });
    }

    try {
        const query = `
            INSERT Twineet {
                twinId := <str>$twinId,
                content := <str>$content,
                timestamp := datetime_current(),
                likesCount := 0,
                retwineetsCount := 0,
                repliesCount := 0,
                isLiked := false,
                isRetwineeted := false
            };
        `;

        await edgeDBCloudClient.execute(query, { twinId, content });
        return NextResponse.json({ message: 'Twineet created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating twineet:', error);
        return NextResponse.json({ message: 'Error creating twineet' }, { status: 500 });
    }
}
