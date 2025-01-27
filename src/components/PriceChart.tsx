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

interface PriceChartProps {
  shareholders: TokenShare[];
  pricePerShare: number;
}

export function PriceChart({ shareholders, pricePerShare }: PriceChartProps) {
  // Sort shareholders by purchase date
  const sortedTransactions = [...shareholders].sort(
    (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
  );

  // Calculate cumulative investment over time
  const cumulativeData = sortedTransactions.reduce((acc, transaction) => {
    const lastValue = acc.length > 0 ? acc[acc.length - 1].value : 0;
    return [...acc, {
      date: new Date(transaction.purchaseDate),
      value: lastValue + (transaction.shares * transaction.purchasePrice)
    }];
  }, [] as { date: Date; value: number }[]);

  // Add current value point if there are any shareholders
  if (cumulativeData.length > 0) {
    const totalShares = shareholders.reduce((sum, s) => sum + s.shares, 0);
    cumulativeData.push({
      date: new Date(),
      value: totalShares * pricePerShare
    });
  }

  const data = {
    labels: cumulativeData.map(d => d.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Total Investment Value',
        data: cumulativeData.map(d => d.value),
        fill: true,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
      },
    ],
  };

  const options = {
    responsive: true,
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
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(2);
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
    <div className="w-full h-48 bg-white/5 rounded-lg p-4">
      {cumulativeData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          No investment data available
        </div>
      )}
    </div>
  );
}