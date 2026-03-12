import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Users, Target, Layers, Cpu, BarChart, Clock, ArrowRight, CheckCircle2, Circle, ShieldAlert } from 'lucide-react';
import { projects, team } from '@/lib/data';
import * as motion from 'motion/react-client';

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.id === slug);
  
  if (!project) notFound();

  const projectTeam = team.filter(m => project.teamIds.includes(m.id));

  // Helper to determine status color
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
    <div className="min-h-screen bg-[#050505]">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD600]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/projetos" 
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-sm mb-12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-2 py-1 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> VOLTAR PARA PROJETOS
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border ${getStatusColor(project.status)}`}>
                  Status: {project.status}
                </span>
                <span className="px-3 py-1 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono uppercase tracking-wider border border-[#FFD600]/20">
                  {project.category}
                </span>
                {project.strategicObjectives.map((obj, i) => (
                  <span key={`obj-${i}`} className="px-3 py-1 bg-white/5 text-zinc-300 text-xs font-mono uppercase tracking-wider border border-white/10">
                    {obj}
                  </span>
                ))}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
                {project.objective}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="h-14 px-8 bg-[#FFD600] text-black font-semibold flex items-center gap-2 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-sm"
                  >
                    Acessar Plataforma <ExternalLink className="w-5 h-5" aria-hidden="true" />
                  </a>
                )}
                <a 
                  href="#equipe" 
                  className="h-14 px-8 bg-transparent border border-white/20 text-white font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                >
                  Ver Equipe Envolvida <Users className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Hero Mockup/Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/3] w-full bg-[#111] border border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black/50 group"
            >
              {project.gallery && project.gallery.length > 0 ? (
                <Image 
                  src={project.gallery[0]} 
                  alt={`Preview do ${project.title}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-800" aria-hidden="true">
                  <Layers className="w-32 h-32 opacity-20" />
                </div>
              )}
              <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Visão Geral & 3. Contexto Estratégico */}
      <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Visão Geral (Left Column) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-12"
            >
              <div>
                <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFD600] rounded-full" /> Visão Geral
                </h2>
                <h3 className="text-3xl font-display font-bold mb-6">O que é o projeto?</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {project.overview?.whatIsIt || project.description}
                </p>
              </div>

              {project.overview && (
                <>
                  <div className="p-6 bg-[#111] border border-white/10 border-l-4 border-l-[#FFD600]">
                    <h4 className="text-white font-bold mb-2">O Problema</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{project.overview.problemSolved}</p>
                  </div>
                  <div className="p-6 bg-[#111] border border-white/10 border-l-4 border-l-blue-500">
                    <h4 className="text-white font-bold mb-2">A Intenção da Equipe</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{project.overview.teamIntention}</p>
                  </div>
                </>
              )}
            </motion.div>

            {/* Contexto Estratégico (Right Column) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="h-full p-10 md:p-16 bg-[#111] border border-white/10 relative overflow-hidden">
                <ShieldAlert className="absolute -right-10 -top-10 w-64 h-64 text-white/[0.02] pointer-events-none" />
                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">Contexto Estratégico</h2>
                <p className="text-2xl md:text-3xl font-light leading-snug text-zinc-200">
                  &quot;{project.strategicContext || 'Este projeto foi desenvolvido para suprir uma necessidade crítica de comunicação e organização dentro do ecossistema da campanha, alinhando tecnologia à estratégia política.'}&quot;
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Objetivos */}
      {project.objectivesList && (
        <section className="py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold mb-12 text-center"
            >
              Objetivos Centrais
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.objectivesList.map((obj, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="px-6 py-4 bg-[#111] border border-white/10 flex items-center gap-3 hover:border-[#FFD600]/50 transition-colors"
                >
                  <Target className="w-5 h-5 text-[#FFD600]" aria-hidden="true" />
                  <span className="font-mono text-sm text-zinc-200 uppercase tracking-wider">{obj}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Funcionalidades Principais */}
      <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-4">Features</h2>
            <h3 className="text-4xl font-display font-bold mb-6">Arquitetura da Experiência</h3>
            <p className="text-zinc-400">Como o projeto entrega valor através de suas funcionalidades principais.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.detailedFeatures ? project.detailedFeatures.map((feat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111] border border-white/10 p-8 flex flex-col h-full hover:bg-white/[0.02] transition-colors"
              >
                <h4 className="text-xl font-bold text-white mb-4">{feat.name}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">{feat.description}</p>
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <span className="block text-[10px] font-mono text-[#FFD600] uppercase tracking-wider mb-2">Valor Estratégico</span>
                  <p className="text-zinc-300 text-sm">{feat.strategicValue}</p>
                </div>
              </motion.div>
            )) : project.features.map((feat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-[#111] border border-white/10 p-6 flex items-center gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-[#FFD600] shrink-0" aria-hidden="true" />
                <span className="text-zinc-200">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Arquitetura Técnica & 7. Papel Político */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Arquitetura */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4" aria-hidden="true" /> Como Funciona (Tech)
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {project.architecture || 'Arquitetura moderna baseada em componentes, focada em performance, escalabilidade e segurança dos dados.'}
                </p>
              </div>
            </motion.div>

            {/* Papel Político */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FFD600] text-black p-10 md:p-12 rounded-sm"
            >
              <h2 className="text-sm font-mono text-black/60 uppercase tracking-widest mb-6 font-bold">
                Papel Político e Comunicacional
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-snug">
                {project.politicalRole || 'Fortalece a narrativa pública da campanha, gerando autoridade técnica e demonstrando capacidade de execução e inovação.'}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 10. Stack / Tecnologias */}
      {project.stack && (
        <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold mb-12 text-center"
            >
              Stack Tecnológico
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(project.stack).map(([category, techs], index) => {
                if (!techs || techs.length === 0) return null;
                return (
                  <motion.div 
                    key={category} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-[#111] border border-white/10 p-6"
                  >
                    <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">{category}</h3>
                    <ul className="space-y-2">
                      {techs.map((tech, i) => (
                        <li key={i} className="text-zinc-200 font-medium">{tech}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Equipe & 9. Contribuições Individuais */}
      <section id="equipe" className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-4">Créditos</h2>
            <h3 className="text-4xl font-display font-bold">Equipe Envolvida</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectTeam.map((member, index) => {
              const contribution = project.contributions?.find(c => c.memberId === member.id);
              
              return (
                <motion.div 
                  key={member.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#111] border border-white/10 p-8 flex flex-col md:flex-row gap-8"
                >
                  <div className="shrink-0">
                    <div className="w-20 h-20 bg-zinc-800 flex items-center justify-center text-3xl font-display font-bold text-zinc-500 mb-4" aria-hidden="true">
                      {member.name.charAt(0)}
                    </div>
                    <Link 
                      href={`/equipe/${member.id}`} 
                      className="text-xs font-mono text-[#FFD600] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-1 py-0.5 -ml-1"
                      aria-label={`Ver perfil de ${member.name}`}
                    >
                      VER PERFIL -&gt;
                    </Link>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-zinc-400 font-mono text-sm mb-6">{contribution?.role || member.role}</p>
                    
                    {contribution && (
                      <>
                        <div className="mb-4">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Contribuições Registradas</span>
                          <ul className="space-y-2">
                            {contribution.tasks.map((task, i) => (
                              <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                <span className="text-[#FFD600] mt-1" aria-hidden="true">▹</span> {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                          <Clock className="w-3 h-3" aria-hidden="true" /> {contribution.hours}h dedicadas
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Galeria Visual */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold mb-12"
            >
              Galeria do Projeto
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative aspect-video bg-[#111] border border-white/10 rounded-sm overflow-hidden ${i === 0 && project.gallery!.length % 2 !== 0 ? 'md:col-span-2' : ''}`}
                >
                  <Image 
                    src={img} 
                    alt={`Galeria ${i + 1}`} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Métricas */}
      {project.metrics && (
        <section className="py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {project.metrics.map((metric, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#050505] p-8 flex flex-col items-center text-center"
                >
                  <BarChart className="w-6 h-6 text-[#FFD600] mb-4 opacity-50" />
                  <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{metric.value}</span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. Linha do Tempo & 14. Próximos Passos */}
      <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Timeline */}
            {project.timeline && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold mb-10">Ciclo de Vida</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {project.timeline.map((item, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${
                        item.status === 'completed' ? 'bg-[#FFD600]' : 
                        item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-800'
                      }`} aria-hidden="true">
                        {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-black" /> : <Circle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-[#111] border border-white/10">
                        <h4 className="font-bold text-white mb-1">{item.phase}</h4>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            {project.nextSteps && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold mb-10">Evolução do Produto</h2>
                <div className="bg-[#111] border border-white/10 p-8">
                  <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Próximos Passos (Roadmap)</h3>
                  <ul className="space-y-4">
                    {project.nextSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4 text-zinc-300">
                        <div className="w-6 h-6 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                          <span className="text-[#FFD600] text-xs font-mono">{i + 1}</span>
                        </div>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* 15. CTA Final */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#332b00_0%,_transparent_50%)] opacity-30" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-6 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Continue Explorando o Laboratório.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/projetos" 
              className="h-14 px-8 bg-white text-black font-semibold flex items-center gap-2 hover:bg-[#FFD600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] rounded-sm"
            >
              Ver Todos os Cases
            </Link>
            <Link 
              href="/equipe" 
              className="h-14 px-8 bg-transparent border border-white/20 text-white font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            >
              Conhecer a Equipe <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
