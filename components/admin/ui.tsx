'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { LeadStatus, MemberStatus, ProjectStatus } from '@/lib/admin/types';

export function SectionHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="text-zinc-500 mt-1 text-sm">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'rounded-sm border border-white/10 bg-[#0A0A0A] p-5 relative overflow-hidden',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,214,0,0.07),transparent_38%)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-dashed border-white/15 bg-black/30 p-10 text-center">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500">{description}</p>
    </div>
  );
}

export function LoadingState({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-14 text-zinc-400">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </div>
  );
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const map: Record<LeadStatus, string> = {
    novo: 'border-sky-400/30 text-sky-300 bg-sky-500/10',
    em_analise: 'border-amber-400/30 text-amber-300 bg-amber-500/10',
    qualificado: 'border-emerald-400/30 text-emerald-300 bg-emerald-500/10',
    aprovado: 'border-green-400/30 text-green-300 bg-green-500/10',
    rejeitado: 'border-rose-400/30 text-rose-300 bg-rose-500/10',
    arquivado: 'border-zinc-400/30 text-zinc-300 bg-zinc-500/10',
  };
  return (
    <span className={cn('rounded-sm border px-2 py-1 text-[10px] uppercase tracking-wider font-mono', map[status])}>
      {status.replace('_', ' ')}
    </span>
  );
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, string> = {
    rascunho: 'border-zinc-400/30 text-zinc-300 bg-zinc-500/10',
    em_desenvolvimento: 'border-amber-400/30 text-amber-300 bg-amber-500/10',
    publicado: 'border-emerald-400/30 text-emerald-300 bg-emerald-500/10',
    arquivado: 'border-rose-400/30 text-rose-300 bg-rose-500/10',
  };
  return (
    <span className={cn('rounded-sm border px-2 py-1 text-[10px] uppercase tracking-wider font-mono', map[status])}>
      {status.replace('_', ' ')}
    </span>
  );
}

export function MemberStatusBadge({ status }: { status: MemberStatus }) {
  const map: Record<MemberStatus, string> = {
    ativo: 'border-emerald-400/30 text-emerald-300 bg-emerald-500/10',
    arquivado: 'border-zinc-400/30 text-zinc-300 bg-zinc-500/10',
  };
  return (
    <span className={cn('rounded-sm border px-2 py-1 text-[10px] uppercase tracking-wider font-mono', map[status])}>
      {status}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="rounded-sm border border-white/10 bg-black/30 p-4 hover:border-[#FFD600]/40"
    >
      <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">{label}</div>
      <div className="mt-2 text-3xl font-display font-bold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-zinc-500">{hint}</div> : null}
    </motion.div>
  );
}
