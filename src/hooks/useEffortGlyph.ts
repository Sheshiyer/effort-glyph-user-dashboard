import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { EffortGlyphContract } from '../contracts/EffortGlyph';
import { useWallet } from './useWallet';

export function useEffortGlyph(provider: ethers.BrowserProvider | null) {
  const [contract, setContract] = useState<EffortGlyphContract | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendGaslessTransaction } = useWallet();

  useEffect(() => {
    const initContract = async () => {
      try {
        if (!provider) {
          setError('No provider available');
          return;
        }

        const signer = await provider.getSigner();
        
        // Initialize contract with gasless transaction support
        const contractInstance = new EffortGlyphContract(
          process.env.VITE_CONTRACT_ADDRESS!,
          signer,
          sendGaslessTransaction
        );

        // Check if connected wallet is owner
        const ownerStatus = await contractInstance.isOwner();
        
        setContract(contractInstance);
        setIsOwner(ownerStatus);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize contract');
        setContract(null);
      }
    };

    initContract();

    // Cleanup
    return () => {
      if (contract) {
        contract.removeAllListeners();
      }
    };
  }, [provider, sendGaslessTransaction]);

  const mintAchievement = async (
    recipient: string,
    achievementType: string,
    uri: string
  ) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      return await contract.mintAchievement(recipient, achievementType, uri);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to mint achievement');
    }
  };

  const setRequiredHours = async (achievementType: string, hours: number) => {
    if (!contract) throw new Error('Contract not initialized');
    if (!isOwner) throw new Error('Only owner can set required hours');

    try {
      return await contract.setRequiredHours(achievementType, hours);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to set required hours');
    }
  };

  const getAchievementType = async (tokenId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      return await contract.getAchievementType(tokenId);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to get achievement type');
    }
  };

  const getRequiredHours = async (achievementType: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      return await contract.getRequiredHours(achievementType);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to get required hours');
    }
  };

  return {
    contract,
    isOwner,
    error,
    mintAchievement,
    setRequiredHours,
    getAchievementType,
    getRequiredHours
  };
}
