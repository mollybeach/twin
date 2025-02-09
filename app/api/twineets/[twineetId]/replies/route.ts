// path: app/api/twineets/[twineetId]/replies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';
import { TwineetType } from '../../../../types/types';


export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const twineetId = pathname.split('/')[3];
    const { replyContent } = await req.json();
    console.log(replyContent);

    if (!twineetId) {
        return NextResponse.json({ message: 'Twineet ID is required' }, { status: 400 });
        }

    try {
        const query = `
        SELECT Twineet {
            id,
            repliesCount
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
    const { replyContent } = await req.json(); // Get the reply content from the request body

    if (!twineetId || !replyContent) {
        return NextResponse.json({ message: 'Twineet ID and reply content are required' }, { status: 400 });
    }

    try {
        const query = `
            UPDATE Twineet
            FILTER .id = <uuid>$twineetId
            SET {
                repliesCount := (
                    SELECT (
                        IF .repliesCount IS NULL THEN 1 ELSE .repliesCount + 1
                    )
                )
            };
        `;

        await edgeDBCloudClient.execute(query, { twineetId });
        // Here you can also create a new reply entry in a replies table if you have one
        return NextResponse.json({ message: 'Reply added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error replying to twineet:', error);
        return NextResponse.json({ message: 'Error replying to twineet' }, { status: 500 });
    }
}
