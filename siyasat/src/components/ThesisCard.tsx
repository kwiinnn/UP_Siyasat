import React from 'react';
import type { ResearchDocument } from '../types';
import { formatAuthors } from '../utils/formatters';

interface ThesisCardProps {
  thesis: ResearchDocument;
  onClick?: () => void;
}

export default function ThesisCard({ thesis, onClick }: ThesisCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`border border-gray-200 rounded-lg p-5 bg-white transition-all 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-[#7A1114]/30' : 'shadow-sm hover:shadow-md'}`}
    >
      <h4 className="font-bold text-gray-800 text-sm mb-1">{thesis.title}</h4>
        <p className="text-xs text-gray-500">
        {formatAuthors(thesis.authors)} ({thesis.publication_year}) | {thesis.department?.department_code ?? '—'}
      </p>
    </div>
  );
}