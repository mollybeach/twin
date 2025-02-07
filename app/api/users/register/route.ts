// path: app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';
import { hashPassword } from '../../../../lib/auth';
import { UserType } from '../../../types/types';

export async function POST(req: NextRequest) {
    
    let { userId, username, password, email, birthday, walletAddress } = await req.json();

    if (!username || !password || !email || !birthday || !walletAddress) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    try {
        const passwordHash = await hashPassword(password);

        const query = `
            INSERT User {
                userId := <str>$userId,
                username := <str>$username,
                passwordHash := <str>$passwordHash,
                email := <str>$email,
                birthday := <datetime>$birthday,
                walletAddress := <str>$walletAddress
            };
        `;
        await edgeDBCloudClient.query<UserType>(query, { userId, username, passwordHash, email, birthday, walletAddress });

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
    }
}