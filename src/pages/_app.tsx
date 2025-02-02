// path: src/pages/_app.tsx
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Portfolio } from '../components/Portfolio';
import { NotificationBar } from '../components/NotificationBar';
import { useMarketplaceStore } from '../store/marketplace';
import { useThemeStore } from '../store/themeStore';
import { Home } from '../pages/Home';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
    const { notification, setNotification } = useMarketplaceStore();
    const theme = useThemeStore((state) => state.theme);
        useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    }, [theme]);
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
            <div className="sticky top-0 z-50">
                <Navbar />
                <NotificationBar
                    agentId={notification?.agentId || ''}
                    notification={notification}
                    onClose={() => setNotification(null)}
                />
            </div>
            <div className="flex">
                <Portfolio />
                <div className="flex-1 overflow-x-hidden">
                    <Home />
                    <Component {...pageProps} />
                </div>
            </div>
        </div>
    );
}
export default MyApp;