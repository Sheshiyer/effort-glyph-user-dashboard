import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Award, BarChart2, FileText, User } from 'lucide-react';

export function Sidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'NFTs', href: '/nfts', icon: Award },
    { name: 'Work Metrics', href: '/work-metrics', icon: BarChart2 },
    { name: 'Achievements', href: '/achievements', icon: User },
    { name: 'Reference Letters', href: '/reference-letters', icon: FileText }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100">
      <div className="p-6">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}