import React from 'react';
import { TrendingUp, TrendingDown, Coins } from 'lucide-react';

interface TokenStats {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export function TokenStats() {
  const [stats, setStats] = React.useState<TokenStats>({
    price: 12.84,
    change24h: 5.67,
    volume24h: 2450000,
    marketCap: 128400000
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const priceChange = (Math.random() - 0.48) * 0.1;
        const newPrice = prev.price * (1 + priceChange);
        return {
          price: newPrice,
          change24h: prev.change24h + priceChange * 100,
          volume24h: prev.volume24h + (Math.random() - 0.5) * 10000,
          marketCap: newPrice * 10000000
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex items-center space-x-6 px-4 py-2 bg-white/5 rounded-full">
      <div className="flex items-center whitespace-nowrap">
        <Coins className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
        <span className="text-white font-medium">$TWIN</span>
      </div>
      
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="text-white font-medium">
          ${stats.price.toFixed(2)}
        </span>
        <div className={`flex items-center ${stats.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {stats.change24h >= 0 ? (
            <TrendingUp className="w-4 h-4 mr-1 flex-shrink-0" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1 flex-shrink-0" />
          )}
          <span className="text-sm">
            {Math.abs(stats.change24h).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="text-purple-300 text-sm whitespace-nowrap">
        Vol: ${(stats.volume24h / 1000000).toFixed(2)}M
      </div>

      <div className="text-purple-300 text-sm whitespace-nowrap">
        MCap: ${(stats.marketCap / 1000000).toFixed(2)}M
      </div>
    </div>
  );
}