// path: src/pages/api/twineets.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchTwineets } from '../../../server/index'; // Adjust the import path as necessary

export async function GET(req: NextRequest) {
    try {
        const { agents } = await req.json();
        console.log('Agents:', agents);
        const twineets = await fetchTwineets(agents); 
        return NextResponse.json(twineets);
    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 }); // Handle errors
    }
}