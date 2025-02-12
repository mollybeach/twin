import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';

export async function POST(req: NextRequest) {
    const { twinId, userId } = await req.json(); 

    try {
        await edgeDBCloudClient.query(`
            UPDATE Followers
            FILTER .twinId = <TwinIdType>$twinId
            SET {
                userId -= <array<UserIdType>>[$userId]
            }
            IF .userId CONTAINS <UserIdType>$userId
        `, { twinId, userId });
        
        await edgeDBCloudClient.query(`
            UPDATE Following
            FILTER .userId = <UserIdType>$userId
            SET {
                following -= <array<TwinIdType>>[$twinId]
            }
            IF .following CONTAINS <TwinIdType>$twinId
        `, { userId, twinId });

        return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error unfollowing twin:', error);
        return NextResponse.json({ error: 'Failed to unfollow twin' }, { status: 500 });
    }
}