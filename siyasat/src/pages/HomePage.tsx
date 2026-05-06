import React from 'react';
import type { Thesis } from '../types';
import ThesisCard from '../components/ThesisCard';
import Sidebar from '../components/Sidebar';
import type { ViewState } from '../types';

interface HomePageProps {
  recentTheses: Thesis[];
  onViewAll: () => void;
  onNavigate: (view: ViewState) => void;
  onRead: (id: string) => void; 
}

export default function HomePage({ recentTheses, onViewAll, onNavigate, onRead }: HomePageProps) {
  return (
    <div className="w-full">
      <div className="relative w-full h-[350px] md:h-[650px] bg-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/upmin.png")' }}
        ></div>
        
        <div className="absolute top-0 left-0 w-full h-[84%] rounded-br-[0px] md:rounded-br-[0px] overflow-hidden z-10">
          <div className="absolute top-0 left-[55%] md:left-[50%] w-[150%] h-full origin-bottom-left skew-x-[26deg] bg-gradient-to-b rounded-bl-[60px] from-[#8A1538]/90 to-[#24050F]/90 shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>
        </div>

        <div className="absolute top-[20%] md:top-[18%] left-[-10%] md:left-[-20%] w-[65%] md:w-[69%] bottom-0 bg-gradient-to-b from-[#198754]/90 to-[#062115]/90 origin-bottom-left skew-x-[26deg] rounded-tr-[60px] md:rounded-tr-[60px] z-20 shadow-[15px_0_40px_rgba(0,0,0,0.4)]"></div>

        <div className="relative z-30 h-[88%] flex flex-col items-end justify-start md:justify-center px-5 md:px-16 text-right w-full max-w-7xl mx-auto pt-24 md:pt16">
          <h2 className="text-[13px] md:text-4xl text-white tracking-[0.3em] font-optima mb-0 md:mb-2 pr-0 drop-shadow-md">
            UP MINDANAO
          </h2>
          <h1 className="text-4xl md:text-[7.5rem] font-optima text-[#EAA61A] tracking-widest mb-4 md:mb-6 drop-shadow-2xl leading-none">
            SIYASAT
          </h1>
          
          <div className="border-r-4 md:border-r-8 border-white pr-4 md:pr-6 margin-0 py-0 md:py-2">
            <p className="text-gray-100 text-[9px] md:text-[15px] max-w-[150px] md:max-w-[400px] leading-relaxed drop-shadow-md font-normal">
              Serves as the official institutional digital repository of the knowledge 
              and scholarly outputs of UP Mindanao. It aims to provide wider 
              dissemination and increase the visibility of the university's materials.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-6 md:h-8 bg-gradient-to-r from-[#1A0305] via-[#4A0A0C] to-[#7A1114] z-40 shadow-inner"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 relative z-30 bg-white w-full">
        <div className="lg:col-span-2">
          <h3 className="text-[#115740] font-optima font-bold text-xl mb-6">RECENTLY ADDED</h3>
          <div className="space-y-4">
            {recentTheses.slice(0, 3).map((thesis, idx) => (
              <ThesisCard 
                key={idx} 
                thesis={thesis} 
                onClick={() => onRead(thesis.id)} 
              />
            ))}
          </div>
          <button 
            onClick={onViewAll}
            className="mt-6 text-sm text-[#7A1114] hover:underline font-medium inline-block"
          >
            View all undergraduate theses &rarr;
          </button>
        </div>

        <div className="lg:col-span-1 w-full">
          <Sidebar onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}