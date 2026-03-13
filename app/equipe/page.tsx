'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Database,
  Github,
  Instagram,
  Layout,
  Linkedin,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react';
import { team } from '@/lib/data';
import { InteractiveCard } from '@/components/ui/interactive-card';

export default function EquipePage() {
  const getAreaIcon = (area: string) => {
    const text = area.toLowerCase();
    if (text.includes('front') || text.includes('ui') || text.includes('produto')) {
      return <Layout className="w-5 h-5 text-[#FFD600]" />;
    }
    if (text.includes('back') || text.includes('dados')) {
      return <Database className="w-5 h-5 text-[#FFD600]" />;
    }
    if (text.includes('infra') || text.includes('devops') || text.includes('cyber')) {
      return <Shield className="w-5 h-5 text-[#FFD600]" />;
    }
    if (text.includes('fullstack')) {
      return <Code2 className="w-5 h-5 text-[#FFD600]" />;
    }
    return <Terminal className="w-5 h-5 text-[#FFD600]" />;
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050505]">
      <section className="relative pb-16 md:pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        <div className="absolute top-0 right-1/4 w-[640px] h-[360px] bg-[#FFD600]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#FFD600]/30 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono uppercase tracking-wider mb-6"
          >
            Team Intelligence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-5"
          >
            Pessoas que constroem
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">
              tecnologia politica real.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-zinc-400 max-w-3xl text-lg"
          >
            Equipe multidisciplinar com foco em produto, dados, engenharia e operacao institucional.
          </motion.p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
              >
                <InteractiveCard className="h-full">
                  <article className="h-full rounded-sm border border-white/10 bg-[#111] p-5 md:p-6 hover:border-[#FFD600]/50 transition-colors flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="h-14 w-14 rounded-sm border border-white/10 bg-zinc-900 text-zinc-400 grid place-items-center text-2xl font-display font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="h-9 w-9 rounded-sm border border-white/10 bg-white/5 grid place-items-center">
                        {getAreaIcon(member.area)}
                      </div>
                    </div>

                    <h2 className="text-xl font-display font-bold">{member.name}</h2>
                    <p className="text-xs uppercase tracking-wider text-[#FFD600] font-mono mt-1">{member.role}</p>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed line-clamp-3">{member.bio}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.badges.slice(0, 3).map((badge) => (
                        <span key={badge} className="px-2 py-1 rounded-sm border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-zinc-300 font-mono">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-zinc-500">
                      {member.links?.github ? (
                        <a href={member.links.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      ) : null}
                      {member.links?.linkedin ? (
                        <a href={member.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      ) : null}
                      {member.links?.instagram ? (
                        <a href={member.links.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                          <Instagram className="w-4 h-4" />
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">{member.hours}h dedicadas</span>
                      <Link
                        href={`/equipe/${member.id}`}
                        className="inline-flex items-center gap-1 text-xs text-[#FFD600] hover:text-white transition-colors"
                      >
                        Ver perfil <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10 bg-[#0A0A0A]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <Zap className="w-10 h-10 text-[#FFD600] mx-auto mb-6" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Quer construir com a gente?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Estamos recrutando pessoas de engenharia, dados, design e operacao para projetos de impacto publico.
          </p>
          <Link
            href="/participe"
            className="inline-flex h-12 px-6 bg-[#FFD600] text-black font-semibold rounded-sm items-center gap-2 hover:bg-white transition-colors"
          >
            Ver vagas abertas <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
