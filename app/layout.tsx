"use client";
//import type { Metadata } from "next";
//import localFont from "next/font/local";
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { NotificationBar } from "@/components/NotificationBar";
import Wallet from "@/components/Wallet";
import "@/styles/globals.css"; // Import global styles
import { useMarketplaceStore } from '@/store/marketplace';
import { useThemeStore } from '@/store/themeStore';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { notification, setNotification } = useMarketplaceStore();
    const theme = useThemeStore((state) => state.theme);
    const [userData, setUserData] = useState<any>(null); // Use a more specific type if possible

    const userId = 'a1cea84c-153a-4ac8-8f83-b229fbbf5971'; // Replace with actual logic to get user ID from session

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`); // Fetch user data
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data); // Set user data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchCurrentUser(); // Fetch current user on component mount
    }, []);

    return (
        <html lang="en" className={`${theme} antialiased`}>
            <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
                <div className="sticky top-0 z-50">
                    {userData && (
                        <Wallet 
                            balance={userData.walletBalance} 
                            username={userData.username} 
                        /> 
                    )}
                    <Navbar />
                    <NotificationBar
                        twinId={notification?.twinId || ''}
                        notification={notification}
                        onClose={() => setNotification(null)}
                    />
                </div>
                <main className="p-8">
                    {React.Children.map(children, child => {
                        // Pass the user data as a prop to each child
                        return React.cloneElement(child as React.ReactElement, { userData });
                    })}
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} TwinAI. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}