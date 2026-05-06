import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Thesis } from '../types';

interface DetailPageProps {
  thesis: Thesis | undefined;
}

export default function DetailPage({ thesis }: DetailPageProps) {
  if (!thesis) return <div>Thesis not found.</div>;

  return (
    <div className="animate-in fade-in duration-300 w-full">
      <div className="text-xs text-gray-500 mb-6 flex flex-wrap gap-1">
        <span>Home</span> &gt; <span>Undergraduate Theses</span> &gt; <span>{thesis.id}</span>
      </div>
      
      <h3 className="text-[#7A1114] font-optima font-bold text-xl border-b border-gray-200 pb-4 mb-6">
        UNDERGRADUATE THESES
      </h3>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-200 pb-6 mb-6">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug">
            {thesis.title}
          </h2>
          <p className="text-sm md:text-xs text-[#7A1114] font-medium leading-relaxed">
            {thesis.authors}, <span className="italic text-gray-600 block sm:inline mt-1 sm:mt-0">{thesis.college}, University of the Philippines Mindanao</span>
          </p>
        </div>
        {/* Changed to w-full md:w-auto to make the button easy to press on mobile */}
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#7A1114] hover:bg-[#5A0C0E] text-white px-4 py-3 md:py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          <ExternalLink size={16} /> Link to Full Text
        </button>
      </div>

      <div className="space-y-5 text-sm">
        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">Date</h4>
          <p className="text-gray-700 text-sm md:text-xs">5-{thesis.year}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">Degree</h4>
          <p className="text-gray-700 text-sm md:text-xs">{thesis.degree}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">College</h4>
          <p className="text-gray-700 text-sm md:text-xs">{thesis.department}</p>
        </div>
        <div className="pt-2">
          <h4 className="font-bold text-gray-900 text-xs mb-2">Abstract</h4>
          <p className="text-gray-700 text-sm md:text-xs leading-relaxed text-justify">
            {thesis.abstract}
          </p>
        </div>
      </div>
    </div>
  );
}