"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const userId = crypto.randomUUID();
        
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId, 
                    username, 
                    password, 
                    email, 
                    birthday,
                    walletAddress 
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

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
                    Register
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
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
                    <div className="mb-4">
                        <label className="block text-purple-300 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-purple-300 mb-1" htmlFor="birthday">Birthday</label>
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-purple-300 mb-1" htmlFor="walletAddress">Wallet Address</label>
                        <input
                            type="text"
                            id="walletAddress"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <p className="text-purple-200 mt-4 text-center">
                    Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}
