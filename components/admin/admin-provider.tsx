'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialAdminDatabase } from '@/lib/admin/seed';
import { ADMIN_DATA_MODE } from '@/lib/admin/runtime-config';
import type {
  Activity,
  AdminDatabase,
  Category,
  Contribution,
  FormSubmission,
  Lead,
  LeadStatus,
  MediaFile,
  Member,
  Objective,
  Project,
  SiteSettings,
  Tag,
} from '@/lib/admin/types';

const STORAGE_KEY = 'missao_admin_db_v2';

type TaxonomyKind = 'categories' | 'objectives' | 'tags';

type AdminContextType = {
  integrationMode: string;
  db: AdminDatabase;
  ready: boolean;
  resetDemoData: () => void;
  upsertLead: (lead: Partial<Lead> & { id?: string }) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  upsertFormSubmission: (submission: Partial<FormSubmission> & { id?: string }) => void;
  linkSubmissionToLead: (submissionId: string, leadId: string) => void;
  deleteFormSubmission: (id: string) => void;
  upsertProject: (project: Partial<Project> & { id?: string }) => void;
  deleteProject: (id: string) => void;
  upsertMember: (member: Partial<Member> & { id?: string }) => void;
  deleteMember: (id: string) => void;
  upsertContribution: (contribution: Partial<Contribution> & { id?: string }) => void;
  deleteContribution: (id: string) => void;
  upsertTaxonomyItem: (kind: TaxonomyKind, item: Partial<Category | Objective | Tag> & { id?: string }) => void;
  deleteTaxonomyItem: (kind: TaxonomyKind, id: string) => void;
  addMediaFiles: (files: MediaFile[]) => void;
  deleteMediaFile: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

const nowIso = () => new Date().toISOString();
const createId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

function pushActivity(db: AdminDatabase, activity: Omit<Activity, 'id' | 'createdAt'>): AdminDatabase {
  return {
    ...db,
    activities: [
      {
        id: createId('act'),
        createdAt: nowIso(),
        ...activity,
      },
      ...db.activities,
    ].slice(0, 80),
  };
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<AdminDatabase>(initialAdminDatabase);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminDatabase;
        setDb(parsed);
      }
    } catch {
      setDb(initialAdminDatabase);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }, [db, ready]);

  const resetDemoData = useCallback(() => {
    setDb(initialAdminDatabase);
  }, []);

  const upsertLead = useCallback((lead: Partial<Lead> & { id?: string }) => {
    setDb((prev) => {
      const isEdit = Boolean(lead.id && prev.leads.some((item) => item.id === lead.id));
      const id = lead.id || createId('lead');
      const merged: Lead = isEdit
        ? {
            ...(prev.leads.find((item) => item.id === id) as Lead),
            ...lead,
            id,
            updatedAt: nowIso(),
          }
        : {
            id,
            name: lead.name || '',
            email: lead.email || '',
            city: lead.city || '',
            area: lead.area || '',
            technologies: lead.technologies || [],
            experienceLevel: lead.experienceLevel || '',
            availability: lead.availability || '',
            motivation: lead.motivation || '',
            github: lead.github,
            linkedin: lead.linkedin,
            status: lead.status || 'novo',
            notes: lead.notes || '',
            createdAt: nowIso(),
            updatedAt: nowIso(),
          };

      const updated = isEdit
        ? prev.leads.map((item) => (item.id === id ? merged : item))
        : [merged, ...prev.leads];

      const next = { ...prev, leads: updated };
      return pushActivity(next, {
        type: 'lead',
        description: isEdit ? `Lead atualizado: ${merged.name}` : `Novo lead cadastrado: ${merged.name}`,
      });
    });
  }, []);

  const updateLeadStatus = useCallback((id: string, status: LeadStatus) => {
    setDb((prev) => {
      const lead = prev.leads.find((item) => item.id === id);
      if (!lead) return prev;
      const next = {
        ...prev,
        leads: prev.leads.map((item) =>
          item.id === id ? { ...item, status, updatedAt: nowIso() } : item,
        ),
      };
      return pushActivity(next, {
        type: 'lead',
        description: `Status do lead ${lead.name} alterado para ${status}`,
      });
    });
  }, []);

  const deleteLead = useCallback((id: string) => {
    setDb((prev) => {
      const lead = prev.leads.find((item) => item.id === id);
      if (!lead) return prev;
      const next = { ...prev, leads: prev.leads.filter((item) => item.id !== id) };
      return pushActivity(next, {
        type: 'lead',
        description: `Lead removido: ${lead.name}`,
      });
    });
  }, []);

  const upsertFormSubmission = useCallback((submission: Partial<FormSubmission> & { id?: string }) => {
    setDb((prev) => {
      const isEdit = Boolean(submission.id && prev.formSubmissions.some((item) => item.id === submission.id));
      const id = submission.id || createId('form');
      const merged: FormSubmission = isEdit
        ? {
            ...(prev.formSubmissions.find((item) => item.id === id) as FormSubmission),
            ...submission,
            id,
          }
        : {
            id,
            formType: submission.formType || 'contato_geral',
            name: submission.name || '',
            email: submission.email || '',
            subject: submission.subject || '',
            message: submission.message || '',
            linkedLeadId: submission.linkedLeadId,
            createdAt: nowIso(),
          };
      const updated = isEdit
        ? prev.formSubmissions.map((item) => (item.id === id ? merged : item))
        : [merged, ...prev.formSubmissions];
      const next = { ...prev, formSubmissions: updated };
      return pushActivity(next, {
        type: 'form',
        description: isEdit ? `Formulario atualizado: ${merged.subject}` : `Novo formulario: ${merged.subject}`,
      });
    });
  }, []);

  const linkSubmissionToLead = useCallback((submissionId: string, leadId: string) => {
    setDb((prev) => {
      const submission = prev.formSubmissions.find((item) => item.id === submissionId);
      if (!submission) return prev;
      const next = {
        ...prev,
        formSubmissions: prev.formSubmissions.map((item) =>
          item.id === submissionId ? { ...item, linkedLeadId: leadId } : item,
        ),
      };
      return pushActivity(next, {
        type: 'form',
        description: `Formulario vinculado a lead: ${submission.subject}`,
      });
    });
  }, []);

  const deleteFormSubmission = useCallback((id: string) => {
    setDb((prev) => {
      const item = prev.formSubmissions.find((submission) => submission.id === id);
      if (!item) return prev;
      const next = {
        ...prev,
        formSubmissions: prev.formSubmissions.filter((submission) => submission.id !== id),
      };
      return pushActivity(next, {
        type: 'form',
        description: `Formulario removido: ${item.subject}`,
      });
    });
  }, []);

  const upsertProject = useCallback((project: Partial<Project> & { id?: string }) => {
    setDb((prev) => {
      const isEdit = Boolean(project.id && prev.projects.some((item) => item.id === project.id));
      const id = project.id || createId('proj');
      const merged: Project = isEdit
        ? {
            ...(prev.projects.find((item) => item.id === id) as Project),
            ...project,
            id,
            updatedAt: nowIso(),
          }
        : {
            id,
            name: project.name || '',
            slug: project.slug || '',
            subtitle: project.subtitle || '',
            shortDescription: project.shortDescription || '',
            longDescription: project.longDescription || '',
            categoryId: project.categoryId || '',
            objectiveIds: project.objectiveIds || [],
            tagIds: project.tagIds || [],
            status: project.status || 'rascunho',
            externalLink: project.externalLink,
            stack: project.stack || [],
            metrics: project.metrics || [],
            gallery: project.gallery || [],
            roadmap: project.roadmap || [],
            teamIds: project.teamIds || [],
            featured: Boolean(project.featured),
            createdAt: nowIso(),
            updatedAt: nowIso(),
          };
      const updated = isEdit
        ? prev.projects.map((item) => (item.id === id ? merged : item))
        : [merged, ...prev.projects];
      const next = { ...prev, projects: updated };
      return pushActivity(next, {
        type: 'project',
        description: isEdit ? `Projeto atualizado: ${merged.name}` : `Projeto criado: ${merged.name}`,
      });
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setDb((prev) => {
      const target = prev.projects.find((project) => project.id === id);
      if (!target) return prev;
      const next = {
        ...prev,
        projects: prev.projects.filter((project) => project.id !== id),
        contributions: prev.contributions.filter((item) => item.projectId !== id),
      };
      return pushActivity(next, {
        type: 'project',
        description: `Projeto removido: ${target.name}`,
      });
    });
  }, []);

  const upsertMember = useCallback((member: Partial<Member> & { id?: string }) => {
    setDb((prev) => {
      const isEdit = Boolean(member.id && prev.members.some((item) => item.id === member.id));
      const id = member.id || createId('mem');
      const merged: Member = isEdit
        ? {
            ...(prev.members.find((item) => item.id === id) as Member),
            ...member,
            id,
            updatedAt: nowIso(),
          }
        : {
            id,
            name: member.name || '',
            photoUrl: member.photoUrl,
            role: member.role || '',
            shortBio: member.shortBio || '',
            longBio: member.longBio || '',
            stack: member.stack || [],
            hoursDedicated: member.hoursDedicated || 0,
            projectIds: member.projectIds || [],
            badges: member.badges || [],
            github: member.github,
            linkedin: member.linkedin,
            instagram: member.instagram,
            email: member.email || '',
            status: member.status || 'ativo',
            featured: Boolean(member.featured),
            createdAt: nowIso(),
            updatedAt: nowIso(),
          };
      const updated = isEdit
        ? prev.members.map((item) => (item.id === id ? merged : item))
        : [merged, ...prev.members];
      const next = { ...prev, members: updated };
      return pushActivity(next, {
        type: 'member',
        description: isEdit ? `Membro atualizado: ${merged.name}` : `Novo membro: ${merged.name}`,
      });
    });
  }, []);

  const deleteMember = useCallback((id: string) => {
    setDb((prev) => {
      const target = prev.members.find((item) => item.id === id);
      if (!target) return prev;
      const next = {
        ...prev,
        members: prev.members.filter((item) => item.id !== id),
        contributions: prev.contributions.filter((item) => item.memberId !== id),
        projects: prev.projects.map((project) => ({
          ...project,
          teamIds: project.teamIds.filter((memberId) => memberId !== id),
        })),
      };
      return pushActivity(next, {
        type: 'member',
        description: `Membro removido: ${target.name}`,
      });
    });
  }, []);

  const upsertContribution = useCallback((contribution: Partial<Contribution> & { id?: string }) => {
    setDb((prev) => {
      const isEdit = Boolean(
        contribution.id && prev.contributions.some((item) => item.id === contribution.id),
      );
      const id = contribution.id || createId('cont');
      const merged: Contribution = isEdit
        ? {
            ...(prev.contributions.find((item) => item.id === id) as Contribution),
            ...contribution,
            id,
          }
        : {
            id,
            memberId: contribution.memberId || '',
            projectId: contribution.projectId || '',
            role: contribution.role || '',
            description: contribution.description || '',
            hours: contribution.hours || 0,
            period: contribution.period || '',
            date: contribution.date || nowIso(),
            createdAt: nowIso(),
          };
      const updated = isEdit
        ? prev.contributions.map((item) => (item.id === id ? merged : item))
        : [merged, ...prev.contributions];
      const next = { ...prev, contributions: updated };
      return pushActivity(next, {
        type: 'contribution',
        description: isEdit
          ? 'Contribuicao atualizada'
          : `Contribuicao registrada (${merged.role || 'sem funcao'})`,
      });
    });
  }, []);

  const deleteContribution = useCallback((id: string) => {
    setDb((prev) => {
      const exists = prev.contributions.some((item) => item.id === id);
      if (!exists) return prev;
      const next = {
        ...prev,
        contributions: prev.contributions.filter((item) => item.id !== id),
      };
      return pushActivity(next, {
        type: 'contribution',
        description: 'Contribuicao removida',
      });
    });
  }, []);

  const upsertTaxonomyItem = useCallback(
    (kind: TaxonomyKind, item: Partial<Category | Objective | Tag> & { id?: string }) => {
      setDb((prev) => {
        const list = prev[kind] as Array<Category | Objective | Tag>;
        const isEdit = Boolean(item.id && list.some((entry) => entry.id === item.id));
        const id = item.id || createId(kind.slice(0, 3));
        const merged = isEdit
          ? ({ ...(list.find((entry) => entry.id === id) as Category | Objective | Tag), ...item, id } as
              | Category
              | Objective
              | Tag)
          : ({ id, name: item.name || '', description: 'description' in (item || {}) ? (item as Category | Objective).description || '' : '' } as
              | Category
              | Objective
              | Tag);

        const updated = isEdit
          ? list.map((entry) => (entry.id === id ? merged : entry))
          : [merged, ...list];

        const next = { ...prev, [kind]: updated } as AdminDatabase;
        return pushActivity(next, {
          type: kind,
          description: isEdit ? `${kind} atualizado` : `${kind} criado`,
        });
      });
    },
    [],
  );

  const deleteTaxonomyItem = useCallback((kind: TaxonomyKind, id: string) => {
    setDb((prev) => {
      const list = prev[kind] as Array<Category | Objective | Tag>;
      if (!list.some((entry) => entry.id === id)) return prev;
      const next = {
        ...prev,
        [kind]: list.filter((entry) => entry.id !== id),
      } as AdminDatabase;
      return pushActivity(next, {
        type: kind,
        description: `${kind} removido`,
      });
    });
  }, []);

  const addMediaFiles = useCallback((files: MediaFile[]) => {
    setDb((prev) => {
      const next = {
        ...prev,
        media: [...files, ...prev.media],
      };
      return pushActivity(next, {
        type: 'media',
        description: `${files.length} arquivo(s) enviado(s)`,
      });
    });
  }, []);

  const deleteMediaFile = useCallback((id: string) => {
    setDb((prev) => {
      const next = {
        ...prev,
        media: prev.media.filter((item) => item.id !== id),
      };
      return pushActivity(next, {
        type: 'media',
        description: 'Arquivo de midia removido',
      });
    });
  }, []);

  const updateSettings = useCallback((settings: SiteSettings) => {
    setDb((prev) => {
      const next = {
        ...prev,
        settings,
      };
      return pushActivity(next, {
        type: 'settings',
        description: 'Configuracoes gerais atualizadas',
      });
    });
  }, []);

  const value = useMemo<AdminContextType>(
    () => ({
      integrationMode: ADMIN_DATA_MODE,
      db,
      ready,
      resetDemoData,
      upsertLead,
      updateLeadStatus,
      deleteLead,
      upsertFormSubmission,
      linkSubmissionToLead,
      deleteFormSubmission,
      upsertProject,
      deleteProject,
      upsertMember,
      deleteMember,
      upsertContribution,
      deleteContribution,
      upsertTaxonomyItem,
      deleteTaxonomyItem,
      addMediaFiles,
      deleteMediaFile,
      updateSettings,
    }),
    [
      db,
      ready,
      resetDemoData,
      upsertLead,
      updateLeadStatus,
      deleteLead,
      upsertFormSubmission,
      linkSubmissionToLead,
      deleteFormSubmission,
      upsertProject,
      deleteProject,
      upsertMember,
      deleteMember,
      upsertContribution,
      deleteContribution,
      upsertTaxonomyItem,
      deleteTaxonomyItem,
      addMediaFiles,
      deleteMediaFile,
      updateSettings,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}

