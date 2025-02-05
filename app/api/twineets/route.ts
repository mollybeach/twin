// path: src/pages/api/twineets.ts
import { NextResponse } from 'next/server';
import edgeql from '../../../dbschema/edgeql-js'
import { createClient } from 'edgedb';

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twindb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});

export async function GET() {
    try {
        const query = edgeql.select(edgeql.Twineet, () => ({
            result: edgeql.Twineet
        }));
        const result = await edgeDBCloudClient.query(JSON.stringify(query));
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 }); // Handle errors
    }
}