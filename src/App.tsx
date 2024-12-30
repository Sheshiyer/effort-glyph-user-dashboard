import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StatsCard } from './components/dashboard/StatsCard';
import { NFTCard } from './components/dashboard/NFTCard';
import { Clock, Award, FileText } from 'lucide-react';
import { useUser } from './context/UserContext';

function App() {
  const user = useUser();

  const handleNFTClaim = () => {
    console.log('Claiming NFT...');
  };

  const nftData = [
    {
      title: "Full Stack Achievement",
      hours: 40,
      project: "E-commerce Platform",
      imageUrl: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?auto=format&fit=crop&w=800",
      isClaimed: false,
    },
    {
      title: "Backend Excellence",
      hours: 80,
      project: "API Development",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800",
      isClaimed: true,
    },
    {
      title: "Frontend Mastery",
      hours: 36,
      project: "Dashboard UI",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
      isClaimed: false,
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Hours"
              value={user.totalHours}
              icon={Clock}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="NFTs Earned"
              value={user.nftsEarned}
              icon={Award}
              trend={{ value: 100, isPositive: true }}
            />
            <StatsCard
              title="Reference Letters"
              value={user.referenceLetters}
              icon={FileText}
            />
          </div>

          <h2 className="text-xl font-semibold mb-6">Recent NFTs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftData.map((nft, index) => (
              <NFTCard
                key={index}
                title={nft.title}
                hours={nft.hours}
                project={nft.project}
                imageUrl={nft.imageUrl}
                isClaimed={nft.isClaimed}
                onClaim={handleNFTClaim}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;