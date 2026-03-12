import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Code2, Layout, Database, Shield, Terminal, Zap, Github, Linkedin, Instagram } from 'lucide-react';
import { team, projects } from '@/lib/data';
import * as motion from 'motion/react-client';

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = team.find(m => m.id === id);
  
  if (!member) notFound();

  const memberProjects = projects.filter(p => member.projectIds.includes(p.id));

  // Helper to get an icon based on area
  const getAreaIcon = (area: string) => {
    const a = area.toLowerCase();
    if (a.includes('front') || a.includes('ui') || a.includes('produto')) return <Layout className="w-6 h-6 text-[#FFD600]" />;
    if (a.includes('back') || a.includes('dados')) return <Database className="w-6 h-6 text-[#FFD600]" />;
    if (a.includes('infra') || a.includes('devops') || a.includes('cyber')) return <Shield className="w-6 h-6 text-[#FFD600]" />;
    if (a.includes('fullstack')) return <Code2 className="w-6 h-6 text-[#FFD600]" />;
    return <Terminal className="w-6 h-6 text-[#FFD600]" />;
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
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
              href="/equipe" 
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-sm mb-12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-2 py-1 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> VOLTAR PARA EQUIPE
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-32 h-32 md:w-48 md:h-48 bg-zinc-900 border border-white/10 flex items-center justify-center text-5xl md:text-7xl font-display font-bold text-zinc-500 shrink-0 relative overflow-hidden group" aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFD600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {member.name.charAt(0)}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-grow"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono uppercase tracking-wider border border-[#FFD600]/20 flex items-center gap-2">
                  <span aria-hidden="true">{getAreaIcon(member.area)}</span>
                  {member.area}
                </span>
                <span className="px-3 py-1 bg-white/5 text-zinc-300 text-xs font-mono uppercase tracking-wider border border-white/10">
                  {member.experience}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">{member.name}</h1>
              <h2 className="text-2xl text-zinc-400 font-light mb-8">{member.role}</h2>
              
              <div className="flex flex-wrap gap-4">
                {member.links?.github && (
                  <a 
                    href={member.links.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-2 py-1 -ml-2"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" /> GITHUB
                  </a>
                )}
                {member.links?.linkedin && (
                  <a 
                    href={member.links.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-2 py-1"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" /> LINKEDIN
                  </a>
                )}
                {member.links?.instagram && (
                  <a 
                    href={member.links.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-2 py-1"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" /> INSTAGRAM
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio & Stats */}
      <section className="py-24 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-12"
            >
              <div>
                <h3 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-6">Sobre</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {member.bio}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-6">Stack Tecnológico</h3>
                <div className="flex flex-wrap gap-2">
                  {member.technologies.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="px-4 py-2 bg-[#111] border border-white/10 text-zinc-300 text-sm font-mono"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#111] border border-white/10 p-8">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">Impacto no Laboratório</h3>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFD600]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#FFD600]" />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-bold text-white">{member.hours}h</div>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Horas Contribuídas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-bold text-white">{member.projectIds.length}</div>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Projetos Participados</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">Reconhecimentos</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.badges.map((badge, i) => (
                      <span key={i} className="px-3 py-1 bg-[#FFD600]/5 text-[#FFD600] text-[10px] font-mono uppercase tracking-wider border border-[#FFD600]/20 flex items-center gap-1.5">
                        <Zap className="w-3 h-3" /> {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-12"
          >
            Projetos que ajudou a construir
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberProjects.map((project, index) => {
              const contribution = project.contributions?.find(c => c.memberId === member.id);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/projetos/${project.id}`} 
                    className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
                  >
                    <div className="bg-[#111] border border-white/10 p-8 h-full flex flex-col hover:border-[#FFD600]/50 transition-colors relative overflow-hidden rounded-sm">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-2 py-1 bg-white/5 text-zinc-300 text-[10px] font-mono uppercase tracking-wider border border-white/10">
                          {project.category}
                        </span>
                        {contribution && (
                          <span className="text-xs font-mono text-[#FFD600]">{contribution.hours}h dedicadas</span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-[#FFD600] transition-colors">
                        {project.title}
                      </h3>
                      
                      {contribution ? (
                        <div className="mt-4">
                          <p className="text-sm text-zinc-400 mb-2"><span className="text-white font-medium">Papel:</span> {contribution.role}</p>
                          <ul className="space-y-1">
                            {contribution.tasks.slice(0, 2).map((task, i) => (
                              <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#FFD600] mt-1.5 shrink-0" aria-hidden="true" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-zinc-400 text-sm mt-4 line-clamp-2">{project.description}</p>
                      )}
                      
                      <div className="mt-auto pt-6 border-t border-white/10 flex justify-end">
                        <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors" aria-hidden="true">
                          VER PROJETO -&gt;
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
