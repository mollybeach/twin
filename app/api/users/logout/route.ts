import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Here you can handle any server-side session cleanup if necessary
    // For example, if you are using cookies or sessions, you would clear them here
    console.log('Logout successful', req);
    // Since we are using local storage on the client-side, we don't need to do anything here
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
