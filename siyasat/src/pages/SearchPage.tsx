import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ThesisCard from '../components/ThesisCard';
import { documentsApi } from '../services/api';
import { TYPE_LABELS } from '../types';
import type { ResearchDocument, DocumentType } from '../types';

// Results grouped by document type
interface GroupedResults {
  Undergraduate: ResearchDocument[];
  Postgraduate:  ResearchDocument[];
  Faculty:       ResearchDocument[];
}

const EMPTY_GROUPS: GroupedResults = {
  Undergraduate: [],
  Postgraduate:  [],
  Faculty:       [],
};

export default function SearchPage() {
  const [searchParams]                  = useSearchParams();
  const navigate                        = useNavigate();
  const q                               = searchParams.get('q') ?? '';

  const [inputValue, setInputValue]     = useState(q);
  const [results, setResults]           = useState<GroupedResults>(EMPTY_GROUPS);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [searched, setSearched]         = useState(false);

  // Total across all groups
  const totalCount =
    results.Undergraduate.length +
    results.Postgraduate.length +
    results.Faculty.length;

  // Fetch all three types in parallel when q changes
  useEffect(() => {
    if (!q.trim()) {
      setResults(EMPTY_GROUPS);
      setSearched(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setSearched(false);

    Promise.all([
      documentsApi.getAll({ type: 'Undergraduate', q }, controller.signal),
      documentsApi.getAll({ type: 'Postgraduate',  q }, controller.signal),
      documentsApi.getAll({ type: 'Faculty',       q }, controller.signal),
    ])
      .then(([undergrad, postgrad, faculty]) => {
        setResults({
          Undergraduate: undergrad,
          Postgraduate:  postgrad,
          Faculty:       faculty,
        });
        setSearched(true);
      })
      .catch(err => {
        if (err.name !== 'CanceledError') setError('Search failed. Please try again.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [q]);

  // Sync input value when URL q changes (e.g. browser back)
  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleClear = () => {
    setInputValue('');
    navigate('/search');
  };

  return (
    <div className="animate-in fade-in duration-300 w-full">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 font-medium">
        <span
          onClick={() => navigate('/')}
          className="hover:text-[#7A1114] cursor-pointer transition-colors"
        >
          Home
        </span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800">Search</span>
      </div>

      {/* Heading */}
      <h3 className="text-[#7A1114] font-optima font-bold text-2xl tracking-wide border-b border-gray-200 pb-4 mb-8">
        SEARCH REPOSITORY
      </h3>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#7A1114]/20 focus-within:border-[#7A1114] transition-all bg-white shadow-sm">
          <Search size={18} className="ml-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search titles, abstracts, authors..."
            className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
            autoFocus
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-3 text-white bg-[#7A1114] hover:bg-[#5A0C0E] transition-colors text-sm font-medium border-l border-gray-200"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-40 mb-3 animate-pulse" />
              <div className="space-y-3">
                {[1, 2].map(j => (
                  <div key={j} className="border border-gray-100 rounded-lg p-5 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* No query yet */}
      {!loading && !q && (
        <div className="text-center py-16">
          <Search size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="text-sm text-gray-400">
            Enter a keyword to search across all theses and research documents.
          </p>
        </div>
      )}

      {/* No results */}
      {!loading && searched && totalCount === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-gray-500 mb-1">
            No results found for <span className="font-medium text-gray-700">"{q}"</span>.
          </p>
          <p className="text-xs text-gray-400">Try different keywords or check your spelling.</p>
        </div>
      )}

      {/* Results */}
      {!loading && searched && totalCount > 0 && (
        <div className="space-y-10">

          {/* Summary */}
          <p className="text-xs text-gray-400">
            {totalCount} result{totalCount !== 1 ? 's' : ''} found for{' '}
            <span className="font-medium text-gray-600">"{q}"</span>
          </p>

          {/* Each group */}
          {(['Undergraduate', 'Postgraduate', 'Faculty'] as DocumentType[]).map(docType => {
            const group = results[docType];
            if (group.length === 0) return null;

            return (
              <div key={docType}>
                {/* Group heading */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[#7A1114] font-optima font-bold text-lg">
                    {TYPE_LABELS[docType]}
                  </h4>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {group.length} result{group.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-4">
                  {group.map(doc => (
                    <ThesisCard
                      key={doc.document_id}
                      thesis={doc}
                      onClick={() => navigate(`/document/${doc.document_id}`)}
                    />
                  ))}
                </div>

                {/* Link to browse full list of this type */}
                <button
                  onClick={() => navigate(`/${docType.toLowerCase()}?q=${encodeURIComponent(q)}`)}
                  className="mt-4 text-xs text-[#7A1114] hover:underline font-medium"
                >
                  Browse all {TYPE_LABELS[docType].toLowerCase()} matching "{q}" &rarr;
                </button>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}