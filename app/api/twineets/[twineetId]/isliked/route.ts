// path: app/api/twineets/[twineetId]/isLiked/route.ts
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
            SELECT Twineet {
                id,
                isLiked
            }
            FILTER .id = <uuid>$twineetId;
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
                isLiked := NOT .isLiked,
                likes := (
                    SELECT (
                        IF .isLiked THEN .likes - 1 ELSE .likes + 1
                    )
                )
            };
        `;

        await edgeDBCloudClient.execute(query, { twineetId });
        return NextResponse.json({ message: 'Twineet like status toggled successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error toggling like status:', error);
        return NextResponse.json({ message: 'Error toggling like status' }, { status: 500 });
    }
}
