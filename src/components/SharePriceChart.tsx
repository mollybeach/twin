import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TokenShare } from '../store/marketplace';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SharePriceChartProps {
  shareholders: TokenShare[];
  pricePerShare: number;
  isExpanded: boolean;
}

export function SharePriceChart({ shareholders, pricePerShare, isExpanded }: SharePriceChartProps) {
  // Sort shareholders by purchase date
  const sortedTransactions = [...shareholders].sort(
    (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
  );

  // Calculate price history
  const priceHistory = sortedTransactions.reduce((acc, transaction) => {
    const lastPrice = acc.length > 0 ? acc[acc.length - 1].price : transaction.purchasePrice;
    const priceChange = transaction.shares > 0 ? 0.01 : -0.01; // 1% change per transaction
    
    return [...acc, {
      date: new Date(transaction.purchaseDate),
      price: lastPrice * (1 + priceChange)
    }];
  }, [] as { date: Date; price: number }[]);

  // Add current price point
  if (priceHistory.length > 0) {
    priceHistory.push({
      date: new Date(),
      price: pricePerShare
    });
  }

  const data = {
    labels: priceHistory.map(d => d.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Share Price',
        data: priceHistory.map(d => d.price),
        fill: true,
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toFixed(4)}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: isExpanded,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#a855f7',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5,
        }
      },
      y: {
        display: isExpanded,
        grid: {
          color: 'rgba(168, 85, 247, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#a855f7',
          callback: function(value: any) {
            return '$' + value.toFixed(4);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className={`w-full ${isExpanded ? 'h-32' : 'h-16'} transition-all duration-300`}>
      {priceHistory.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="h-full flex items-center justify-center text-purple-300 text-sm">
          No price history available
        </div>
      )}
    </div>
  );
}