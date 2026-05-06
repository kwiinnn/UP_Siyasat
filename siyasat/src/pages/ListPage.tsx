import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import type { Thesis } from '../types';
import ThesisCard from '../components/ThesisCard';

interface ListPageProps {
  theses: Thesis[];
  onRead: (id: string) => void;
}

export default function ListPage({ theses, onRead }: ListPageProps) {
  return (
    <div className="animate-in fade-in duration-500 w-full">
      <div className="text-sm text-gray-500 mb-8 font-medium">
        <span className="hover:text-[#7A1114] cursor-pointer transition-colors">Home</span> 
        <span className="mx-2">&gt;</span> 
        <span className="text-gray-800">Undergraduate Theses</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-100 pb-5 mb-8 gap-6">
        <h3 className="text-[#7A1114] font-optima font-bold text-2xl tracking-wide">
          UNDERGRADUATE THESES
        </h3>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 sm:mr-2">
            <Filter size={16} /> Filters:
          </div>
          <button className="flex items-center justify-between w-full sm:w-36 px-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
            College <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full sm:w-28 px-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
            Year <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {theses.map((thesis, idx) => (
          <ThesisCard 
            key={idx} 
            thesis={thesis} 
            onClick={() => onRead(thesis.id)} 
          />
        ))}
      </div>
    </div>
  );
}