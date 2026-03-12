'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Linkedin, 
  Github, 
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockLeads = [
  { 
    id: '1', 
    name: 'Carlos Oliveira', 
    email: 'carlos.o@email.com', 
    area: 'Front-end', 
    experience: 'Sênior', 
    status: 'Novo', 
    date: '12/03/2026',
    city: 'São Paulo, SP',
    techs: ['React', 'Next.js', 'Tailwind'],
    motivation: 'Quero contribuir com tecnologia para impacto político.'
  },
  { 
    id: '2', 
    name: 'Ana Souza', 
    email: 'ana.souza@email.com', 
    area: 'Dados', 
    experience: 'Pleno', 
    status: 'Em análise', 
    date: '11/03/2026',
    city: 'Rio de Janeiro, RJ',
    techs: ['Python', 'SQL', 'PowerBI'],
    motivation: 'Interesse em análise de dados eleitorais.'
  },
  { 
    id: '3', 
    name: 'Marcos Silva', 
    email: 'marcos.s@email.com', 
    area: 'Back-end', 
    experience: 'Sênior', 
    status: 'Qualificado', 
    date: '10/03/2026',
    city: 'Belo Horizonte, MG',
    techs: ['Node.js', 'Go', 'PostgreSQL'],
    motivation: 'Experiência em sistemas escaláveis.'
  },
  { 
    id: '4', 
    name: 'Julia Costa', 
    email: 'julia.c@email.com', 
    area: 'Design', 
    experience: 'Júnior', 
    status: 'Novo', 
    date: '10/03/2026',
    city: 'Curitiba, PR',
    techs: ['Figma', 'Adobe XD'],
    motivation: 'Busco experiência em projetos reais.'
  },
  { 
    id: '5', 
    name: 'Ricardo Lima', 
    email: 'r.lima@email.com', 
    area: 'DevOps', 
    experience: 'Sênior', 
    status: 'Aprovado', 
    date: '09/03/2026',
    city: 'Brasília, DF',
    techs: ['Docker', 'K8s', 'AWS'],
    motivation: 'Apoio à infraestrutura do laboratório.'
  },
];

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Todos' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">LEADS</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Gerenciamento de voluntários interessados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono hover:bg-white/10 transition-colors rounded-sm">
          <Download className="w-4 h-4" /> EXPORTAR CSV
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-black border border-white/10 rounded-sm">
            <Filter className="w-4 h-4 text-zinc-500" />
            <select 
              className="bg-transparent text-xs font-mono focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>Todos</option>
              <option>Novo</option>
              <option>Em análise</option>
              <option>Qualificado</option>
              <option>Aprovado</option>
              <option>Reprovado</option>
            </select>
          </div>
        </div>
        
        <div className="text-xs font-mono text-zinc-500">
          Mostrando {filteredLeads.length} de {mockLeads.length} registros
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-normal">Candidato</th>
              <th className="px-6 py-4 font-normal">Área / Nível</th>
              <th className="px-6 py-4 font-normal">Data</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className="group hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center text-sm font-bold group-hover:bg-[#FFD600] group-hover:text-black transition-colors">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-[#FFD600] transition-colors">{lead.name}</p>
                      <p className="text-xs text-zinc-500">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-zinc-300">{lead.area}</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">{lead.experience}</p>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                  {lead.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-mono px-2 py-1 rounded-sm border ${
                    lead.status === 'Novo' ? 'border-blue-500/30 text-blue-400 bg-blue-400/5' :
                    lead.status === 'Em análise' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-400/5' :
                    lead.status === 'Qualificado' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-400/5' :
                    lead.status === 'Aprovado' ? 'border-purple-500/30 text-purple-400 bg-purple-400/5' :
                    'border-zinc-500/30 text-zinc-400 bg-zinc-400/5'
                  }`}>
                    {lead.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-[#FFD600]">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-mono">PÁGINA 1 DE 1</p>
          <div className="flex gap-2">
            <button className="p-2 border border-white/10 rounded-sm text-zinc-500 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-white/10 rounded-sm text-zinc-500 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-start">
                <div className="flex gap-6">
                  <div className="w-20 h-20 bg-[#FFD600] text-black flex items-center justify-center text-3xl font-bold rounded-sm">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold">{selectedLead.name}</h2>
                    <p className="text-zinc-400">{selectedLead.email}</p>
                    <div className="flex gap-3 mt-4">
                      <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                      <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-white/5 rounded-sm transition-colors"
                >
                  <XCircle className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-grow space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Informações Básicas</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Área de Atuação</p>
                        <p className="text-sm font-bold">{selectedLead.area}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Nível de Experiência</p>
                        <p className="text-sm font-bold">{selectedLead.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Localização</p>
                        <p className="text-sm font-bold">{selectedLead.city}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Status do Processo</h4>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-4 h-4 text-[#FFD600]" />
                        <span className="text-sm font-bold">{selectedLead.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono hover:bg-emerald-500/20 transition-all rounded-sm">QUALIFICAR</button>
                        <button className="py-2 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono hover:bg-red-500/20 transition-all rounded-sm">REPROVAR</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Stack Tecnológico</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.techs.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Motivação</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed italic">
                    &quot;{selectedLead.motivation}&quot;
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-[#050505] flex justify-between items-center">
                <p className="text-[10px] font-mono text-zinc-500">RECEBIDO EM {selectedLead.date}</p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 border border-white/10 text-xs font-mono hover:bg-white/5 transition-all rounded-sm">ARQUIVAR</button>
                  <button className="px-6 py-2 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm">INICIAR CONTATO</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
