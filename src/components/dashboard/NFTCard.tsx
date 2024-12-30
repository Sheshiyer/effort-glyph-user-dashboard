import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { useEffortGlyph } from '../../hooks/useEffortGlyph';
import { useWallet } from '../../hooks/useWallet';

interface NFTCardProps {
  title: string;
  hours: number;
  project: string;
  imageUrl: string;
  isClaimed: boolean;
  metadataUri: string;
  onClaimSuccess?: () => void;
}

export function NFTCard({ 
  title, 
  hours, 
  project, 
  imageUrl, 
  isClaimed, 
  metadataUri,
  onClaimSuccess 
}: NFTCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { provider } = useWallet();
  const { mintAchievement } = useEffortGlyph(provider);

  const handleClaim = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const signer = await provider?.getSigner();
      if (!signer) {
        throw new Error('Please connect your wallet');
      }

      const address = await signer.getAddress();
      
      // Mint the NFT and wait for confirmation
      await mintAchievement(
        address,
        title,
        metadataUri
      );
      
      // Call success callback if provided
      onClaimSuccess?.();
    } catch (err) {
      console.error('Error claiming NFT:', err);
      setError(err instanceof Error ? err.message : 'Failed to claim NFT');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Award className="text-blue-600" size={20} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Hours:</span> {hours}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Project:</span> {project}
          </p>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {!isClaimed ? (
          <button
            onClick={handleClaim}
            disabled={isLoading}
            className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Claiming...' : 'Claim NFT'}
          </button>
        ) : (
          <div className="mt-4 text-center py-2 px-4 bg-gray-100 rounded-lg text-gray-600">
            Claimed
          </div>
        )}
      </div>
    </div>
  );
}
