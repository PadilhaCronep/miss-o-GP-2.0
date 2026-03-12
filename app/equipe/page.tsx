import Link from 'next/link';
import { team } from '@/lib/data';
import { ArrowRight, Code2, Terminal, Zap, Shield, Database, Layout, Github, Linkedin, Instagram } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function EquipePage() {
  // Helper to get an icon based on area
  const getAreaIcon = (area: string) => {
    const a = area.toLowerCase();
    if (a.includes('front') || a.includes('ui') || a.includes('produto')) return <Layout className="w-5 h-5 text-[#FFD600]" />;
    if (a.includes('back') || a.includes('dados')) return <Database className="w-5 h-5 text-[#FFD600]" />;
    if (a.includes('infra') || a.includes('devops') || a.includes('cyber')) return <Shield className="w-5 h-5 text-[#FFD600]" />;
    if (a.includes('fullstack')) return <Code2 className="w-5 h-5 text-[#FFD600]" />;
    return <Terminal className="w-5 h-5 text-[#FFD600]" />;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      {/* Header Section */}
      <section className="relative pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#FFD600]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
            HUMAN_RESOURCES // ACTIVE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
          >
            Os talentos por trás <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">do código.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl font-light leading-relaxed"
          >
            Uma equipe multidisciplinar de desenvolvedores, designers e engenheiros focados em construir a próxima geração de ferramentas para a política brasileira.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  href={`/equipe/${member.id}`} 
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
                >
                  <div className="bg-[#111] border border-white/10 p-8 hover:border-[#FFD600]/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden rounded-sm">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFD600]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Avatar & Icon */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-16 h-16 bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl font-display font-bold text-zinc-500 group-hover:bg-[#FFD600] group-hover:text-black group-hover:border-[#FFD600] transition-colors" aria-hidden="true">
                        {member.name.charAt(0)}
                      </div>
                      <div className="p-2 bg-white/5 border border-white/10 rounded-sm" aria-hidden="true">
                        {getAreaIcon(member.area)}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="relative z-10 flex-grow">
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-[#FFD600] transition-colors">{member.name}</h3>
                      <p className="text-[#FFD600] text-xs font-mono uppercase tracking-wider mb-4">{member.role}</p>
                      
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex gap-4 mb-6">
                        {member.links?.github && (
                          <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.links?.linkedin && (
                          <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.links?.instagram && (
                          <a href={member.links.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Footer: Badges & CTA */}
                    <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {member.badges.slice(0, 2).map((badge, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 text-zinc-300 text-[9px] font-mono uppercase tracking-wider border border-white/10">
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500">
                          {member.hours}H CONTRIBUÍDAS
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFD600] transition-colors -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join CTA */}
      <section className="py-24 border-t border-white/10 bg-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <Zap className="w-12 h-12 text-[#FFD600] mx-auto mb-8" aria-hidden="true" />
          <h2 className="text-4xl font-display font-bold mb-6">Quer fazer parte desse time?</h2>
          <p className="text-zinc-400 mb-10 max-w-2xl mx-auto">
            Buscamos mentes inquietas que queiram aplicar tecnologia para resolver problemas reais da política.
          </p>
          <Link 
            href="/participe" 
            className="inline-flex h-14 px-8 bg-[#FFD600] text-black font-bold rounded-sm items-center gap-2 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Ver Vagas Abertas <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
