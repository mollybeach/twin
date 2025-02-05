   // path: pages/api/agents.ts
    import { NextRequest, NextResponse } from 'next/server';
    import { insertAgent, getAllAgents } from '../../../server/index';
    export async function POST(req: NextRequest) {
        const newAgentData = await req.json();
        console.log('POST Request received with data:', newAgentData);
        try {
            await insertAgent(newAgentData); 
            return NextResponse.json({ message: 'Agent created successfully' }, { status: 201 });
        } catch (error) {
            console.error('Error creating agent:', error);
            return NextResponse.json({ message: 'Error creating agent' }, { status: 500 });
        }
    }

export async function GET() {
    try {
        const agents = await getAllAgents();
        return NextResponse.json(agents, { status: 200 });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ message: 'Error fetching agents' }, { status: 500 });
    }
}