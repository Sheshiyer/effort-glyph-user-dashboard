import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  startDate: string;
  totalHours: number;
  nftsEarned: number;
  referenceLetters: number;
  profileImage: string;
}

const demoUser: User = {
  id: "ra-123",
  firstName: "Rehaman",
  lastName: "Ali",
  email: "rehaman.ali@example.com",
  role: "Full Stack Developer",
  startDate: "2023-09-15",
  totalHours: 156,
  nftsEarned: 3,
  referenceLetters: 2,
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150"
};

const UserContext = createContext<User>(demoUser);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={demoUser}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);