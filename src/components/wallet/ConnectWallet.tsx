import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Wallet } from 'lucide-react';

export function ConnectWallet() {
  const { address, error, connectWallet } = useWallet();

  return (
    <div className="flex items-center">
      {address ? (
        <div className="flex items-center space-x-2 bg-green-50 text-green-700 py-2 px-4 rounded-lg">
          <Wallet size={20} />
          <span className="text-sm">
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </span>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Wallet size={20} />
          <span>Connect Wallet</span>
        </button>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}