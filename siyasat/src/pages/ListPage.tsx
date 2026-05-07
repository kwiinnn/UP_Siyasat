import React, { useEffect, useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import ThesisCard from '../components/ThesisCard';
import { documentsApi } from '../services/api';
import type { ResearchDocument } from '../types';

interface ListPageProps {
  onRead: (id: number) => void;
}

export default function ListPage({ onRead }: ListPageProps) {
  const [docs, setDocs] = useState<ResearchDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    documentsApi.getAll({ type: 'Undergraduate' }, controller.signal)
      .then(data => setDocs(data))
      .catch(err => {
        if (err.name !== 'CanceledError') setError('Failed to load documents.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

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
          <button className="flex items-center justify-between w-full sm:w-36 px-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
            College <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full sm:w-28 px-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
            Year <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="border border-gray-100 rounded-lg p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && docs.length === 0 && (
        <p className="text-sm text-gray-500">No documents found.</p>
      )}

      {!loading && !error && (
        <div className="space-y-5">
          {docs.map(doc => (
            <ThesisCard
              key={doc.document_id}
              thesis={doc}
              onClick={() => onRead(doc.document_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}