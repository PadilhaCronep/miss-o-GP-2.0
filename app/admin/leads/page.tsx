'use client';

import { useMemo, useState } from 'react';
import { Download, Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, LeadStatusBadge, Panel, SectionHeader } from '@/components/admin/ui';
import type { Lead, LeadStatus } from '@/lib/admin/types';

const statusOptions: LeadStatus[] = ['novo', 'em_analise', 'qualificado', 'aprovado', 'rejeitado', 'arquivado'];

const emptyLead: Partial<Lead> = {
  name: '',
  email: '',
  city: '',
  area: '',
  technologies: [],
  experienceLevel: '',
  availability: '',
  motivation: '',
  github: '',
  linkedin: '',
  notes: '',
  status: 'novo',
};

function toCsvRow(columns: string[]) {
  return columns.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
}

export default function AdminLeadsPage() {
  const { db, upsertLead, updateLeadStatus, deleteLead } = useAdmin();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | LeadStatus>('todos');
  const [editing, setEditing] = useState<any | null>(null);

  const leads = useMemo(
    () =>
      db.leads.filter((lead) => {
        const matchQuery =
          lead.name.toLowerCase().includes(query.toLowerCase()) ||
          lead.email.toLowerCase().includes(query.toLowerCase()) ||
          lead.area.toLowerCase().includes(query.toLowerCase());
        const matchStatus = statusFilter === 'todos' || lead.status === statusFilter;
        return matchQuery && matchStatus;
      }),
    [db.leads, query, statusFilter],
  );

  const exportCsv = () => {
    const header = ['nome', 'email', 'cidade', 'area', 'tecnologias', 'nivel', 'status', 'disponibilidade'];
    const rows = db.leads.map((lead) =>
      toCsvRow([
        lead.name,
        lead.email,
        lead.city,
        lead.area,
        lead.technologies.join(' | '),
        lead.experienceLevel,
        lead.status,
        lead.availability,
      ]),
    );
    const csv = [toCsvRow(header), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads-missao-lab.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Leads"
        subtitle="Pipeline de captacao, qualificacao e acompanhamento de voluntarios"
        actions={
          <>
            <button
              onClick={exportCsv}
              className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={() => setEditing({ ...emptyLead })}
              className="h-10 px-4 rounded-sm bg-[#FFD600] text-black hover:bg-white font-semibold text-sm inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo lead
            </button>
          </>
        }
      />

      <Panel className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, email ou area"
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'todos' | LeadStatus)}
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

        {leads.length === 0 ? (
          <EmptyState
            title="Nenhum lead encontrado"
            description="Ajuste os filtros ou cadastre um novo lead para iniciar o pipeline."
          />
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-zinc-500 border-b border-white/10">
                  <th className="py-3 pr-3">Lead</th>
                  <th className="py-3 pr-3">Area</th>
                  <th className="py-3 pr-3">Tecnologias</th>
                  <th className="py-3 pr-3">Nivel</th>
                  <th className="py-3 pr-3">Status</th>
                  <th className="py-3 pr-3">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 pr-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-zinc-500 text-xs">{lead.email} • {lead.city}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-zinc-300">{lead.area}</td>
                    <td className="py-3 pr-3 text-zinc-300">{lead.technologies.join(', ')}</td>
                    <td className="py-3 pr-3 text-zinc-300">{lead.experienceLevel}</td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <LeadStatusBadge status={lead.status} />
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="h-8 rounded-sm border border-white/10 bg-black/40 px-2 text-xs"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(lead)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-white/10"
                          aria-label="Editar lead"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-white/10 hover:bg-rose-500/20 hover:text-rose-300"
                          aria-label="Remover lead"
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
              <h3 className="text-lg font-semibold mb-4">{editing.id ? 'Editar lead' : 'Novo lead'}</h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  upsertLead({
                    ...editing,
                    technologies: typeof editing.technologies === 'string'
                      ? editing.technologies.split(',').map((item) => item.trim()).filter(Boolean)
                      : editing.technologies,
                  });
                  setEditing(null);
                }}
              >
                {[
                  { key: 'name', label: 'Nome', type: 'text' },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'city', label: 'Cidade', type: 'text' },
                  { key: 'area', label: 'Area de atuacao', type: 'text' },
                  { key: 'experienceLevel', label: 'Nivel de experiencia', type: 'text' },
                  { key: 'availability', label: 'Disponibilidade', type: 'text' },
                  { key: 'github', label: 'GitHub', type: 'url' },
                  { key: 'linkedin', label: 'LinkedIn', type: 'url' },
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

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Tecnologias (separadas por virgula)</span>
                  <input
                    type="text"
                    value={Array.isArray(editing.technologies) ? editing.technologies.join(', ') : (editing.technologies as any) || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), technologies: e.target.value }))}
                    className="w-full h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Motivacao</span>
                  <textarea
                    rows={3}
                    value={editing.motivation || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), motivation: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#FFD600]/60"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-xs text-zinc-500">Observacoes internas</span>
                  <textarea
                    rows={2}
                    value={editing.notes || ''}
                    onChange={(e) => setEditing((prev) => ({ ...(prev || {}), notes: e.target.value }))}
                    className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#FFD600]/60"
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
                    Salvar lead
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

