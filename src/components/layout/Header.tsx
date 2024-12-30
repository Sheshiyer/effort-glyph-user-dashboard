import React from 'react';
import { Bell, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export function Header() {
  const user = useUser();
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-500" />
        </button>
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <img 
            src={user.profileImage} 
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
        </button>
      </div>
    </header>
  );
}