import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';

function WithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-12 flex flex-col lg:flex-row gap-12 w-full">
      <div className="flex-1 w-full overflow-hidden">
        {children}
      </div>
      <div className="w-full lg:w-72">
        <Sidebar />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative flex flex-col">
      <Header />

      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/undergraduate" element={
            <WithSidebar>
              <ListPage type="Undergraduate" />
            </WithSidebar>
          } />

          <Route path="/postgraduate" element={
            <WithSidebar>
              <ListPage type="Postgraduate" />
            </WithSidebar>
          } />

          <Route path="/faculty" element={
            <WithSidebar>
              <ListPage type="Faculty" />
            </WithSidebar>
          } />

          <Route path="/document/:id" element={
            <WithSidebar>
              <DetailPage />
            </WithSidebar>
          } />

          <Route path="*" element={
            <WithSidebar>
              <div className="text-sm text-gray-500">Page not found.</div>
            </WithSidebar>
          } />

          <Route path="/search" element={
            <WithSidebar>
              <SearchPage />
            </WithSidebar>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}