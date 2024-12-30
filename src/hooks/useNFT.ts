import { useState } from 'react';
import { NFTService, NFTMetadata } from '../services/moralis/nftService';

export function useNFT() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mintNFT = async (metadata: NFTMetadata, recipientAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await NFTService.mintNFT(metadata, recipientAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintNFT,
    isLoading,
    error
  };
}