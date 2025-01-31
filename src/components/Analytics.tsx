import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { AnalyticsPropsType } from '../types/types';
import { TrendingUp, Users, Clock, Target, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import TradingChart from './TradingChart';
import { useMarketplaceStore } from '../store/marketplace';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function Analytics({ analytics, agentId }: AnalyticsPropsType) {
  const { getTransactionHistory, agents } = useMarketplaceStore();
  const transactions = getTransactionHistory(agentId);
  const agent = agents.find((a: { agentId: string }) => a.agentId === agentId);

  // Ensure analytics data exists with default values if needed
  const safeAnalytics = {
    dailyImpressions: analytics?.dailyImpressions || [],
    demographics: analytics?.demographics || [],
    peakHours: analytics?.peakHours || [],
    topInteractions: analytics?.topInteractions || [],
    impressions: analytics?.impressions || 0,
    engagementRate: analytics?.engagementRate || 0,
    clickThroughRate: analytics?.clickThroughRate || 0,
    cryptoHoldings: analytics?.cryptoHoldings || []
  };

  const impressionsData = {
    labels: safeAnalytics.dailyImpressions.map(d => d.date),
    datasets: [{
      label: 'Daily Impressions',
      data: safeAnalytics.dailyImpressions.map(d => d.count),
      fill: true,
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
    }],
  };

  const demographicsData = {
    labels: safeAnalytics.demographics.map(d => d.age),
    datasets: [{
      data: safeAnalytics.demographics.map(d => d.percentage),
      backgroundColor: [
        '#22c55e',
        '#16a34a',
        '#15803d',
        '#166534',
        '#14532d',
      ],
    }],
  };

  const peakHoursData = {
    labels: safeAnalytics.peakHours.map(h => `${h.hour}:00`),
    datasets: [{
      label: 'Engagement',
      data: safeAnalytics.peakHours.map(h => h.engagement),
      backgroundColor: '#22c55e',
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-300">Total Impressions</p>
              <p className="text-2xl font-bold text-white">{safeAnalytics.impressions.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-300">Engagement Rate</p>
              <p className="text-2xl font-bold text-white">{safeAnalytics.engagementRate.toFixed(1)}%</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-300">Click Through Rate</p>
              <p className="text-2xl font-bold text-white">{safeAnalytics.clickThroughRate.toFixed(1)}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-300">Peak Activity</p>
              <p className="text-2xl font-bold text-white">
                {safeAnalytics.peakHours.length > 0
                  ? `${safeAnalytics.peakHours.reduce((max, curr) => 
                      curr.engagement > max.engagement ? curr : max
                    ).hour}:00`
                  : "N/A"
                }
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Trading Chart Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
          Price History
        </h3>
        
        {transactions.length > 0 && agent ? (
          <TradingChart
            agentId={agent.agentId}
            transactions={transactions}
            pricePerShare={agent.tokenShares.pricePerShare}
          />
        ) : (
          <div className="w-full h-[400px] bg-white/5 rounded-lg flex items-center justify-center text-purple-300">
            No trading data available
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Impressions Over Time</h3>
          <Line data={impressionsData} options={chartOptions} />
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Peak Hours</h3>
          <Bar data={peakHoursData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Demographics</h3>
          <div className="w-full max-w-xs mx-auto">
            <Doughnut data={demographicsData} />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Top Interactions</h3>
          <div className="space-y-4">
            {safeAnalytics.topInteractions.map((interaction) => (
              <div key={interaction.kind} className="flex items-center justify-between">
                <span className="text-purple-300">{interaction.kind}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-white/5 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${(interaction.count / safeAnalytics.topInteractions[0].count) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="text-white font-medium">{interaction.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crypto Holdings Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Wallet className="w-5 h-5 mr-2 text-purple-400" />
          Cryptocurrency Holdings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safeAnalytics.cryptoHoldings.map((holding) => (
            <div key={holding.symbol} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{holding.symbol}</span>
                <div className={`flex items-center ${holding.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {holding.change24h >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">{Math.abs(holding.change24h).toFixed(2)}%</span>
                </div>
              </div>
              <div className="text-white font-bold">
                {holding.amount.toFixed(4)} {holding.symbol}
              </div>
              <div className="text-sm text-purple-300">
                ${(holding.amount * holding.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}