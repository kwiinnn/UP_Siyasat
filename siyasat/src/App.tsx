import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import type { ViewState } from './types';
import { mockTheses } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedThesisId, setSelectedThesisId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'detail') setSelectedThesisId(null);
  };

  const handleRead = (id: string) => {
    setSelectedThesisId(id);
    setCurrentView('detail');
  };

  const selectedThesis = mockTheses.find(t => t.id === selectedThesisId);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative flex flex-col">
      <Header onNavigate={handleNavigate} currentView={currentView}/>

      <div className="flex-1 w-full">
        {currentView === 'home' && (
          <HomePage 
            recentTheses={mockTheses} 
            onViewAll={() => handleNavigate('list')} 
            onNavigate={setCurrentView} 
            onRead={handleRead}
          />
        )}

        {/* Changed px-8 to px-5 md:px-8 for better mobile spacing */}
        {currentView !== 'home' && (
          <main className="max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-12 flex flex-col lg:flex-row gap-12 w-full">
            <div className="flex-1 w-full overflow-hidden">
              {currentView === 'list' && <ListPage theses={mockTheses} onRead={handleRead} />}
              {currentView === 'detail' && <DetailPage thesis={selectedThesis} />}
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