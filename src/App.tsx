import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { NFTsPage } from './pages/NFTsPage';
import { WorkMetricsPage } from './pages/WorkMetricsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ReferenceLettersPage } from './pages/ReferenceLettersPage';
import { useUser } from './context/UserContext';

export function App() {
  const user = useUser();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/nfts" element={<NFTsPage />} />
              <Route path="/work-metrics" element={<WorkMetricsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/reference-letters" element={<ReferenceLettersPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}