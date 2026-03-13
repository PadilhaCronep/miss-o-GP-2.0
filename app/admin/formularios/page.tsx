'use client';

import { useMemo, useState } from 'react';
import { Download, Link2, Search, Trash2 } from 'lucide-react';
import { useAdmin } from '@/components/admin/admin-provider';
import { EmptyState, Panel, SectionHeader } from '@/components/admin/ui';
import type { FormType } from '@/lib/admin/types';

const formTypes: Array<{ value: 'todos' | FormType; label: string }> = [
  { value: 'todos', label: 'Todos os tipos' },
  { value: 'voluntarios_tech', label: 'Voluntarios tech' },
  { value: 'contato_geral', label: 'Contato geral' },
  { value: 'sugestao_projeto', label: 'Sugestao de projeto' },
];

function csvRow(values: string[]) {
  return values.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
}

export default function AdminFormulariosPage() {
  const { db, deleteFormSubmission, linkSubmissionToLead } = useAdmin();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todos' | FormType>('todos');

  const submissions = useMemo(
    () =>
      db.formSubmissions.filter((submission) => {
        const matchQuery =
          submission.name.toLowerCase().includes(query.toLowerCase()) ||
          submission.email.toLowerCase().includes(query.toLowerCase()) ||
          submission.subject.toLowerCase().includes(query.toLowerCase());
        const matchType = typeFilter === 'todos' || submission.formType === typeFilter;
        return matchQuery && matchType;
      }),
    [db.formSubmissions, query, typeFilter],
  );

  const exportCsv = () => {
    const header = ['tipo', 'nome', 'email', 'assunto', 'mensagem', 'lead_vinculado'];
    const rows = submissions.map((item) =>
      csvRow([
        item.formType,
        item.name,
        item.email,
        item.subject,
        item.message,
        item.linkedLeadId || '',
      ]),
    );
    const csv = [csvRow(header), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formularios-missao-lab.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestao de Formularios"
        subtitle="Visualize respostas, filtre por tipo e vincule envios ao pipeline de leads"
        actions={
          <button
            onClick={exportCsv}
            className="h-10 px-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-sm inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Exportar
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
              placeholder="Buscar por nome, email ou assunto"
              className="w-full h-10 rounded-sm border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none focus:border-[#FFD600]/60"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'todos' | FormType)}
            className="h-10 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
          >
            {formTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {submissions.length === 0 ? (
          <EmptyState title="Sem respostas encontradas" description="Ajuste os filtros ou aguarde novos envios." />
        ) : (
          <div className="space-y-2">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-sm border border-white/10 bg-black/20 p-4 hover:border-[#FFD600]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500">{submission.formType.replace('_', ' ')}</p>
                    <h3 className="font-semibold mt-1">{submission.subject}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{submission.name} • {submission.email}</p>
                    <p className="text-sm text-zinc-300 mt-3">{submission.message}</p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-60">
                    <select
                      value={submission.linkedLeadId || ''}
                      onChange={(e) => linkSubmissionToLead(submission.id, e.target.value)}
                      className="h-9 rounded-sm border border-white/10 bg-black/40 px-2 text-xs"
                    >
                      <option value="">Sem lead vinculado</option>
                      {db.leads.map((lead) => (
                        <option key={lead.id} value={lead.id}>
                          {lead.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 inline-flex items-center gap-1">
                        <Link2 className="w-3.5 h-3.5" />
                        {submission.linkedLeadId
                          ? `Lead: ${db.leads.find((lead) => lead.id === submission.linkedLeadId)?.name || 'N/A'}`
                          : 'Nao vinculado'}
                      </span>
                      <button
                        onClick={() => deleteFormSubmission(submission.id)}
                        className="ml-auto h-8 w-8 rounded-sm border border-white/10 inline-flex items-center justify-center hover:bg-rose-500/20 hover:text-rose-300"
                        aria-label="Excluir formulario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
