import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

const PAYMASTER_URL = 'https://paymaster.biconomy.io/api/v1/137/G6z9zUUFj.ed86acdc-6562-4680-a23f-1ad477aa90f3';
const PAYMASTER_API_KEY = 'G6z9zUUFj.ed86acdc-6562-4680-a23f-1ad477aa90f3';

interface BiconomyPaymasterResponse {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: string;
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize provider
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      setProvider(provider);

      // Handle account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      };

      // Handle chain changes
      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check if already connected
      provider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAddress(accounts[0].address);
        }
      }).catch(console.error);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask to use this feature');
      return;
    }

    try {
      setLoading(true);

      if (!provider) {
        const newProvider = new ethers.BrowserProvider(window.ethereum as any);
        setProvider(newProvider);
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setError(null);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
      setLoading(false);
    }
  }, [provider]);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setError(null);
  }, []);

  // Send gasless transaction using Biconomy Paymaster
  const sendGaslessTransaction = async (transaction: ethers.TransactionRequest): Promise<ethers.TransactionReceipt> => {
    if (!provider || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = await provider.getSigner();
      
      // Prepare the transaction
      const tx = {
        to: transaction.to,
        data: transaction.data,
        value: transaction.value || 0,
        from: address,
      };

      // Get gas estimation
      const gasLimit = await provider.estimateGas(tx);
      
      // Add Biconomy Paymaster headers
      const forwardRequestConfig = {
        headers: {
          'x-api-key': PAYMASTER_API_KEY,
          'Content-Type': 'application/json',
        },
      };

      // Send transaction to Biconomy Paymaster
      const response = await fetch(PAYMASTER_URL, {
        method: 'POST',
        headers: forwardRequestConfig.headers,
        body: JSON.stringify({
          transaction: {
            ...tx,
            gasLimit: gasLimit.toString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get paymaster data');
      }

      const paymasterData: BiconomyPaymasterResponse = await response.json();

      // Send the transaction with paymaster data
      const txResponse = await signer.sendTransaction({
        ...tx,
        gasLimit,
        maxFeePerGas: ethers.getBigInt(paymasterData.maxFeePerGas),
        maxPriorityFeePerGas: ethers.getBigInt(paymasterData.maxPriorityFeePerGas),
        // Add paymaster data as part of the transaction data
        data: transaction.data 
          ? ethers.concat([transaction.data as string, paymasterData.paymasterAndData])
          : paymasterData.paymasterAndData,
      });

      const receipt = await txResponse.wait();
      if (!receipt) {
        throw new Error('Failed to get transaction receipt');
      }

      return receipt;
    } catch (err) {
      console.error('Error sending gasless transaction:', err);
      throw err;
    }
  };

  return {
    address,
    error,
    provider,
    loading,
    connectWallet,
    disconnectWallet,
    sendGaslessTransaction,
    isConnected: !!address
  };
}
