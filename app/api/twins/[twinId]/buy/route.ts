// path: app/api/twins/[twinId]/buy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';
import { TwinType } from '../../../../types/types';

export async function POST(req: NextRequest) {
    const { twinId, userId, sharesToBuy } = await req.json();

    try {
        // Fetch the twin's current price and owner
        const query = `
            SELECT Twin {
                price,
                userId,  // Owner's userId
                tokenShares {
                    availableShares
                }
            }
            FILTER .twinId = <str>$twinId
        `;
        const twin = await edgeDBCloudClient.querySingle<TwinType>(query, { twinId });

        if (!twin) {
            return NextResponse.json({ message: 'Twin not found' }, { status: 404 });
        }

        if (sharesToBuy > twin.tokenShares.availableShares) {
            return NextResponse.json({ message: 'Not enough shares available' }, { status: 400 });
        }

        // Calculate total cost
        const totalCost = sharesToBuy * twin.price;

        // Update buyer's balance and owner's balance
        const updateQuery = `
            UPDATE User
            FILTER .userId = <str>$userId
            SET {
                walletBalance -= <decimal>$totalCost
            };
            UPDATE User
            FILTER .userId = <str>$ownerId
            SET {
                walletBalance += <decimal>$totalCost
            };
        `;

        await edgeDBCloudClient.execute(updateQuery, { userId, ownerId: twin.userId, totalCost });

        return NextResponse.json({ message: 'Shares purchased successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing purchase:', error);
        return NextResponse.json({ message: 'Error processing purchase' }, { status: 500 });
    }
}