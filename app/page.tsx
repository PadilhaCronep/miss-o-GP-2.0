import Link from 'next/link';
import { ArrowRight, Terminal, Code2, Users, Zap, Cpu, Layers, Target } from 'lucide-react';
import { projects, team, labStats } from '@/lib/data';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import * as motion from 'motion/react-client';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#332b00_0%,_transparent_50%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col items-start max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
              MISSÃƒO TECH LAB // STATUS: OPERACIONAL
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-white"
            >
              O FUTURO Ã‰ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">
                GLORIOSO.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed mb-12"
            >
              NÃºcleo tecnolÃ³gico estratÃ©gico e centro de desenvolvimento digital. Unimos <strong className="text-white font-medium">imaginaÃ§Ã£o, estratÃ©gia, engenharia, organizaÃ§Ã£o e tecnologia</strong> para construir o ecossistema da nova polÃ­tica.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                href="/projetos" 
                className="h-14 px-8 bg-[#FFD600] text-black font-semibold rounded-sm flex items-center gap-2 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Explorar o LaboratÃ³rio <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link 
                href="/participe" 
                className="h-14 px-8 bg-transparent border border-white/20 text-white font-semibold rounded-sm flex items-center gap-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                FaÃ§a parte da Equipe
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative vertical text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block" 
          aria-hidden="true"
        >
          <div className="writing-vertical-rl rotate-180 text-xs font-mono text-zinc-600 tracking-[0.2em]">
            LABORATÃ“RIO ESTRATÃ‰GICO // V.2.0.0
          </div>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="border-y border-white/10 bg-[#0A0A0A]" aria-label="MÃ©tricas do LaboratÃ³rio">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: 'Projetos Desenvolvidos', value: labStats.projectsCompleted, icon: Terminal },
              { label: 'VoluntÃ¡rios Ativos', value: labStats.activeVolunteers, icon: Users },
              { label: 'Linhas de CÃ³digo', value: labStats.linesOfCode, icon: Code2 },
              { label: 'UsuÃ¡rios Impactados', value: labStats.impactedUsers, icon: Zap },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors"
              >
                <stat.icon className="w-6 h-6 text-[#FFD600] mb-4 opacity-80" aria-hidden="true" />
                <span className="text-4xl font-display font-bold text-white mb-2"><AnimatedCounter value={stat.value} /></span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 relative" aria-labelledby="featured-projects-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 id="featured-projects-title" className="text-4xl md:text-5xl font-display font-bold mb-4">Projetos em Destaque</h2>
              <p className="text-zinc-400 font-mono text-sm">O que estamos construindo no laboratÃ³rio.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/projetos" 
                className="hidden md:flex items-center gap-2 text-[#FFD600] hover:text-white transition-colors font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1"
              >
                VER TODOS [ {projects.length} ] <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/projetos/${project.id}`} 
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
                >
                  <div className="bg-[#111] border border-white/10 p-8 h-full flex flex-col hover:border-[#FFD600]/50 transition-colors relative overflow-hidden rounded-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-2 py-1 bg-[#FFD600]/10 text-[#FFD600] text-[10px] font-mono uppercase tracking-wider border border-[#FFD600]/20">
                        {project.category}
                      </span>
                      {project.strategicObjectives.slice(0, 1).map((obj, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 text-zinc-300 text-[10px] font-mono uppercase tracking-wider border border-white/10">
                          {obj}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-[#FFD600] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                      <div className="flex -space-x-2">
                        {project.teamIds.slice(0, 3).map((id, i) => (
                          <div key={id} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#111] flex items-center justify-center text-[10px] font-bold z-10" style={{ zIndex: 10 - i }}>
                            {team.find(t => t.id === id)?.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                        VER CASE COMPLETO -&gt;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/projetos" className="inline-flex items-center gap-2 text-[#FFD600] hover:text-white transition-colors font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1">
              VER TODOS OS PROJETOS <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Terminal / Activity Feed */}
      <section className="py-24 border-y border-white/10 bg-[#050505] overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD600]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> System.Logs
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
                O laboratÃ³rio nunca para.
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Acompanhe o pulso da nossa equipe. Deploys em produÃ§Ã£o, novas features, marcos de usuÃ¡rios e atualizaÃ§Ãµes de infraestrutura acontecendo em tempo real.
              </p>
              <Link 
                href="/projetos" 
                className="inline-flex items-center gap-2 text-[#FFD600] hover:text-white transition-colors font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1 -ml-2"
              >
                VER STATUS DOS PROJETOS <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Terminal Window */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="h-10 bg-[#111] border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-[10px] font-mono text-zinc-500">missao-tech-lab ~ bash</div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs md:text-sm space-y-4 h-[320px] overflow-y-auto custom-scrollbar">
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[10:42:05]</span>
                  <span><span className="text-blue-400">INFO</span>: Deploying ImpixÃ´metro v2.1.0 to production...</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[10:42:12]</span>
                  <span><span className="text-emerald-400">SUCCESS</span>: Build completed in 7.2s. Traffic routed.</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[11:15:30]</span>
                  <span><span className="text-purple-400">EVENT</span>: Artur merged PR #142 (Feature: Senado Dashboard)</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[13:00:00]</span>
                  <span><span className="text-[#FFD600]">METRIC</span>: MissÃ£o Space reached 150,000 monthly active users.</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[14:22:10]</span>
                  <span><span className="text-blue-400">INFO</span>: Running database migrations for Projeto Master...</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0">[14:25:01]</span>
                  <span><span className="text-emerald-400">SUCCESS</span>: Neo4j graph updated with 2,500 new nodes.</span>
                </div>
                <div className="flex gap-3 text-zinc-400">
                  <span className="text-emerald-400 shrink-0 animate-pulse">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lab DNA Section */}
      <section className="py-32 border-y border-white/10 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD600]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-4">Nosso DNA</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                NÃ£o somos uma agÃªncia.<br />
                Somos um <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">LaboratÃ³rio</span>.
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Acreditamos que a polÃ­tica precisa de mais do que discursos; precisa de infraestrutura, dados e ferramentas que conectem o cidadÃ£o ao poder pÃºblico de forma real.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: 'NÃºcleo EstratÃ©gico', desc: 'Desenvolvemos tecnologia proprietÃ¡ria e estratÃ©gica para o ecossistema polÃ­tico.' },
                  { title: 'Engenharia de PrecisÃ£o', desc: 'Sistemas complexos construÃ­dos com rigor tÃ©cnico e organizaÃ§Ã£o avanÃ§ada.' },
                  { title: 'Design de Impacto', desc: 'A experiÃªncia do usuÃ¡rio como ferramenta de autoridade e mobilizaÃ§Ã£o polÃ­tica.' }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600] mt-2.5 shrink-0" />
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-[#111] border border-white/10 p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                
                {/* Abstract Tech Representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-[#FFD600]/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-48 h-48 border border-[#FFD600]/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute w-32 h-32 border border-[#FFD600]/60 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-16 h-16 bg-[#FFD600] rounded-full shadow-[0_0_50px_rgba(255,214,0,0.5)]" />
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="font-mono text-xs text-[#FFD600]">
                    SYS.CORE.ACTIVE
                    <br />
                    <span className="text-zinc-500">RUNNING_EXPERIMENTS: {projects.length}</span>
                  </div>
                  <Cpu className="w-6 h-6 text-zinc-500" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            FaÃ§a parte da <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">
              RevoluÃ§Ã£o
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light"
          >
            Buscamos talentos tÃ©cnicos para integrar nossa equipe coordenada. Colabore em projetos de alta complexidade e desenvolva seu portfÃ³lio no centro da inovaÃ§Ã£o polÃ­tica.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/participe" 
              className="inline-flex h-16 px-10 bg-white text-black font-bold text-lg rounded-sm items-center gap-3 hover:bg-[#FFD600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Quero ser VoluntÃ¡rio <ArrowRight className="w-6 h-6" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

