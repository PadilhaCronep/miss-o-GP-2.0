'use client';

import { useMemo, useState } from 'react';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, Panel, SectionHeader } from '@/components/admin/ui';
import type { Contribution } from '@/lib/admin/types';

const emptyContribution: Partial<Contribution> = {
  memberId: '',
  projectId: '',
  role: '',
  description: '',
  hours: 0,
  period: '',
  date: new Date().toISOString().slice(0, 10),
};

export default function AdminContribuicoesPage() {
  const { db, upsertContribution, deleteContribution } = useAdmin();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Partial<Contribution> | null>(null);

  const contributions = useMemo(
    () =>
      db.contributions.filter((item) => {
        const member = db.members.find((m) => m.id === item.memberId)?.name || '';
        const project = db.projects.find((p) => p.id === item.projectId)?.name || '';
        return (
          member.toLowerCase().includes(query.toLowerCase()) ||
          project.toLowerCase().includes(query.toLowerCase()) ||
          item.role.toLowerCase().includes(query.toLowerCase())
        );
      }),
    [db.contributions, db.members, db.projects, query],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Contribuicoes"
        subtitle="Registre participacao de membros em projetos com horas e periodo"
        actions={
          <button
            onClick={() => setEditing({ ...emptyContribution })}
            className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nova contribuicao
          </button>
        }
      />

      <Panel className="space-y-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por membro, projeto ou funcao"
            className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
          />
        </div>

        {contributions.length === 0 ? (
          <EmptyState title="Nenhuma contribuicao registrada" description="Crie um registro para acompanhar entregas por periodo." />
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-zinc-500 border-b border-white/10">
                  <th className="py-3 pr-3">Membro</th>
                  <th className="py-3 pr-3">Projeto</th>
                  <th className="py-3 pr-3">Funcao</th>
                  <th className="py-3 pr-3">Periodo</th>
                  <th className="py-3 pr-3">Horas</th>
                  <th className="py-3 pr-3">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="py-3 pr-3">{db.members.find((member) => member.id === item.memberId)?.name || '-'}</td>
                    <td className="py-3 pr-3">{db.projects.find((project) => project.id === item.projectId)?.name || '-'}</td>
                    <td className="py-3 pr-3">{item.role}</td>
                    <td className="py-3 pr-3">{item.period}</td>
                    <td className="py-3 pr-3">{item.hours}h</td>
                    <td className="py-3 pr-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(item)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-white/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteContribution(item.id)}
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(760px,92vw)] rounded-sm border border-white/10 bg-[#0A0A0A] p-5"
            >
              <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar contribuicao' : 'Nova contribuicao'}</h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  upsertContribution({ ...editing, hours: Number(editing.hours || 0) });
                  setEditing(null);
                }}
              >
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Membro</span>
                  <select
                    value={editing.memberId || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), memberId: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  >
                    <option value="">Selecione</option>
                    {db.members.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Projeto</span>
                  <select
                    value={editing.projectId || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), projectId: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  >
                    <option value="">Selecione</option>
                    {db.projects.map((project) => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Funcao</span>
                  <input
                    type="text"
                    value={editing.role || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), role: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Periodo</span>
                  <input
                    type="text"
                    value={editing.period || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), period: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Horas</span>
                  <input
                    type="number"
                    min={0}
                    value={Number(editing.hours || 0)}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), hours: Number(e.target.value) }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Data</span>
                  <input
                    type="date"
                    value={String(editing.date || '').slice(0, 10)}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), date: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm"
                  />
                </label>

                <label className="space-y-1 md:col-span-2">
                  <span className="text-xs text-zinc-500">Descricao</span>
                  <textarea
                    rows={3}
                    value={editing.description || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), description: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </label>

                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm">
                    Salvar contribuicao
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
