// path: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
    import OpenAI from 'openai';
    import dotenv from 'dotenv';
    
    dotenv.config();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    export async function POST(req: NextRequest) {
        const { prompt } = await req.json(); 
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
            });
            return NextResponse.json(completion);
        } catch (error) {
            console.error('Error generating response:', error);
            return NextResponse.json({ message: 'Error generating response' }, { status: 500 });
        }
}