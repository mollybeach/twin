import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { Transaction } from '../store/marketplace';

interface TradingChartProps {
  transactions: Transaction[];
  pricePerShare: number;
}

export function TradingChart({ transactions, pricePerShare }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Process data for the chart
    const chartData = transactions
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(t => ({
        time: new Date(t.timestamp).getTime() / 1000,
        value: t.pricePerShare,
      }));

    // Add current price as the latest point
    chartData.push({
      time: new Date().getTime() / 1000,
      value: pricePerShare,
    });

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add price series
    const lineSeries = chart.addLineSeries({
      color: '#8b5cf6',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      lineType: 2,
    });

    // Add area series for the gradient effect
    const areaSeries = chart.addAreaSeries({
      lineColor: '#8b5cf6',
      topColor: 'rgba(139, 92, 246, 0.3)',
      bottomColor: 'rgba(139, 92, 246, 0)',
      lineWidth: 2,
    });

    lineSeries.setData(chartData);
    areaSeries.setData(chartData);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [transactions, pricePerShare]);

  return (
    <div className="w-full bg-gray-900/50 rounded-lg p-4">
      <div ref={chartContainerRef} />
    </div>
  );
}