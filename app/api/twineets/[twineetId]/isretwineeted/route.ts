// path: app/api/twineets/[twineetId]/isretwineeted/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';
import { TwineetType } from '../../../../types/types';

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twineetId = pathname.split('/')[3];

    if (!twineetId) {
        return NextResponse.json({ message: 'Twineet ID is required' }, { status: 400 });
        }

    try {
        const query = `
        UPDATE Twineet
        FILTER .id = <uuid>$twineetId
        SET {
            isRetwineeted := NOT .isRetwineeted,
            retwineets := .isRetwineeted ? .retwineets - 1 : .retwineets + 1
        };
    `;

        const result = await edgeDBCloudClient.querySingle<TwineetType>(query, { twineetId });
        if (!result) {
            return NextResponse.json({ message: 'Twineet not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching retwineet status:', error);
        return NextResponse.json({ message: 'Error fetching retwineet status' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twineetId = pathname.split('/')[3];

    if (!twineetId) {
        return NextResponse.json({ message: 'Twineet ID is required' }, { status: 400 });
    }

    try {
        const query = `
            UPDATE Twineet
            FILTER .id = <uuid>$twineetId
            SET {
                isRetwineeted := NOT .isRetwineeted,
                retwineets := (
                    SELECT (
                        IF .isRetwineeted THEN .retwineets - 1 ELSE .retwineets + 1
                    )
                )
            };
        `;

        await edgeDBCloudClient.execute(query, { twineetId });
        return NextResponse.json({ message: 'Twineet retweet status toggled successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error toggling retweet status:', error);
        return NextResponse.json({ message: 'Error toggling retweet status' }, { status: 500 });
    }
}