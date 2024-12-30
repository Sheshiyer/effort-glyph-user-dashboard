import React from 'react';
import { LayoutDashboard, Award, Clock, FileText, Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: Award, label: 'NFTs', href: '#' },
  { icon: Clock, label: 'Work Metrics', href: '#' },
  { icon: Award, label: 'Achievements', href: '#' },
  { icon: FileText, label: 'Reference Letters', href: '#' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed && <span className="text-xl font-bold text-blue-600">EffortGlyph</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-1"
          >
            <item.icon size={20} className="text-gray-500" />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}