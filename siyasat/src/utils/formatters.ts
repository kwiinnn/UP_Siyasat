import type { Author, ResearchDocument } from '../types';

// Formats author array → "Quimosing, J., Into, F., et al."
export function formatAuthors(authors?: Author[]): string {
  if (!authors || authors.length === 0) return 'Unknown Author';

  const formatted = authors.map(a => {
    const initial = a.middle_initial
      ? ` ${a.middle_initial}.`
      : '';
    return `${a.last_name}, ${a.first_name.charAt(0)}.${initial}`;
  });

  if (formatted.length <= 2) return formatted.join(', ');
  return `${formatted[0]}, ${formatted[1]}, et al.`;
}

// Formats publication_year + upload_date → "5-2025"
export function formatDate(doc: ResearchDocument): string {
  const date = new Date(doc.upload_date);
  const month = date.getMonth() + 1;
  return `${month}-${doc.publication_year}`;
}

// Formats document_type → breadcrumb label
export function formatDocumentType(type: string): string {
  const map: Record<string, string> = {
    Undergraduate: 'Undergraduate Theses',
    Postgraduate:  'Postgraduate Theses',
    Faculty:       'Faculty Theses',
  };
  return map[type] ?? type;
}

// Formats college code → full name
export function formatCollege(code?: string): string {
  const map: Record<string, string> = {
    CSM:  'College of Sciences and Mathematics',
    CHSS: 'College of Humanities and Social Sciences',
    SOM:  'School of Management',
  };
  return code ? (map[code] ?? code) : 'Unknown College';
}