import React from 'react';
import { Line } from 'react-chartjs-2';
import { TradingChartPropsType, TransactionType } from '../types/types';
import { useStore } from '../store/store';

const TradingChart: React.FC<TradingChartPropsType> = async ({ twinId }) => {
    // Fetch the relevant data for the specific twin using twinId
    const { stateTransactions } = useStore();
    const transactionHistory = stateTransactions.filter((t: TransactionType) => t.twinId === twinId);

    // Prepare data for the chart
    const chartData = {
        labels: transactionHistory.map((t: TransactionType) => new Date(t.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Price per Share',
                data: transactionHistory.map((t: TransactionType) => t.pricePerShare),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Trading Chart for Twin {twinId}</h2>
            <Line data={chartData} />
        </div>
    );
};

export default TradingChart;