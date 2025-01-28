// path: src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Portfolio } from './components/Portfolio';
import { NotificationBar } from './components/NotificationBar';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { CreateAgent } from './pages/CreateAgent';
import { AnalyticsPage } from './pages/Analytics';
import { Leaderboard } from './pages/Leaderboard';
import { Clone } from './pages/Clone';
import { PortfolioPage } from './pages/Portfolio';
import { useMarketplaceStore } from './store/marketplace';
import { useThemeStore } from './store/themeStore';

function App() {
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
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="sticky top-0 z-50">
          <Navbar />
          <NotificationBar
            notification={notification}
            onClose={() => setNotification(null)}
          />
        </div>
        <div className="flex">
          <Portfolio />
          <div className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateAgent />} />
              <Route path="/clone" element={<Clone />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/analytics/:agentId" element={<AnalyticsPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;