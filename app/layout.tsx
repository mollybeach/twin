// path: app/layout.tsx
"use client";
import { Navbar } from "@/components/Navbar";
import { NotificationBar } from "@/components/NotificationBar";
import "@/styles/globals.css";
import { useStore } from '@/store/store';
import { useThemeStore } from '@/store/themeStore';
import { useEffect } from "react";
import React from "react";
import { UserType } from "./types/types";
import { Portfolio } from './components/Portfolio';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { stateNotification, setNotification, setCurrentUserData } = useStore();
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
            <body className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200 text-black dark:text-white">
                <div className="sticky top-0 z-50">
                    <Navbar />
                    <NotificationBar
                        twinId={stateNotification?.twinId || ''}
                        notification={stateNotification}
                        onClose={() => setNotification(null)}
                    />
                </div>
                <div className="flex"> 
                    <Portfolio />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} TwinAI. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
