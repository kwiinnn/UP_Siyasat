import axios from 'axios';
import type {
  ResearchDocument,
  Department,
  Degree,
  Author,
  Category,
  StatsResponse,
  AuthResponse,
  DocumentType,
  CollegeName,
} from '../types';

// ── Axios instance ────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://http://13.229.109.174/api/api',
});

// Automatically attach token to every request if one exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('siyasat_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Query param types ─────────────────────────────────────

export interface DocumentFilters {
  type?:          DocumentType;
  college?:       CollegeName;
  department_id?: number;
  category_id?:   number;
  year?:          number;
  q?:             string;
}

// ── Documents ─────────────────────────────────────────────

export const documentsApi = {

  getAll: (filters?: DocumentFilters, signal?: AbortSignal) =>
    api.get<ResearchDocument[]>('/documents', {
      params: filters,
      signal,
    }).then(r => r.data),

  getOne: (id: number, signal?: AbortSignal) =>
    api.get<ResearchDocument>(`/documents/${id}`, { signal })
      .then(r => r.data),

  getRecent: (limit = 5) =>
    api.get<ResearchDocument[]>('/documents', {
      params: { limit },
    }).then(r => r.data),

};

// ── Browse shortcuts ──────────────────────────────────────

export const browseApi = {

  undergraduate: (filters?: Omit<DocumentFilters, 'type'>, signal?: AbortSignal) =>
    api.get<ResearchDocument[]>('/browse/undergraduate', {
      params: filters,
      signal,
    }).then(r => r.data),

  postgraduate: (filters?: Omit<DocumentFilters, 'type'>, signal?: AbortSignal) =>
    api.get<ResearchDocument[]>('/browse/postgraduate', {
      params: filters,
      signal,
    }).then(r => r.data),

  faculty: (filters?: Omit<DocumentFilters, 'type'>, signal?: AbortSignal) =>
    api.get<ResearchDocument[]>('/browse/faculty', {
      params: filters,
      signal,
    }).then(r => r.data),

};

// ── Departments ───────────────────────────────────────────

export const departmentsApi = {

  getAll: () =>
    api.get<Department[]>('/departments').then(r => r.data),

};

// ── Degrees ───────────────────────────────────────────────

export const degreesApi = {

  getAll: (departmentId?: number) =>
    api.get<Degree[]>('/degrees', {
      params: departmentId ? { department_id: departmentId } : undefined,
    }).then(r => r.data),

};

// ── Categories ────────────────────────────────────────────

export const categoriesApi = {

  getAll: () =>
    api.get<Category[]>('/categories').then(r => r.data),

};

// ── Authors ───────────────────────────────────────────────

export const authorsApi = {

  getAll: (query?: string) =>
    api.get<Author[]>('/authors', {
      params: query ? { q: query } : undefined,
    }).then(r => r.data),

  getOne: (id: number) =>
    api.get<Author>(`/authors/${id}`).then(r => r.data),

};

// ── Stats ─────────────────────────────────────────────────

export const statsApi = {

  get: () =>
    api.get<StatsResponse>('/stats').then(r => r.data),

};

// ── Auth ──────────────────────────────────────────────────

export const authApi = {

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password })
      .then(r => r.data),

  logout: () =>
    api.post('/auth/logout').then(r => r.data),

  me: () =>
    api.get<AuthResponse['user']>('/auth/me').then(r => r.data),

};

export default api;