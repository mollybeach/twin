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
        const imageResponse = await openai.images.generate({
            prompt: prompt,
            n: 1, 
            size: '1024x1024',
        });
        return NextResponse.json(imageResponse);
    } catch (error) {
        console.error('Error generating image:', error);
        return NextResponse.json({ message: 'Error generating image' }, { status: 500 });
    }
}