// api/twins/[twinId]/follow/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';

export async function POST(req: NextRequest) {
    const { twinId, userId } = await req.json(); 
    try {

        // first run query to select if user is already following twin
        const selectFollowerQuery = `
            SELECT Followers
            FILTER .twinId = <TwinIdType>$twinId AND $userId IN .userId
        `
        const follower = await edgeDBCloudClient.querySingle(selectFollowerQuery, { twinId, userId });
        
        if (follower) {
            return NextResponse.json({ message: 'Already following twin' }, { status: 400 });
        }

        // Insert into Followers
        const insertFollowerQuery = `
            INSERT Followers {
                twinId := <TwinIdType>$twinId,
                userId := <array<UserIdType>>[$userId]
    }
        `
        await edgeDBCloudClient.query(insertFollowerQuery, { twinId, userId });
            

        const insertFollowingQuery = `
            INSERT Following {
                userId := <UserIdType>$userId,
                following := <array<TwinIdType>>[$twinId]
            }
        `

        // Insert into Following
        await edgeDBCloudClient.query(insertFollowingQuery, { userId, twinId });

        return NextResponse.json({ message: 'Followed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error following twin:', error);
        return NextResponse.json({ error: 'Failed to follow twin' }, { status: 500 });
    }
}