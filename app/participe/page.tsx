'use client';

import { useState } from 'react';
import { ArrowRight, Terminal, Code2, Database, Shield, Zap, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ParticipePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      {/* Header Section */}
      <section className="relative pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#FFD600]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 text-[#FFD600] text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
            RECRUITMENT // OPEN
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
          >
            Codifique a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFEA00]">mudança.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl font-light leading-relaxed"
          >
            O Missão Tech Lab está selecionando talentos técnicos para integrar nossa equipe coordenada. Junte-se a um time de elite para construir a infraestrutura digital da nova política.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-6">Como funciona</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Somos um núcleo tecnológico estratégico operando com coordenação técnica e liderança. Nossos membros colaboram em projetos de alta complexidade dentro de uma estrutura organizada.
              </p>
              <ul className="space-y-4">
                {[
                  'Coordenação técnica e liderança clara',
                  'Foco em soluções estratégicas proprietárias',
                  'Stack moderna e engenharia de precisão',
                  'Desenvolvimento de portfólio profissional'
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FFD600] shrink-0 mt-0.5" />
                    <span className="text-zinc-400">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-sm font-mono text-[#FFD600] uppercase tracking-widest mb-6">Áreas de Atuação</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Code2, label: 'Front-end', desc: 'React, Next.js, Tailwind' },
                  { icon: Terminal, label: 'Back-end', desc: 'Node, Go, Python' },
                  { icon: Database, label: 'Dados', desc: 'Engenharia, Análise, IA' },
                  { icon: Shield, label: 'Infra/DevOps', desc: 'Cloud, CI/CD, Segurança' }
                ].map((area, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="p-4 bg-[#111] border border-white/10 hover:border-[#FFD600]/30 transition-colors group"
                  >
                    <area.icon className="w-6 h-6 text-[#FFD600] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold mb-1">{area.label}</h3>
                    <p className="text-xs text-zinc-500 font-mono">{area.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD600]/5 blur-[50px] rounded-full pointer-events-none" />
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 bg-[#FFD600]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-[#FFD600]" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Inscrição Recebida!</h3>
                  <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    Nossa equipe vai analisar seu perfil e entrar em contato em breve para os próximos passos. O futuro é glorioso.
                  </p>
                  <button 
                    onClick={() => { setIsSubmitted(false); setStep(1); }}
                    className="text-sm font-mono text-[#FFD600] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1"
                  >
                    ENVIAR OUTRA INSCRIÇÃO -&gt;
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-bold text-white">Formulário de Qualificação</h2>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-[#FFD600]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h3 className="text-[#FFD600] font-mono text-sm uppercase tracking-wider mb-4">01. Dados Pessoais</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="nome" className="text-xs font-mono text-zinc-500 uppercase">Nome Completo</label>
                              <input id="nome" required type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase">E-mail</label>
                              <input id="email" required type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="cidade" className="text-xs font-mono text-zinc-500 uppercase">Cidade / Estado</label>
                              <input id="cidade" required type="text" placeholder="Ex: São Paulo, SP" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="disponibilidade" className="text-xs font-mono text-zinc-500 uppercase">Disponibilidade Semanal</label>
                              <select id="disponibilidade" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors appearance-none rounded-sm">
                                <option value="">Selecione...</option>
                                <option value="2-5h">2 a 5 horas/semana</option>
                                <option value="5-10h">5 a 10 horas/semana</option>
                                <option value="10-20h">10 a 20 horas/semana</option>
                                <option value="20h+">Mais de 20 horas/semana</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h3 className="text-[#FFD600] font-mono text-sm uppercase tracking-wider mb-4">02. Perfil Técnico</h3>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="area" className="text-xs font-mono text-zinc-500 uppercase">Área de Atuação Principal</label>
                            <select id="area" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors appearance-none rounded-sm">
                              <option value="">Selecione uma área...</option>
                              <option value="frontend">Front-end / UI</option>
                              <option value="backend">Back-end / API</option>
                              <option value="fullstack">Fullstack</option>
                              <option value="dados">Engenharia / Ciência de Dados</option>
                              <option value="devops">Infraestrutura / DevOps</option>
                              <option value="design">Product Design / UX</option>
                              <option value="seguranca">Segurança da Informação</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2" role="group" aria-labelledby="experience-label">
                              <label id="experience-label" className="text-xs font-mono text-zinc-500 uppercase">Nível de Experiência</label>
                              <div className="grid grid-cols-3 gap-2">
                                {['Júnior', 'Pleno', 'Sênior'].map((level) => (
                                  <label key={level} className="flex items-center justify-center p-3 border border-white/10 bg-black cursor-pointer hover:border-[#FFD600]/50 transition-colors has-[:checked]:border-[#FFD600] has-[:checked]:bg-[#FFD600]/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#FFD600] rounded-sm">
                                    <input type="radio" name="experience" value={level} className="sr-only" required />
                                    <span className="text-sm text-zinc-300">{level}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="tempo_xp" className="text-xs font-mono text-zinc-500 uppercase">Tempo de Experiência</label>
                              <select id="tempo_xp" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors appearance-none rounded-sm">
                                <option value="">Selecione...</option>
                                <option value="0-1">Menos de 1 ano</option>
                                <option value="1-3">1 a 3 anos</option>
                                <option value="3-5">3 a 5 anos</option>
                                <option value="5+">Mais de 5 anos</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="techs" className="text-xs font-mono text-zinc-500 uppercase">Tecnologias Dominadas (Ex: React, Python, AWS)</label>
                            <input id="techs" required type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h3 className="text-[#FFD600] font-mono text-sm uppercase tracking-wider mb-4">03. Portfólio & Motivação</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="linkedin" className="text-xs font-mono text-zinc-500 uppercase">LinkedIn (URL)</label>
                              <input id="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="github" className="text-xs font-mono text-zinc-500 uppercase">GitHub / Portfólio (URL)</label>
                              <input id="github" type="url" placeholder="https://github.com/..." className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors rounded-sm" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="projetos_anteriores" className="text-xs font-mono text-zinc-500 uppercase">Projetos Anteriores Relevantes</label>
                            <textarea id="projetos_anteriores" rows={2} placeholder="Conte-nos brevemente sobre projetos de tecnologia ou política que você já participou." className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors resize-none rounded-sm"></textarea>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="why" className="text-xs font-mono text-zinc-500 uppercase">Motivação para participar do Laboratório</label>
                            <textarea id="why" required rows={3} placeholder="Por que usar suas habilidades técnicas para transformar a política?" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] focus-visible:ring-1 focus-visible:ring-[#FFD600] transition-colors resize-none rounded-sm"></textarea>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-6 mt-auto">
                      {step > 1 && (
                        <button 
                          type="button" 
                          onClick={prevStep}
                          className="h-14 px-6 bg-transparent border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
                        >
                          <ChevronLeft className="w-5 h-5" /> Voltar
                        </button>
                      )}
                      
                      <button 
                        type="submit" 
                        className="flex-1 h-14 bg-[#FFD600] text-black font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                      >
                        {step === totalSteps ? (
                          <>Enviar Inscrição <Zap className="w-5 h-5" /></>
                        ) : (
                          <>Próxima Etapa <ChevronRight className="w-5 h-5" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
