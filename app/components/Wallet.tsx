import React from 'react';

interface WalletProps {
    balance: number | string | null;
    username: string;
}

const Wallet = ({ balance, username }: WalletProps) => {

    const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance;

    return (
        <div className="wallet-balance bg-gray-800 text-white rounded-lg shadow-md">
            <div className="flex items-center">
                <p className="mr-4">Wallet: <span className="font-bold">{username}</span></p>
                <p className="mr-4">Balance: <span className="font-bold">${numericBalance !== null && !isNaN(numericBalance) ? numericBalance.toFixed(2) : 'N/A'}</span></p>
            </div>
        </div>
    );
};

export default Wallet;