export type LeadStatus =
  | 'novo'
  | 'em_analise'
  | 'qualificado'
  | 'aprovado'
  | 'rejeitado'
  | 'arquivado';

export type ProjectStatus =
  | 'rascunho'
  | 'em_desenvolvimento'
  | 'publicado'
  | 'arquivado';

export type MemberStatus = 'ativo' | 'arquivado';

export type FormType = 'voluntarios_tech' | 'contato_geral' | 'sugestao_projeto';

export type Lead = {
  id: string;
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
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type FormSubmission = {
  id: string;
  formType: FormType;
  name: string;
  email: string;
  subject: string;
  message: string;
  linkedLeadId?: string;
  createdAt: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  categoryId: string;
  objectiveIds: string[];
  tagIds: string[];
  status: ProjectStatus;
  externalLink?: string;
  stack: string[];
  metrics: ProjectMetric[];
  gallery: string[];
  roadmap: string[];
  teamIds: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Member = {
  id: string;
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
  status: MemberStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Contribution = {
  id: string;
  memberId: string;
  projectId: string;
  role: string;
  description: string;
  hours: number;
  period: string;
  date: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Objective = {
  id: string;
  name: string;
  description: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type MediaFile = {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaUrl: string;
  institutionalText: string;
  homeMetrics: ProjectMetric[];
  globalLinks: Array<{ label: string; url: string }>;
  socials: Array<{ network: string; url: string }>;
  seoTitle: string;
  seoDescription: string;
  footerText: string;
};

export type Activity = {
  id: string;
  type: string;
  description: string;
  createdAt: string;
};

export type AdminDatabase = {
  leads: Lead[];
  formSubmissions: FormSubmission[];
  projects: Project[];
  members: Member[];
  contributions: Contribution[];
  categories: Category[];
  objectives: Objective[];
  tags: Tag[];
  media: MediaFile[];
  settings: SiteSettings;
  activities: Activity[];
};
