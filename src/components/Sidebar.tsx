import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, TrophyIcon, ClockIcon, UserIcon, SettingsIcon } from '@heroicons/react/24/outline';

export function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Effort Glyph</h1>
      </div>
      <ul className="space-y-2 p-2">
        <li>
          <NavLink to="/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/achievements" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <TrophyIcon className="w-5 h-5 mr-2" />
            Achievements
          </NavLink>
        </li>
        <li>
          <NavLink to="/time-tracking" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <ClockIcon className="w-5 h-5 mr-2" />
            Time Tracking
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <UserIcon className="w-5 h-5 mr-2" />
            Profile
          </NavLink>
        </li>
        {/* Admin section - conditionally rendered */}
        {isAdmin && (
          <li>
            <NavLink to="/admin" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <SettingsIcon className="w-5 h-5 mr-2" />
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
} 