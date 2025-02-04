   // path: pages/api/agents.ts
    import { NextRequest, NextResponse } from 'next/server';
    import { insertAgent, getAllAgents } from '../../../server/index'; // Adjust the import based on your structure
    export async function POST(req: NextRequest) {
        const newAgentData = await req.json(); // Get the new agent data from the request body
        console.log('POST Request received with data:', newAgentData);
        try {
            const response = await insertAgent(newAgentData);
            if (response === undefined) {
                console.error('Error creating agent: No response received'); // Log the error message
                throw new Error('Failed to create agent: No response received');
            }
            return NextResponse.json({ message: 'Agent created successfully' }, { status: 201 });
        } catch (error) {
            console.error('Error creating agent:', error);
            return NextResponse.json({ message: 'Error creating agent' }, { status: 500 });
        }
    }

export async function GET(req: NextRequest) {
    try {
        const agents = await getAllAgents();
        return NextResponse.json(agents, { status: 200 });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ message: 'Error fetching agents' }, { status: 500 });
    }
}