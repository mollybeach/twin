   // path: pages/api/agents.ts
    import { NextApiRequest, NextApiResponse } from 'next';
    import { insertAgent } from '../../../server/index'; // Adjust the import based on your structure
    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === 'POST') {
            const newAgentData = req.body; // Get the new agent data from the request body
            try {
                await insertAgent(newAgentData);
                res.status(201).send('Agent created successfully');
            } catch (error) {
                console.error('Error creating agent:', error);
                res.status(500).send('Error creating agent');
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }