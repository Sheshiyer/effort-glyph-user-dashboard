import React from 'react';
import { NFTCard } from '../components/dashboard/NFTCard';
import placeholder from 'placeholder.js';

export function NFTsPage() {
  // Example NFT data - replace with real data from your API
  const nfts = [
    {
      title: 'Full Stack Achievement',
      hours: 120,
      project: 'Project X',
      isClaimed: true,
      imageUrl: 'https://example.com/nft1.png'
    },
    {
      title: 'Backend Excellence',
      hours: 80,
      project: 'Project Y',
      isClaimed: true,
      imageUrl: 'https://example.com/nft2.png'
    },
    {
      title: 'Frontend Mastery',
      hours: 100,
      project: 'Project Z',
      isClaimed: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My NFTs</h1>
      
      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft, index) => {
          const placeholderImage = placeholder.getData({
            width: 400,
            height: 300,
            text: nft.title,
            bgColor: '#f3f4f6',
            textColor: '#6b7280',
            fontSize: 20
          });

          return (
            <NFTCard
              key={index}
              title={nft.title}
              hours={nft.hours}
              project={nft.project}
              isClaimed={nft.isClaimed}
              imageUrl={nft.imageUrl || placeholderImage}
            />
          );
        })}
      </div>
    </div>
  );
} 