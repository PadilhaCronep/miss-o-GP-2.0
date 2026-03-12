'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjetosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique values for filters
  const categories = useMemo(() => Array.from(new Set(projects.map(p => p.category))), []);
  const objectives = useMemo(() => Array.from(new Set(projects.flatMap(p => p.strategicObjectives))), []);
  const tags = useMemo(() => Array.from(new Set(projects.flatMap(p => p.functionalTags))), []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      const matchObjective = !selectedObjective || p.strategicObjectives.includes(selectedObjective);
      const matchTag = !selectedTag || p.functionalTags.includes(selectedTag);
      return matchCategory && matchObjective && matchTag;
    });
  }, [selectedCategory, selectedObjective, selectedTag]);

  // Helper for status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Lançado':
      case 'Concluído': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Em Desenvolvimento': return 'text-[#FFD600] border-[#FFD600]/30 bg-[#FFD600]/10';
      case 'Protótipo':
      case 'MVP': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Projetos do Laboratório de Tecnologia Política</h1>
          <p className="text-xl text-zinc-400 max-w-2xl font-light">
            Ferramentas, plataformas e soluções criadas pela equipe da campanha para transformar a comunicação e a mobilização política.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 space-y-8"
        >
          {/* Categoria Principal */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4" id="category-filter-label">Filtrar por Categoria</h3>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="category-filter-label">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm ${!selectedCategory ? 'bg-white text-black border-white' : 'bg-[#111] text-zinc-400 border-white/10 hover:border-white/30'}`}
                aria-pressed={!selectedCategory}
              >
                Todos os projetos
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm ${cat === selectedCategory ? 'bg-white text-black border-white' : 'bg-[#111] text-zinc-400 border-white/10 hover:border-white/30'}`}
                  aria-pressed={cat === selectedCategory}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Objetivo Estratégico */}
            <div>
              <label htmlFor="objective-filter" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">Objetivo Estratégico</label>
              <select 
                id="objective-filter"
                value={selectedObjective || ''} 
                onChange={(e) => setSelectedObjective(e.target.value || null)}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] transition-colors appearance-none rounded-sm"
              >
                <option value="">Todos os objetivos</option>
                {objectives.map(obj => (
                  <option key={obj} value={obj}>{obj}</option>
                ))}
              </select>
            </div>

            {/* Tags Funcionais */}
            <div>
              <label htmlFor="tag-filter" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">Tags Funcionais</label>
              <select 
                id="tag-filter"
                value={selectedTag || ''} 
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] transition-colors appearance-none rounded-sm"
              >
                <option value="">Todas as tags</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Grid de Projetos */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111] border border-white/10 p-8 hover:border-[#FFD600]/50 transition-colors h-full flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Categoria & Status */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-[#FFD600] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Título & Descrição */}
                <h2 className="text-3xl font-display font-bold mb-4 group-hover:text-[#FFD600] transition-colors">
                  {project.title}
                </h2>
                <p className="text-zinc-400 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                {/* Objetivo Estratégico */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Objetivo</span>
                  <div className="flex flex-wrap gap-2">
                    {project.strategicObjectives.map((obj, i) => (
                      <span key={i} className="text-sm text-zinc-300">
                        {obj}{i < project.strategicObjectives.length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags Funcionais */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {project.functionalTags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 text-zinc-400 text-[10px] font-mono uppercase border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Botões */}
                <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <Link 
                    href={`/projetos/${project.id}`} 
                    className="h-10 px-6 bg-white text-black text-sm font-semibold flex items-center gap-2 hover:bg-[#FFD600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] rounded-sm"
                  >
                    Ver Detalhes <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="h-10 px-6 bg-transparent border border-white/20 text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                    >
                      Acessar Projeto <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center border border-white/10 bg-[#111]"
            >
              <p className="text-zinc-500 font-mono">Nenhum projeto encontrado com os filtros selecionados.</p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedObjective(null);
                  setSelectedTag(null);
                }}
                className="mt-4 text-[#FFD600] hover:underline font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
