"use client";
//import type { Metadata } from "next";
//import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { NotificationBar } from "@/components/NotificationBar";
import "@/styles/globals.css"; // Import global styles
import { useMarketplaceStore } from '@/store/marketplace';
import { useThemeStore } from '@/store/themeStore';

// Metadata for the application
/*
export const metadata: Metadata = {
    title: "TwinAI",
    description: "AI-powered digital alter egos based on social media activity.",
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { notification, setNotification } = useMarketplaceStore();
    const theme = useThemeStore((state) => state.theme);

    return (
        <html lang="en" className={`${theme} antialiased`}>
            <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
                <div className="sticky top-0 z-50">
                    <Navbar />
                    <NotificationBar
                        agentId={notification?.agentId || ''}
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