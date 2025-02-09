// path: app/layout.tsx
"use client";
//import type { Metadata } from "next";
//import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { NotificationBar } from "@/components/NotificationBar";
import "@/styles/globals.css";
import { useStore } from '@/store/store';
import { useThemeStore } from '@/store/themeStore';
import Wallet from "@/components/Wallet";
import { useEffect, useState } from "react";
import React from "react";
import { UserType } from "./types/types";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { notification, setNotification } = useStore();
    const fetchCurrentUser = useStore((state) => state.fetchCurrentUser);
    const [user, setUser] = useState<UserType | null>(null);
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        const getUser = async () => {
            try {
                await fetchCurrentUser();
                setUser(useStore.getState().currentUserData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUser();
    }, [fetchCurrentUser]); 

    return (
        <html lang="en" className={`${theme} antialiased`}>
            <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
                <div className="sticky top-0 z-50">
                {user && (
                        <Wallet 
                            balance={user.walletBalance ?? 0} 
                            username={user.username} 
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
                    {children}
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} TwinAI. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}