// path: src/pages/api/twineets.ts

// path: src/pages/api/twineets.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchTwineets } from '../../server/index'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const twineets = await fetchTwineets(); // Call the function to fetch twineets
            res.status(200).json(twineets); // Send the twineets as a JSON response
        } catch (error) {
            console.error('Error fetching twineets:', error);
            res.status(500).json({ message: 'Error fetching twineets' }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['GET']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}