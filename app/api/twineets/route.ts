// path: app/api/twineets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TwineetType } from '../../types/types';
import { edgeDBCloudClient } from '../../../lib/client';

export async function GET() {
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
            };
        `;

        const result = await edgeDBCloudClient.query<TwineetType[]>(query);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {

    const { ...updatedData } = await req.json(); // Destructure to get twinId and the rest of the data
    
    console.log('POST TWINEET REQUEST RECEIVED: ', updatedData);
    console.log('newTwineet.twinId', updatedData.newTwineet.twinId);
    console.log('newTwineet.content', updatedData.newTwineet.content);
    console.log('newTwineet.timestamp', updatedData.newTwineet.timestamp);
    console.log('newTwineet.likesCount', updatedData.newTwineet.likesCount);
    console.log('newTwineet.retwineetsCount', updatedData.newTwineet.retwineetsCount);
    console.log('newTwineet.repliesCount', updatedData.newTwineet.repliesCount);
    console.log('newTwineet.isLiked', updatedData.newTwineet.isLiked);
    try {
        const query = `
            INSERT Twineet {
                twinId:= <str>$twinId,
                content:= <str>$content,
                timestamp:= <datetime>$timestamp,
                likesCount:= <int64>$likesCount,
                retwineetsCount:= <int64>$retwineetsCount,
                repliesCount:= <int64>$repliesCount,
                isLiked:= <bool>$isLiked,
                isRetwineeted:= <bool>$isRetwineeted
            }
        `;

        await edgeDBCloudClient.querySingle<TwineetType>(query, { twinId: updatedData.newTwineet.twinId, content: updatedData.newTwineet.content, timestamp: new Date(updatedData.newTwineet.timestamp), likesCount: updatedData.newTwineet.likesCount, retwineetsCount: updatedData.newTwineet.retwineetsCount, repliesCount: updatedData.newTwineet.repliesCount, isLiked: updatedData.newTwineet.isLiked, isRetwineeted: updatedData.newTwineet.isRetwineeted });
        return NextResponse.json({ message: 'Twineet created successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error creating twineet:', error);
        return NextResponse.json({ message: 'Error creating twineet' }, { status: 500 });
    }
}
