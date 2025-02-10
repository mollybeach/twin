// path: app/layout.tsx
"use client";
import { Navbar } from "@/components/Navbar";
import { NotificationBar } from "@/components/NotificationBar";
import "@/styles/globals.css";
import { useStore } from '@/store/store';
import { useThemeStore } from '@/store/themeStore';
import Wallet from "@/components/Wallet";
import { useEffect } from "react";
import React from "react";
import { UserType } from "./types/types";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { stateNotification, setNotification, stateCurrentUserData, setCurrentUserData } = useStore();
    const theme = useThemeStore((state) => state.theme);
    
        useEffect(() => {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const userData: UserType = JSON.parse(userDataString);
                setCurrentUserData(userData);
                console.log(userData);
            } else {
                setCurrentUserData(null as unknown as UserType);
            }
        }, [setCurrentUserData]);


    return (
        <html lang="en" className={`${theme} antialiased`}>
            <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
                <div className="sticky top-0 z-50">
                        <Wallet 
                            balance={stateCurrentUserData?.walletBalance ?? 0}
                            username={stateCurrentUserData?.username ?? ''} 
                        /> 
                    <Navbar />
                    <NotificationBar
                        twinId={stateNotification?.twinId || ''}
                        notification={stateNotification}
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
