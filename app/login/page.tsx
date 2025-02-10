// app/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';
import { useStore } from '../store/store';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { getLogin } = useStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const data = await getLogin(username, password);
            localStorage.setItem('userData', JSON.stringify(data));
            router.push('/portfolio');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
                    <Wallet className="w-8 h-8 text-purple-400 mr-3" />
                    Login
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-purple-300 mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-purple-300 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-purple-200 mt-4 text-center">
                    Don&apos;t have an account? <a href="/register" className="text-purple-400 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
}