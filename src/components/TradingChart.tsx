import React from 'react';
import { Line } from 'react-chartjs-2';
import { TradingChartPropsType } from '../types/types';
import { useMarketplaceStore } from '../store/marketplace';

const TradingChart: React.FC<TradingChartPropsType> = ({ agentId }) => {
    // Fetch the relevant data for the specific agent using agentId
    const { getTransactionHistory } = useMarketplaceStore();
    const transactionHistory = getTransactionHistory(agentId);

    // Prepare data for the chart
    const chartData = {
        labels: transactionHistory.map(t => new Date(t.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Price per Share',
                data: transactionHistory.map(t => t.pricePerShare),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Trading Chart for Agent {agentId}</h2>
            <Line data={chartData} />
        </div>
    );
};

export default TradingChart;