import React from 'react';
import { Progress } from '../components/ui/progress';
import { Trophy, Target, CheckCircle } from 'lucide-react';

export function AchievementsPage() {
  // Example achievements data
  const achievements = [
    {
      title: 'Full Stack Developer',
      progress: 85,
      icon: Trophy,
      description: 'Complete 100 hours of full stack development'
    },
    {
      title: 'Backend Specialist',
      progress: 60,
      icon: Target,
      description: 'Complete 80 hours of backend development'
    },
    {
      title: 'Frontend Expert',
      progress: 45,
      icon: CheckCircle,
      description: 'Complete 60 hours of frontend development'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Achievements</h1>

      {/* Achievements List */}
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <achievement.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{achievement.title}</h2>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Progress value={achievement.progress} className="h-2" />
              <span className="text-sm font-medium">{achievement.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 