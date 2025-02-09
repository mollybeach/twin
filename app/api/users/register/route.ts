// path: app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';
import { hashPassword } from '../../../../lib/auth';
import { UserType } from '../../../types/types';
import { createInsertUserQuery } from '../../../../lib/queries';


export async function POST(req: NextRequest) {
    
    const { userId, username, password, email, walletAddress } = await req.json();

    if (!username || !password || !email || !walletAddress) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    const passwordHash = await hashPassword(password)
    const insertUserQuery = createInsertUserQuery({
        userId,
        username,
        passwordHash,
        email,
        walletAddress
    });
    try {

        await edgeDBCloudClient.query<UserType>(insertUserQuery, { userId, username, passwordHash, email, walletAddress });

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
    }
}