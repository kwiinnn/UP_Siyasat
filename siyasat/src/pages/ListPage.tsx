import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, X } from 'lucide-react';
import ThesisCard from '../components/ThesisCard';
import { documentsApi, departmentsApi, statsApi } from '../services/api';
import { TYPE_LABELS, COLLEGE_LABELS } from '../types';
import type { ResearchDocument, DocumentType, CollegeName } from '../types';

interface ListPageProps {
  type: DocumentType;
}

export default function ListPage({ type }: ListPageProps) {
  const [docs, setDocs]                   = useState<ResearchDocument[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  // Filter state
  const [selectedCollege, setSelectedCollege] = useState<CollegeName | ''>('');
  const [selectedYear, setSelectedYear]       = useState<string>('');
  const [availableYears, setAvailableYears]   = useState<string[]>([]);
  const [collegeOpen, setCollegeOpen]         = useState(false);
  const [yearOpen, setYearOpen]               = useState(false);

  const collegeRef = useRef<HTMLDivElement>(null);
  const yearRef    = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const q              = searchParams.get('q') ?? undefined;
  const label          = TYPE_LABELS[type];

  // College options — always fixed, no need to fetch
  const colleges: { value: CollegeName; label: string }[] = [
    { value: 'CSM',  label: 'College of Sciences and Mathematics' },
    { value: 'CHSS', label: 'College of Humanities and Social Sciences' },
    { value: 'SOM',  label: 'School of Management' },
  ];

  // Fetch available years from stats endpoint on mount
  useEffect(() => {
    statsApi.get()
      .then(stats => {
        const years = Object.keys(stats.by_year).sort((a, b) => Number(b) - Number(a));
        setAvailableYears(years);
      })
      .catch(() => {});
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (collegeRef.current && !collegeRef.current.contains(e.target as Node))
        setCollegeOpen(false);
      if (yearRef.current && !yearRef.current.contains(e.target as Node))
        setYearOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset filters when document type changes
  useEffect(() => {
    setSelectedCollege('');
    setSelectedYear('');
  }, [type]);

  // Fetch documents whenever type, filters, or search query changes
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setDocs([]);

    documentsApi.getAll(
      {
        type,
        q,
        college:  selectedCollege || undefined,
        year:     selectedYear ? Number(selectedYear) : undefined,
      },
      controller.signal
    )
      .then(data => setDocs(data))
      .catch(err => {
        if (err.name !== 'CanceledError') setError('Failed to load documents.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [type, q, selectedCollege, selectedYear]);

  // Check if any filter is active
  const hasActiveFilters = selectedCollege !== '' || selectedYear !== '';

  const clearFilters = () => {
    setSelectedCollege('');
    setSelectedYear('');
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">

      

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 font-medium">
        <span
          onClick={() => navigate('/')}
          className="hover:text-[#7A1114] cursor-pointer transition-colors"
        >
          Home
        </span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800">{label}</span>
      </div>

      {/* Heading + filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-100 pb-5 mb-8 gap-6">
        <h3 className="text-[#7A1114] font-optima font-bold text-2xl tracking-wide">
          {label.toUpperCase()}
        </h3>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter size={16} /> Filters:
          </div>

          {/* College dropdown */}
          <div className="relative w-full sm:w-auto" ref={collegeRef}>
            <button
              onClick={() => { setCollegeOpen(o => !o); setYearOpen(false); }}
              className={`flex items-center justify-between w-full sm:w-44 px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-all shadow-sm gap-2
                ${selectedCollege ? 'border-[#7A1114] text-[#7A1114]' : 'border-gray-300 text-gray-700'}`}
            >
              <span className="truncate">
                {selectedCollege ? selectedCollege : 'College'}
              </span>
              <ChevronDown
                size={14}
                className={`flex-shrink-0 transition-transform ${collegeOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {collegeOpen && (
              <div className="absolute z-50 mt-1 w-full sm:w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden left-0 sm:left-auto sm:right-0">
                <button
                  onClick={() => { setSelectedCollege(''); setCollegeOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                >
                  All Colleges
                </button>
                {colleges.map(c => (
                  <button
                    key={c.value}
                    onClick={() => { setSelectedCollege(c.value); setCollegeOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                      ${selectedCollege === c.value ? 'text-[#7A1114] font-medium bg-red-50' : 'text-gray-700'}`}
                  >
                    {c.label}
                    <span className="text-xs text-gray-400 ml-1">({c.value})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year dropdown */}
          <div className="relative w-full sm:w-auto" ref={yearRef}>
            <button
              onClick={() => { setYearOpen(o => !o); setCollegeOpen(false); }}
              className={`flex items-center justify-between w-full sm:w-28 px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-all shadow-sm gap-2
                ${selectedYear ? 'border-[#7A1114] text-[#7A1114]' : 'border-gray-300 text-gray-700'}`}
            >
              <span>{selectedYear || 'Year'}</span>
              <ChevronDown
                size={14}
                className={`flex-shrink-0 transition-transform ${yearOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {yearOpen && (
              <div className="absolute z-50 mt-1 w-full sm:w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-56 overflow-y-auto left-0 sm:left-auto sm:right-0">
                <button
                  onClick={() => { setSelectedYear(''); setYearOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                >
                  All Years
                </button>
                {availableYears.map(year => (
                  <button
                    key={year}
                    onClick={() => { setSelectedYear(year); setYearOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                      ${selectedYear === year ? 'text-[#7A1114] font-medium bg-red-50' : 'text-gray-700'}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear filters button — only shows when a filter is active */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#7A1114] transition-colors"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCollege && (
            <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#7A1114] border border-[#7A1114]/20 px-3 py-1 rounded-full">
              {COLLEGE_LABELS[selectedCollege]}
              <button onClick={() => setSelectedCollege('')}>
                <X size={10} />
              </button>
            </span>
          )}
          {selectedYear && (
            <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#7A1114] border border-[#7A1114]/20 px-3 py-1 rounded-full">
              {selectedYear}
              <button onClick={() => setSelectedYear('')}>
                <X size={10} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Search query indicator */}
      {q && (
        <div className="mb-6 text-sm text-gray-600">
          Showing results for{' '}
          <span className="font-medium text-[#7A1114]">"{q}"</span>
          <button
            onClick={() => navigate(`/${type.toLowerCase()}`)}
            className="text-gray-400 hover:text-gray-600 underline ml-2"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Loading skeleton */}
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
        <div className="text-center py-16">
          <p className="text-sm text-gray-500 mb-2">
            {q
              ? `No documents found for "${q}".`
              : 'No documents found for the selected filters.'}
          </p>
          {(hasActiveFilters || q) && (
            <button
              onClick={() => { clearFilters(); navigate(`/${type.toLowerCase()}`); }}
              className="text-sm text-[#7A1114] hover:underline mt-1"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {!loading && !error && docs.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-4">
            {docs.length} document{docs.length !== 1 ? 's' : ''} found
          </p>
          <div className="space-y-5">
            {docs.map(doc => (
              <ThesisCard
                key={doc.document_id}
                thesis={doc}
                onClick={() => navigate(`/document/${doc.document_id}`)}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}