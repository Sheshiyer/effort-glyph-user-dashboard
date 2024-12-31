import React from 'react';
import { Clock, Award, FileText } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { NFTCard } from '../components/dashboard/NFTCard';

export function DashboardPage() {
  // Example data - replace with real data from your API
  const stats = [
    { title: 'Total Hours', value: 156, icon: Clock },
    { title: 'NFTs Earned', value: 3, icon: Award },
    { title: 'Reference Letters', value: 2, icon: FileText }
  ];

  const achievements = [
    {
      title: 'Full Stack Achievement',
      hours: 40,
      project: 'Project X',
      isClaimed: true
    },
    {
      title: 'Backend Excellence',
      hours: 80,
      project: 'Project Y',
      isClaimed: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Achievements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <NFTCard
            key={index}
            title={achievement.title}
            hours={achievement.hours}
            project={achievement.project}
            isClaimed={achievement.isClaimed}
          />
        ))}
      </div>
    </div>
  );
} 