import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { documentsApi } from '../services/api';
import { formatAuthors, formatCollege, formatDocumentType } from '../utils/formatters';
import type { ResearchDocument } from '../types';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<ResearchDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    documentsApi.getOne(Number(id))
      .then(data => setDoc(data))
      .catch(() => setError('Document not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="space-y-4 animate-pulse w-full">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-32 bg-gray-100 rounded w-full mt-4" />
    </div>
  );

  if (error || !doc) return (
    <div className="text-sm text-gray-500">
      {error ?? 'Document not found.'}
      <button
        onClick={() => navigate(-1)}
        className="ml-3 text-[#7A1114] hover:underline"
      >
        Go back
      </button>
    </div>
  );

  const typeLabel    = formatDocumentType(doc.document_type);
  const typeRoute = (() => {
  const map: Record<string, string> = {
      Undergraduate: 'undergraduate',
      Postgraduate:  'postgraduate',
      Faculty:       'faculty',
    };
    return map[doc.document_type] ?? doc.document_type.toLowerCase();
  })();
  const deptCode     = doc.department?.department_code ?? '—';
  const collegeName  = formatCollege(doc.department?.college_name);
  const degreeName   = doc.degree?.degree_name ?? '—';
  const dateDisplay  = (() => {
    const date = new Date(doc.upload_date);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  })();

  return (
    <div className="animate-in fade-in duration-300 w-full">

      <img
        src="/detail-banner.png"
        alt="UP Siyasat Banner"
        className="w-full object-cover mb-8 "
        style={{ width: 'calc(100% + 2.5rem)' }}
      />

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6 flex flex-wrap gap-1 items-center">
        <span
          onClick={() => navigate('/')}
          className="hover:text-[#7A1114] cursor-pointer"
        >
          Home
        </span>
        <span>&gt;</span>
        <span
          onClick={() => navigate(`/${typeRoute}`)}
          className="hover:text-[#7A1114] cursor-pointer"
        >
          {typeLabel}
        </span>
        <span>&gt;</span>
        <span>{doc.document_id}</span>
      </div>

      {/* Section heading */}
      <h3 className="text-[#7A1114] font-optima font-bold text-xl border-b border-gray-200 pb-4 mb-6">
        {typeLabel.toUpperCase()}
      </h3>

      {/* Title + Full Text button */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-200 pb-6 mb-6">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug">
            {doc.title}
          </h2>
          <p className="text-sm text-[#7A1114] font-medium leading-relaxed">
            {formatAuthors(doc.authors)},{' '}
            <span className="italic text-gray-600">
              {collegeName}, University of the Philippines Mindanao
            </span>
          </p>
        </div>

        {doc.drive_url && (
          <button
            onClick={() => window.open(doc.drive_url!, '_blank')}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#7A1114] hover:bg-[#5A0C0E] text-white px-4 py-3 md:py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            <ExternalLink size={16} /> Link to Full Text
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-5 text-sm">
        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">Date</h4>
          <p className="text-gray-700 text-xs">{dateDisplay}</p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">Degree</h4>
          <p className="text-gray-700 text-xs">{degreeName}</p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">Department</h4>
          <p className="text-gray-700 text-xs">
            {doc.department?.department_name ?? '—'} ({deptCode})
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-xs mb-1">College</h4>
          <p className="text-gray-700 text-xs">{collegeName}</p>
        </div>

        {doc.categories && doc.categories.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-900 text-xs mb-1">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {doc.categories.map(cat => (
                <span
                  key={cat.category_id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                >
                  {cat.category_name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <h4 className="font-bold text-gray-900 text-xs mb-2">Abstract</h4>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed text-justify">
            {doc.abstract}
          </p>
        </div>
      </div>
    </div>
  );
}