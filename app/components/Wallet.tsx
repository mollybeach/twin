import React from 'react';
import { Wallet as WalletIcon } from 'lucide-react';

interface WalletProps {
    balance: number | string | null;
    username: string;
}

const Wallet = ({ balance, username }: WalletProps) => {

    const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance;

    return (
        <div className="bg-purple-600 rounded-lg p-4 mb-4 flex items-center justify-between">
            <div>
                <p className="text-lg font-bold">Wallet</p>
                <p className="text-sm">Username: {username}</p>
                <p className="text-sm">Balance: ${numericBalance !== null && !isNaN(numericBalance) ? numericBalance.toFixed(2) : 'N/A'}</p>
            </div>
            <WalletIcon className="w-8 h-8 text-white" />
        </div>

    );
};

export default Wallet;