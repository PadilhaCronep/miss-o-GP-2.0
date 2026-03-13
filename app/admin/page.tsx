'use client';

import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Clock4, FileText, FolderKanban, UserPlus, Users } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAdmin } from '@/components/admin/admin-provider';
import { Panel, SectionHeader, StatCard } from '@/components/admin/ui';

export default function AdminDashboardPage() {
  const { db } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const published = useMemo(
    () => db.projects.filter((project) => project.status === 'publicado').length,
    [db.projects],
  );

  const drafts = useMemo(
    () => db.projects.filter((project) => project.status === 'rascunho').length,
    [db.projects],
  );

  const chartData = useMemo(
    () =>
      db.activities
        .slice(0, 7)
        .reverse()
        .map((activity, index) => ({
          name: `D${index + 1}`,
          atividades: index + 2,
          leads: db.leads.length - (6 - index) >= 0 ? db.leads.length - (6 - index) : 0,
        })),
    [db.activities, db.leads.length],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard Operacional"
        subtitle="Visao geral da operacao da plataforma e atividades recentes do laboratorio"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total de projetos" value={db.projects.length} hint="Portifolio ativo" />
        <StatCard label="Membros da equipe" value={db.members.length} hint="Time cadastrado" />
        <StatCard label="Leads capturados" value={db.leads.length} hint="Pipeline de voluntarios" />
        <StatCard label="Formularios" value={db.formSubmissions.length} hint="Entradas recebidas" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <Panel className="xl:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Atividade recente</h2>
              <p className="text-xs text-zinc-500">Ritmo operacional dos ultimos eventos</p>
            </div>
            <BarChart3 className="w-4 h-4 text-[#FFD600]" />
          </div>

          <div className="h-64">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="lineActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD600" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#FFD600" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis stroke="#52525b" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#09090b',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '4px',
                    }}
                  />
                  <Area type="monotone" dataKey="atividades" stroke="#FFD600" fill="url(#lineActivity)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-sm border border-white/10 bg-black/20 animate-pulse" />
            )}
          </div>
        </Panel>

        <Panel className="xl:col-span-4">
          <h2 className="font-semibold mb-4">Indicadores de status</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border border-white/10 bg-black/20 px-3 py-2 rounded-sm">
              <span className="inline-flex items-center gap-2 text-zinc-300">
                <FolderKanban className="w-4 h-4 text-[#FFD600]" /> Projetos publicados
              </span>
              <span className="font-semibold">{published}</span>
            </div>
            <div className="flex items-center justify-between border border-white/10 bg-black/20 px-3 py-2 rounded-sm">
              <span className="inline-flex items-center gap-2 text-zinc-300">
                <FileText className="w-4 h-4 text-sky-400" /> Projetos em rascunho
              </span>
              <span className="font-semibold">{drafts}</span>
            </div>
            <div className="flex items-center justify-between border border-white/10 bg-black/20 px-3 py-2 rounded-sm">
              <span className="inline-flex items-center gap-2 text-zinc-300">
                <Users className="w-4 h-4 text-emerald-400" /> Membros ativos
              </span>
              <span className="font-semibold">{db.members.filter((member) => member.status === 'ativo').length}</span>
            </div>
            <div className="flex items-center justify-between border border-white/10 bg-black/20 px-3 py-2 rounded-sm">
              <span className="inline-flex items-center gap-2 text-zinc-300">
                <UserPlus className="w-4 h-4 text-amber-300" /> Leads em analise
              </span>
              <span className="font-semibold">
                {db.leads.filter((lead) => lead.status === 'novo' || lead.status === 'em_analise').length}
              </span>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Panel>
          <h2 className="font-semibold mb-4">Ultimas atividades</h2>
          <div className="space-y-2">
            {db.activities.slice(0, 8).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between gap-3 border border-white/10 bg-black/20 rounded-sm p-3"
              >
                <p className="text-sm text-zinc-200">{activity.description}</p>
                <span className="text-[11px] text-zinc-500 shrink-0 inline-flex items-center gap-1">
                  <Clock4 className="w-3.5 h-3.5" />
                  {new Date(activity.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="font-semibold mb-4">Ultimas entradas de formularios</h2>
          <div className="space-y-2">
            {db.formSubmissions.slice(0, 8).map((submission) => (
              <div key={submission.id} className="border border-white/10 bg-black/20 rounded-sm p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm">{submission.subject}</p>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">{submission.formType.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">{submission.name} • {submission.email}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
