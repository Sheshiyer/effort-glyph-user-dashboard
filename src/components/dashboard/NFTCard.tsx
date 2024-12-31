import React from 'react';
import placeholder from 'placeholder.js';

interface NFTCardProps {
  title: string;
  hours: number;
  project: string;
  isClaimed: boolean;
  imageUrl?: string;
}

export function NFTCard({ title, hours, project, isClaimed, imageUrl }: NFTCardProps) {
  // Generate placeholder image URL
  const placeholderImage = placeholder.getData({
    width: 400,
    height: 300,
    text: title,
    bgColor: '#f3f4f6',
    textColor: '#6b7280',
    fontSize: 20
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <img 
        src={imageUrl || placeholderImage} 
        alt={title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          (e.target as HTMLImageElement).src = placeholderImage;
        }}
      />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Hours:</span> {hours}</p>
        <p><span className="font-medium">Project:</span> {project}</p>
        <p>
          <span className="font-medium">Status:</span> 
          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
            isClaimed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}>
            {isClaimed ? 'Claimed' : 'Pending'}
          </span>
        </p>
      </div>
    </div>
  );
}
