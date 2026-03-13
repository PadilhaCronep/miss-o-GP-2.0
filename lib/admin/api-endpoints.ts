export const AdminApiEndpoints = {
  bootstrap: '/admin/bootstrap',
  dashboard: '/admin/dashboard',
  activities: '/admin/activities',
  leads: '/admin/leads',
  forms: '/admin/forms',
  projects: '/admin/projects',
  members: '/admin/members',
  contributions: '/admin/contributions',
  categories: '/admin/categories',
  objectives: '/admin/objectives',
  tags: '/admin/tags',
  media: '/admin/media',
  settings: '/admin/settings',
} as const;

export type AdminEndpointKey = keyof typeof AdminApiEndpoints;
