// path: app/api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { edgeDBCloudClient } from '../../../../lib/client';
import { UserType } from '../../../types/types';
import { verifyPassword } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    try {
        const query = `
            SELECT User {
                userId,
                passwordHash
            }
            FILTER .username = <str>$username;
        `;
        const user: UserType | null = await edgeDBCloudClient.querySingle(query, { username });

        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }

        // Set a cookie with the user ID
        const res = NextResponse.json({ message: 'Login successful', userId: user.userId }, { status: 200 });
        res.cookies.set('userId', user.userId, { httpOnly: true, path: '/' }); // Set cookie

        return res;
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ message: 'Error logging in user' }, { status: 500 });
    }
}