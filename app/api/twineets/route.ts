// path: src/pages/api/twineets.ts
import { NextResponse } from 'next/server';
import { fetchTwineets } from '../../../server/index'; // Adjust the import path as necessary

export async function GET() {
    try {
        const twineets = await fetchTwineets(); // Call the function to fetch twineets
        return NextResponse.json(twineets); // Send the twineets as a JSON response
    } catch (error) {
        console.error('Error fetching twineets:', error);
        return NextResponse.json({ message: 'Error fetching twineets' }, { status: 500 }); // Handle errors
    }
}