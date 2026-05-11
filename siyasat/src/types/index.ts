// ── Core database types (match Laravel API exactly) ──────

export interface Department {
  department_id: number;
  department_name: string;
  department_code: string;
  college_name: 'CSM' | 'CHSS' | 'SOM';
}

export interface Degree {
  degree_id: number;
  degree_name: string;
  degree_code: string;
  degree_level: 'Undergraduate' | 'Postgraduate';
  department_id: number;
  department?: Department;
}

export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
  middle_initial?: string;
  affiliation: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  description?: string;
}

export interface ResearchDocument {
  document_id: number;
  title: string;
  abstract: string;
  publication_year: number;
  document_type: 'Undergraduate' | 'Postgraduate' | 'Faculty';
  drive_url?: string | null;
  upload_date: string;
  updated_at: string;
  department?: Department;
  degree?: Degree;
  authors?: Author[];
  categories?: Category[];
}

// ── Auth types ────────────────────────────────────────────

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'Student' | 'Faculty' | 'Colsec_Admin';
  department_id: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ── API response types ────────────────────────────────────

export interface StatsResponse {
  total_documents: number;
  by_type: Record<string, number>;
  by_college: Record<string, number>;
  by_year: Record<string, number>;
}

// ── UI helper types ───────────────────────────────────────

export type DocumentType = 'Undergraduate' | 'Postgraduate' | 'Faculty';
export type CollegeName = 'CSM' | 'CHSS' | 'SOM';

// Maps URL path segments to document_type values
export const ROUTE_TO_TYPE: Record<string, DocumentType> = {
  undergraduate: 'Undergraduate',
  postgraduate:  'Postgraduate',
  faculty:       'Faculty',
};

// Maps document_type values to display labels
export const TYPE_LABELS: Record<DocumentType, string> = {
  Undergraduate: 'Undergraduate Theses',
  Postgraduate:  'Postgraduate Theses',
  Faculty:       'Faculty Research',
};

// Full college name display labels
export const COLLEGE_LABELS: Record<CollegeName, string> = {
  CSM:  'College of Sciences and Mathematics',
  CHSS: 'College of Humanities and Social Sciences',
  SOM:  'School of Management',
};