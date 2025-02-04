// path: app/api/agents/[agentId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchAgentByAgentId } from '../../../../server/index'; // Adjust the import path as necessary

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get('agentId'); // Extract agentId from the query parameters

    if (!agentId) {
        return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

    try {
        const agent = await fetchAgentByAgentId(agentId); // Fetch analytics data
        return NextResponse.json(agent); // Return the analytics data as JSON
    } catch (error) {
        console.error('Error fetching agent:', error);
        return NextResponse.json({ message: 'Error fetching agent' }, { status: 500 });
    }
}