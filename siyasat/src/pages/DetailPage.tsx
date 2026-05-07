import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { documentsApi } from '../services/api';
import { formatAuthors, formatCollege } from '../utils/formatters';
import { formatDocumentType } from '../utils/formatters';
import type { ResearchDocument } from '../types';

interface DetailPageProps {
  documentId: number;
}

export default function DetailPage({ documentId }: DetailPageProps) {
  const [doc, setDoc] = useState<ResearchDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    documentsApi.getOne(documentId)
      .then(data => setDoc(data))
      .catch(() => setError('Document not found.'))
      .finally(() => setLoading(false));
  }, [documentId]);

  if (loading) return (
    <div className="space-y-4 animate-pulse w-full">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-32 bg-gray-100 rounded w-full mt-4" />
    </div>
  );

  if (error || !doc) return (
    <div className="text-sm text-gray-500">{error ?? 'Document not found.'}</div>
  );

  // e.g. "Undergraduate Theses"
  const typeLabel = formatDocumentType(doc.document_type);

  // e.g. "DMPCS" from department_code
  const deptCode = doc.department?.department_code ?? '—';

  // e.g. "College of Sciences and Mathematics"
  const collegeName = formatCollege(doc.department?.college_name);

  // e.g. "Bachelor of Science in Computer Science"
  const degreeName = doc.degree?.degree_name ?? '—';

  // e.g. "May 2025"
  const dateDisplay = (() => {
    const date = new Date(doc.upload_date);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  })();

  return (
    <div className="animate-in fade-in duration-300 w-full">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6 flex flex-wrap gap-1">
        <span>Home</span>
        <span>&gt;</span>
        <span>{typeLabel}</span>
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

      {/* Document metadata */}
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
          <p className="text-gray-700 text-xs leading-relaxed text-justify">
            {doc.abstract}
          </p>
        </div>

      </div>
    </div>
  );
}