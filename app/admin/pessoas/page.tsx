'use client';

import { useMemo, useState } from 'react';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, MemberStatusBadge, Panel, SectionHeader } from '@/components/admin/ui';
import type { Member, MemberStatus } from '@/lib/admin/types';

const memberStatus: MemberStatus[] = ['ativo', 'arquivado'];

const emptyMember: Partial<Member> = {
  name: '',
  photoUrl: '',
  role: '',
  shortBio: '',
  longBio: '',
  stack: [],
  hoursDedicated: 0,
  projectIds: [],
  badges: [],
  github: '',
  linkedin: '',
  instagram: '',
  email: '',
  status: 'ativo',
  featured: false,
};

export default function AdminMembrosPage() {
  const { db, upsertMember, deleteMember } = useAdmin();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | MemberStatus>('todos');
  const [editing, setEditing] = useState<any | null>(null);

  const members = useMemo(
    () =>
      db.members.filter((member) => {
        const matchQuery =
          member.name.toLowerCase().includes(query.toLowerCase()) ||
          member.role.toLowerCase().includes(query.toLowerCase()) ||
          member.email.toLowerCase().includes(query.toLowerCase());
        const matchStatus = statusFilter === 'todos' || member.status === statusFilter;
        return matchQuery && matchStatus;
      }),
    [db.members, query, statusFilter],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Membros"
        subtitle="Cadastre equipe, atualize perfis e gerencie destaque no site"
        actions={
          <button
            onClick={() => setEditing({ ...emptyMember })}
            className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Novo membro
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
              placeholder="Buscar por nome, cargo ou email"
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'todos' | MemberStatus)}
            className="h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
          >
            <option value="todos">Todos os status</option>
            {memberStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {members.length === 0 ? (
          <EmptyState title="Nenhum membro encontrado" description="Cadastre um novo membro para montar a equipe." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="rounded-sm border border-white/10 bg-black/20 p-4 hover:border-[#FFD600]/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-zinc-500">{member.role}</p>
                  </div>
                  <MemberStatusBadge status={member.status} />
                </div>

                <p className="text-sm text-zinc-300 mt-3 line-clamp-2">{member.shortBio}</p>
                <p className="text-xs text-zinc-500 mt-2">{member.stack.join(', ')}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <span>{member.hoursDedicated}h dedicadas</span>
                  <span>{member.projectIds.length} projeto(s)</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setEditing(member)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-white/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-rose-500/20 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(920px,94vw)] max-h-[90vh] overflow-auto rounded-sm border border-white/10 bg-[#0A0A0A] p-5"
            >
              <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar membro' : 'Novo membro'}</h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  upsertMember({
                    ...editing,
                    stack: Array.isArray(editing.stack)
                      ? editing.stack
                      : String(editing.stack || '')
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean),
                    projectIds: Array.isArray(editing.projectIds)
                      ? editing.projectIds
                      : String(editing.projectIds || '')
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean),
                    badges: Array.isArray(editing.badges)
                      ? editing.badges
                      : String(editing.badges || '')
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean),
                    hoursDedicated: Number(editing.hoursDedicated || 0),
                  });
                  setEditing(null);
                }}
              >
                {[
                  { key: 'name', label: 'Nome', type: 'text' },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'role', label: 'Cargo/Função', type: 'text' },
                  { key: 'photoUrl', label: 'Foto (URL)', type: 'url' },
                  { key: 'github', label: 'GitHub', type: 'url' },
                  { key: 'linkedin', label: 'LinkedIn', type: 'url' },
                  { key: 'instagram', label: 'Instagram', type: 'url' },
                ].map((field) => (
                  <label key={field.key} className="space-y-1 block">
                    <span className="text-xs text-zinc-500">{field.label}</span>
                    <input
                      type={field.type}
                      value={String((editing as any)[field.key] ?? '')}
                      onChange={(e) => setEditing((prev) => ({ ...(prev || {}), [field.key]: e.target.value }))}
                      className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                    />
                  </label>
                ))}

                <label className="space-y-1 block">
                  <span className="text-xs text-zinc-500">Status</span>
                  <select
                    value={editing.status || 'ativo'}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), status: e.target.value as MemberStatus }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  >
                    {memberStatus.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs text-zinc-500">Horas dedicadas</span>
                  <input
                    type="number"
                    min={0}
                    value={Number(editing.hoursDedicated || 0)}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), hoursDedicated: Number(e.target.value) }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                {[
                  {
                    key: 'stack',
                    label: 'Stack (separada por virgula)',
                    value: Array.isArray(editing.stack) ? editing.stack.join(', ') : (editing.stack as any) || '',
                  },
                  {
                    key: 'projectIds',
                    label: 'Projetos (ids separados por virgula)',
                    value: Array.isArray(editing.projectIds)
                      ? editing.projectIds.join(', ')
                      : (editing.projectIds as any) || '',
                  },
                  {
                    key: 'badges',
                    label: 'Badges (separados por virgula)',
                    value: Array.isArray(editing.badges) ? editing.badges.join(', ') : (editing.badges as any) || '',
                  },
                ].map((field) => (
                  <label key={field.key} className="space-y-1 block md:col-span-2">
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
                  <span className="text-xs text-zinc-500">Bio curta</span>
                  <textarea
                    rows={2}
                    value={editing.shortBio || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), shortBio: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Bio longa</span>
                  <textarea
                    rows={3}
                    value={editing.longBio || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), longBio: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    id="featured-member"
                    type="checkbox"
                    checked={Boolean(editing.featured)}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), featured: e.target.checked }))}
                    className="h-4 w-4"
                  />
                  <label htmlFor="featured-member" className="text-sm text-zinc-300">
                    Destacar membro no site
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
                    Salvar membro
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

