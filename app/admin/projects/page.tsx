'use client';

import { useMemo, useState } from 'react';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, Panel, ProjectStatusBadge, SectionHeader } from '@/components/admin/ui';
import type { Project, ProjectStatus } from '@/lib/admin/types';

const statusOptions: ProjectStatus[] = ['rascunho', 'em_desenvolvimento', 'publicado', 'arquivado'];

const emptyProject: Partial<Project> = {
  name: '',
  slug: '',
  subtitle: '',
  shortDescription: '',
  longDescription: '',
  categoryId: '',
  objectiveIds: [],
  tagIds: [],
  status: 'rascunho',
  externalLink: '',
  stack: [],
  metrics: [],
  gallery: [],
  roadmap: [],
  teamIds: [],
  featured: false,
};

export default function AdminProjectsPage() {
  const { db, upsertProject, deleteProject } = useAdmin();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | ProjectStatus>('todos');
  const [editing, setEditing] = useState<any | null>(null);

  const projects = useMemo(
    () =>
      db.projects.filter((project) => {
        const matchQuery =
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.slug.toLowerCase().includes(query.toLowerCase());
        const matchStatus = statusFilter === 'todos' || project.status === statusFilter;
        return matchQuery && matchStatus;
      }),
    [db.projects, query, statusFilter],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Projetos"
        subtitle="CRUD completo de projetos, status de publicacao e vinculo com equipe"
        actions={
          <button
            onClick={() => setEditing({ ...emptyProject })}
            className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo projeto
          </button>
        }
      />

      <Panel className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou slug"
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'todos' | ProjectStatus)}
            className="h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
          >
            <option value="todos">Todos os status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {projects.length === 0 ? (
          <EmptyState title="Nenhum projeto encontrado" description="Crie um novo projeto para iniciar o portifolio." />
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-zinc-500 border-b border-white/10">
                  <th className="py-3 pr-3">Projeto</th>
                  <th className="py-3 pr-3">Categoria</th>
                  <th className="py-3 pr-3">Equipe</th>
                  <th className="py-3 pr-3">Status</th>
                  <th className="py-3 pr-3">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="py-3 pr-3">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-zinc-500 text-xs">/{project.slug}</p>
                    </td>
                    <td className="py-3 pr-3">
                      {db.categories.find((category) => category.id === project.categoryId)?.name || '-'}
                    </td>
                    <td className="py-3 pr-3 text-zinc-400">{project.teamIds.length} membro(s)</td>
                    <td className="py-3 pr-3">
                      <ProjectStatusBadge status={project.status} />
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(project)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-white/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-rose-500/20 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <AnimatePresence>
        {editing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
          >
            <button className="absolute inset-0 bg-black/75" onClick={() => setEditing(null)} />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(980px,94vw)] max-h-[90vh] overflow-auto rounded-sm border border-white/10 bg-[#0A0A0A] p-5"
            >
              <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar projeto' : 'Novo projeto'}</h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const objectives = Array.isArray(editing.objectiveIds)
                    ? editing.objectiveIds
                    : String(editing.objectiveIds || '')
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean);
                  const tags = Array.isArray(editing.tagIds)
                    ? editing.tagIds
                    : String(editing.tagIds || '')
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean);
                  const members = Array.isArray(editing.teamIds)
                    ? editing.teamIds
                    : String(editing.teamIds || '')
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean);
                  const stack = Array.isArray(editing.stack)
                    ? editing.stack
                    : String(editing.stack || '')
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean);
                  const roadmap = Array.isArray(editing.roadmap)
                    ? editing.roadmap
                    : String(editing.roadmap || '')
                        .split('\n')
                        .map((item) => item.trim())
                        .filter(Boolean);
                  const gallery = Array.isArray(editing.gallery)
                    ? editing.gallery
                    : String(editing.gallery || '')
                        .split('\n')
                        .map((item) => item.trim())
                        .filter(Boolean);

                  upsertProject({
                    ...editing,
                    objectiveIds: objectives,
                    tagIds: tags,
                    teamIds: members,
                    stack,
                    roadmap,
                    gallery,
                  });
                  setEditing(null);
                }}
              >
                {[
                  { key: 'name', label: 'Nome', type: 'text' },
                  { key: 'slug', label: 'Slug', type: 'text' },
                  { key: 'subtitle', label: 'Subtitulo', type: 'text' },
                  { key: 'externalLink', label: 'Link externo', type: 'url' },
                ].map((field) => (
                  <label key={field.key} className="space-y-1 block">
                    <span className="text-xs text-zinc-500">{field.label}</span>
                    <input
                      type={field.type}
                      value={String((editing as any)[field.key] ?? '')}
                      onChange={(e) => setEditing((prev) => ({ ...(prev || {}), [field.key]: e.target.value }))}
                      className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
                    />
                  </label>
                ))}

                <label className="space-y-1 block">
                  <span className="text-xs text-zinc-500">Categoria</span>
                  <select
                    value={editing.categoryId || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), categoryId: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  >
                    <option value="">Selecione</option>
                    {db.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs text-zinc-500">Status</span>
                  <select
                    value={editing.status || 'rascunho'}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), status: e.target.value as ProjectStatus }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Descricao curta</span>
                  <textarea
                    rows={2}
                    value={editing.shortDescription || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), shortDescription: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Descricao longa</span>
                  <textarea
                    rows={3}
                    value={editing.longDescription || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), longDescription: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                {[
                  {
                    key: 'objectiveIds',
                    label: 'Objetivos (ids separados por virgula)',
                    value: Array.isArray(editing.objectiveIds) ? editing.objectiveIds.join(', ') : (editing.objectiveIds as any) || '',
                  },
                  {
                    key: 'tagIds',
                    label: 'Tags (ids separados por virgula)',
                    value: Array.isArray(editing.tagIds) ? editing.tagIds.join(', ') : (editing.tagIds as any) || '',
                  },
                  {
                    key: 'teamIds',
                    label: 'Equipe (ids separados por virgula)',
                    value: Array.isArray(editing.teamIds) ? editing.teamIds.join(', ') : (editing.teamIds as any) || '',
                  },
                  {
                    key: 'stack',
                    label: 'Stack (separada por virgula)',
                    value: Array.isArray(editing.stack) ? editing.stack.join(', ') : (editing.stack as any) || '',
                  },
                ].map((field) => (
                  <label key={field.key} className="space-y-1 block">
                    <span className="text-xs text-zinc-500">{field.label}</span>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => setEditing((prev) => ({ ...(prev || {}), [field.key]: e.target.value }))}
                      className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                    />
                  </label>
                ))}

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Galeria (uma URL por linha)</span>
                  <textarea
                    rows={3}
                    value={Array.isArray(editing.gallery) ? editing.gallery.join('\n') : (editing.gallery as any) || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), gallery: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Roadmap (uma linha por item)</span>
                  <textarea
                    rows={3}
                    value={Array.isArray(editing.roadmap) ? editing.roadmap.join('\n') : (editing.roadmap as any) || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), roadmap: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={Boolean(editing.featured)}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), featured: e.target.checked }))}
                    className="h-4 w-4"
                  />
                  <label htmlFor="featured" className="text-sm text-zinc-300">
                    Destacar projeto na home
                  </label>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm">
                    Salvar projeto
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

