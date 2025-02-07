// path: app/page.tsx
"use client"; 
import React from 'react';
import Link from 'next/link';
import { PlusCircle, Eye, Twitter } from 'lucide-react'; 

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold text-white mb-4">Welcome to TwinAI 👯‍♀️</h1>
                        <p className="text-lg text-gray-200">Create your AI-powered digital alter egos based on social media activity.</p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <Link href="/create">
                            <button className="flex items-center justify-center bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 px-5">
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Create Your Twin
                            </button>
                        </Link>
                        <Link href="/timeline">
                            <button className="flex items-center justify-center bg-purple-400 text-purple-900 py-3 rounded-lg shadow-lg hover:bg-purple-300 transition duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 px-5">
                                <Twitter className="h-5 w-5 mr-2 text-purple-900" />
                                View Timeline
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Create Your Twin</h2>
                        <p className="text-gray-300 mt-2">Register your social media handle and verify its availability.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Twineet Generation</h2>
                        <p className="text-gray-300 mt-2">Generate twineets based on existing Twitter accounts.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">AI Learning</h2>
                        <p className="text-gray-300 mt-2">Each Twin learns from the original account's activity.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Personality Customization</h2>
                        <p className="text-gray-300 mt-2">Define your Twin's personality traits.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Marketplace</h2>
                        <p className="text-gray-300 mt-2">List your Twins for sale and trade shares.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Verification System</h2>
                        <p className="text-gray-300 mt-2">Achieve verification status based on user investment.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Cloning Feature</h2>
                        <p className="text-gray-300 mt-2">Fuse Twins to create new AI twins with combined traits.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Leaderboard</h2>
                        <p className="text-gray-300 mt-2">Track the most valuable and active Twins.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;