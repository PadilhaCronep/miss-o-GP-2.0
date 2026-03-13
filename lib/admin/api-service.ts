import { adminFetch } from '@/lib/admin/api-http';
import { AdminApiEndpoints } from '@/lib/admin/api-endpoints';
import type {
  ActivityDTO,
  ApiListQuery,
  DashboardSummaryDTO,
  FormSubmissionUpsertDTO,
  LeadUpsertDTO,
  MemberUpsertDTO,
  ProjectUpsertDTO,
  ContributionUpsertDTO,
  TaxonomyUpsertDTO,
  MediaCreateDTO,
  SiteSettingsDTO,
} from '@/lib/admin/api-contracts';
import type { AdminDatabase } from '@/lib/admin/types';

function toQueryString(query?: ApiListQuery) {
  if (!query) return '';
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params.set(key, String(value));
  });
  const output = params.toString();
  return output ? `?${output}` : '';
}

export const adminApiService = {
  getBootstrap: () => adminFetch<AdminDatabase>(AdminApiEndpoints.bootstrap),
  getDashboard: () => adminFetch<DashboardSummaryDTO>(AdminApiEndpoints.dashboard),
  getActivities: (query?: ApiListQuery) =>
    adminFetch<ActivityDTO[]>(`${AdminApiEndpoints.activities}${toQueryString(query)}`),

  listLeads: (query?: ApiListQuery) => adminFetch(`${AdminApiEndpoints.leads}${toQueryString(query)}`),
  createLead: (payload: LeadUpsertDTO) =>
    adminFetch(AdminApiEndpoints.leads, { method: 'POST', body: JSON.stringify(payload) }),
  updateLead: (id: string, payload: LeadUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.leads}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteLead: (id: string) =>
    adminFetch(`${AdminApiEndpoints.leads}/${id}`, { method: 'DELETE' }),

  listForms: (query?: ApiListQuery) => adminFetch(`${AdminApiEndpoints.forms}${toQueryString(query)}`),
  createForm: (payload: FormSubmissionUpsertDTO) =>
    adminFetch(AdminApiEndpoints.forms, { method: 'POST', body: JSON.stringify(payload) }),
  updateForm: (id: string, payload: FormSubmissionUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.forms}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteForm: (id: string) =>
    adminFetch(`${AdminApiEndpoints.forms}/${id}`, { method: 'DELETE' }),

  listProjects: (query?: ApiListQuery) =>
    adminFetch(`${AdminApiEndpoints.projects}${toQueryString(query)}`),
  createProject: (payload: ProjectUpsertDTO) =>
    adminFetch(AdminApiEndpoints.projects, { method: 'POST', body: JSON.stringify(payload) }),
  updateProject: (id: string, payload: ProjectUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.projects}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteProject: (id: string) =>
    adminFetch(`${AdminApiEndpoints.projects}/${id}`, { method: 'DELETE' }),

  listMembers: (query?: ApiListQuery) =>
    adminFetch(`${AdminApiEndpoints.members}${toQueryString(query)}`),
  createMember: (payload: MemberUpsertDTO) =>
    adminFetch(AdminApiEndpoints.members, { method: 'POST', body: JSON.stringify(payload) }),
  updateMember: (id: string, payload: MemberUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.members}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteMember: (id: string) =>
    adminFetch(`${AdminApiEndpoints.members}/${id}`, { method: 'DELETE' }),

  listContributions: (query?: ApiListQuery) =>
    adminFetch(`${AdminApiEndpoints.contributions}${toQueryString(query)}`),
  createContribution: (payload: ContributionUpsertDTO) =>
    adminFetch(AdminApiEndpoints.contributions, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateContribution: (id: string, payload: ContributionUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.contributions}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteContribution: (id: string) =>
    adminFetch(`${AdminApiEndpoints.contributions}/${id}`, { method: 'DELETE' }),

  listCategories: (query?: ApiListQuery) =>
    adminFetch(`${AdminApiEndpoints.categories}${toQueryString(query)}`),
  createCategory: (payload: TaxonomyUpsertDTO) =>
    adminFetch(AdminApiEndpoints.categories, { method: 'POST', body: JSON.stringify(payload) }),
  updateCategory: (id: string, payload: TaxonomyUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.categories}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteCategory: (id: string) =>
    adminFetch(`${AdminApiEndpoints.categories}/${id}`, { method: 'DELETE' }),

  listObjectives: (query?: ApiListQuery) =>
    adminFetch(`${AdminApiEndpoints.objectives}${toQueryString(query)}`),
  createObjective: (payload: TaxonomyUpsertDTO) =>
    adminFetch(AdminApiEndpoints.objectives, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateObjective: (id: string, payload: TaxonomyUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.objectives}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteObjective: (id: string) =>
    adminFetch(`${AdminApiEndpoints.objectives}/${id}`, { method: 'DELETE' }),

  listTags: (query?: ApiListQuery) => adminFetch(`${AdminApiEndpoints.tags}${toQueryString(query)}`),
  createTag: (payload: TaxonomyUpsertDTO) =>
    adminFetch(AdminApiEndpoints.tags, { method: 'POST', body: JSON.stringify(payload) }),
  updateTag: (id: string, payload: TaxonomyUpsertDTO) =>
    adminFetch(`${AdminApiEndpoints.tags}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteTag: (id: string) =>
    adminFetch(`${AdminApiEndpoints.tags}/${id}`, { method: 'DELETE' }),

  listMedia: (query?: ApiListQuery) => adminFetch(`${AdminApiEndpoints.media}${toQueryString(query)}`),
  createMedia: (payload: MediaCreateDTO) =>
    adminFetch(AdminApiEndpoints.media, { method: 'POST', body: JSON.stringify(payload) }),
  deleteMedia: (id: string) => adminFetch(`${AdminApiEndpoints.media}/${id}`, { method: 'DELETE' }),

  getSettings: () => adminFetch<SiteSettingsDTO>(AdminApiEndpoints.settings),
  updateSettings: (payload: SiteSettingsDTO) =>
    adminFetch(AdminApiEndpoints.settings, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
};
