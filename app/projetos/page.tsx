'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { projects } from '@/lib/data';
import { InteractiveCard } from '@/components/ui/interactive-card';

export default function ProjetosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(projects.map((project) => project.category))), []);
  const objectives = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.strategicObjectives))),
    [],
  );
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.functionalTags))), []);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchCategory = !selectedCategory || project.category === selectedCategory;
        const matchObjective = !selectedObjective || project.strategicObjectives.includes(selectedObjective);
        const matchTag = !selectedTag || project.functionalTags.includes(selectedTag);
        return matchCategory && matchObjective && matchTag;
      }),
    [selectedCategory, selectedObjective, selectedTag],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluido':
      case 'Lancado':
        return 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10';
      case 'Em Desenvolvimento':
        return 'text-[#FFD600] border-[#FFD600]/30 bg-[#FFD600]/10';
      case 'MVP':
      case 'Prototipo':
        return 'text-sky-300 border-sky-400/30 bg-sky-500/10';
      default:
        return 'text-zinc-300 border-zinc-400/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-sm border border-white/10 bg-black/30 p-6 md:p-10 relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,214,0,0.14),transparent_40%)]" />
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFD600] font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Catalogo de tecnologia politica
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
              Projetos do Laboratorio
            </h1>
            <p className="text-zinc-400 max-w-3xl text-lg">
              Navegue por cases, stacks e objetivos estrategicos com filtros vivos e feedback visual em tempo real.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-400">
              <Filter className="w-3.5 h-3.5 text-[#FFD600]" />
              {filteredProjects.length} de {projects.length} projetos visiveis
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="rounded-sm border border-white/10 bg-[#0A0A0A] p-4 md:p-6 space-y-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-3">Filtro por categoria</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`relative px-3 py-2 rounded-sm text-sm border transition-colors ${
                  selectedCategory === null
                    ? 'border-[#FFD600] text-black bg-[#FFD600]'
                    : 'border-white/10 text-zinc-300 hover:bg-white/5'
                }`}
              >
                Todos
              </button>
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(active ? null : category)}
                    className={`relative px-3 py-2 rounded-sm text-sm border transition-colors ${
                      active
                        ? 'border-[#FFD600] text-black bg-[#FFD600]'
                        : 'border-white/10 text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Objetivo estrategico</span>
              <select
                value={selectedObjective || ''}
                onChange={(event) => setSelectedObjective(event.target.value || null)}
                className="w-full h-11 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
              >
                <option value="">Todos</option>
                {objectives.map((objective) => (
                  <option key={objective} value={objective}>
                    {objective}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Tag funcional</span>
              <select
                value={selectedTag || ''}
                onChange={(event) => setSelectedTag(event.target.value || null)}
                className="w-full h-11 rounded-sm border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-[#FFD600]/60"
              >
                <option value="">Todas</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </motion.section>

        <motion.section layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.24, delay: index * 0.03 }}
              >
                <InteractiveCard className="h-full">
                  <article className="h-full rounded-sm border border-white/10 bg-[#111] p-6 md:p-8 flex flex-col relative overflow-hidden group transition-colors hover:border-[#FFD600]/50">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FFD600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start justify-between gap-3 mb-5">
                      <span className="text-xs uppercase tracking-wider font-mono text-[#FFD600]">{project.category}</span>
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider border font-mono ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 group-hover:text-[#FFD600] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-2">Objetivos</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.strategicObjectives.map((objective) => (
                            <span key={objective} className="px-2 py-1 rounded-sm border border-white/10 bg-white/5 text-[11px] text-zinc-300">
                              {objective}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.functionalTags.map((tag) => (
                            <span key={tag} className="px-2 py-1 rounded-sm border border-white/10 bg-black/30 text-[10px] uppercase text-zinc-400 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/projetos/${project.id}`}
                        className="h-10 px-4 rounded-sm bg-white text-black text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#FFD600] transition-colors"
                      >
                        Ver detalhes <ArrowRight className="w-4 h-4" />
                      </Link>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 px-4 rounded-sm border border-white/20 text-sm inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
                        >
                          Acessar <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </InteractiveCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {filteredProjects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-sm border border-dashed border-white/20 bg-black/30 p-10 text-center">
            <p className="text-zinc-400">Nenhum projeto com os filtros atuais.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedObjective(null);
                setSelectedTag(null);
              }}
              className="mt-3 text-sm text-[#FFD600] hover:text-white transition-colors"
            >
              Limpar filtros
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
