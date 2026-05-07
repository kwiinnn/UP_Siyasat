import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import type { ResearchDocument } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [recentDocs, setRecentDocs] = useState<ResearchDocument[]>([]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view !== 'detail') setSelectedId(null);
  };

  const handleRead = (id: number) => {
    setSelectedId(id);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative flex flex-col">
      <Header onNavigate={handleNavigate} currentView={currentView} />

      <div className="flex-1 w-full">
        {currentView === 'home' && (
          <HomePage
            onViewAll={() => handleNavigate('list')}
            onNavigate={handleNavigate}
            onRead={handleRead}
          />
        )}

        {currentView !== 'home' && (
          <main className="max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-12 flex flex-col lg:flex-row gap-12 w-full">
            <div className="flex-1 w-full overflow-hidden">
              {currentView === 'list' && (
                <ListPage onRead={handleRead} />
              )}
              {currentView === 'detail' && selectedId !== null && (
                <DetailPage documentId={selectedId} />
              )}
            </div>
            <div className="w-full lg:w-72">
              <Sidebar onNavigate={handleNavigate} />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}