export type ApiMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
};

export type ApiResponse<T> = {
  data: T;
  meta?: ApiMeta;
  message?: string;
};

export type ApiListQuery = {
  search?: string;
  page?: number;
  pageSize?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type DashboardSummaryDTO = {
  totalProjects: number;
  totalMembers: number;
  totalLeads: number;
  totalForms: number;
  publishedProjects: number;
  draftProjects: number;
};

export type ActivityDTO = {
  id: string;
  type: string;
  description: string;
  createdAt: string;
};

export type LeadUpsertDTO = {
  id?: string;
  name: string;
  email: string;
  city: string;
  area: string;
  technologies: string[];
  experienceLevel: string;
  availability: string;
  motivation: string;
  github?: string;
  linkedin?: string;
  status: string;
  notes?: string;
};

export type FormSubmissionUpsertDTO = {
  id?: string;
  formType: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  linkedLeadId?: string;
};

export type ProjectUpsertDTO = {
  id?: string;
  name: string;
  slug: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  categoryId: string;
  objectiveIds: string[];
  tagIds: string[];
  status: string;
  externalLink?: string;
  stack: string[];
  metrics: Array<{ label: string; value: string }>;
  gallery: string[];
  roadmap: string[];
  teamIds: string[];
  featured: boolean;
};

export type MemberUpsertDTO = {
  id?: string;
  name: string;
  photoUrl?: string;
  role: string;
  shortBio: string;
  longBio: string;
  stack: string[];
  hoursDedicated: number;
  projectIds: string[];
  badges: string[];
  github?: string;
  linkedin?: string;
  instagram?: string;
  email: string;
  status: string;
  featured: boolean;
};

export type ContributionUpsertDTO = {
  id?: string;
  memberId: string;
  projectId: string;
  role: string;
  description: string;
  hours: number;
  period: string;
  date: string;
};

export type TaxonomyUpsertDTO = {
  id?: string;
  name: string;
  description?: string;
};

export type MediaCreateDTO = {
  name: string;
  url: string;
  mimeType: string;
  size: number;
};

export type SiteSettingsDTO = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaUrl: string;
  institutionalText: string;
  homeMetrics: Array<{ label: string; value: string }>;
  globalLinks: Array<{ label: string; url: string }>;
  socials: Array<{ network: string; url: string }>;
  seoTitle: string;
  seoDescription: string;
  footerText: string;
};
