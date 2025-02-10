// path: app/api/twins/[twinId]/buy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../../lib/client';
import { TwinType } from '../../../../types/types';

export async function POST(req: NextRequest) {

    const { twinId, currentUserId, sharesToBuy } = await req.json();
    console.log("BUY POST REQUEST RECEIVED: ", twinId, currentUserId, sharesToBuy);
    try {
        const query = `
            SELECT Twin {
                price,
                userId,
                tokenShares : {
                    availableShares
                }
            }
            FILTER .twinId = <str>$twinId
        `;
        const twin = await edgeDBCloudClient.querySingle<TwinType>(query, { twinId });
        console.log("TWIN: ", twin);
        if (!twin) {
            return NextResponse.json({ message: 'Twin not found' }, { status: 404 });
        }

        if (sharesToBuy > twin.tokenShares.availableShares) {
            return NextResponse.json({ message: 'Not enough shares available' }, { status: 400 });
        }

        const price =  Number(twin.price);

        const totalCost = Number(sharesToBuy) * Number(price);
        console.log("TOTAL COST: ", totalCost);

        const updateQuery = `
            UPDATE User
            FILTER .userId = <str>$currentUserId
            SET {
                walletBalance := .walletBalance - <decimal>$totalCost
            };
            UPDATE User
            FILTER .userId = <str>$twinUserId
            SET {
                walletBalance := .walletBalance + <decimal>$totalCost
            };
        `;

        await edgeDBCloudClient.execute(updateQuery, { twinUserId: twin.userId, currentUserId,  totalCost: totalCost.toString()});

        return NextResponse.json({ message: 'Shares purchased successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing purchase:', error);
        return NextResponse.json({ message: 'Error processing purchase' }, { status: 500 });
    }
}