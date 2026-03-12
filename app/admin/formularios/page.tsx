'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Download,
  Mail,
  Calendar,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for form submissions
const mockSubmissions = [
  { 
    id: '1', 
    formName: 'Contato Geral', 
    userName: 'Carlos Eduardo', 
    email: 'carlos.edu@email.com', 
    subject: 'Parceria Institucional',
    message: 'Gostaria de saber mais sobre como o laboratório pode colaborar com nossa iniciativa de transparência local.',
    date: '2026-03-12 14:30', 
    status: 'Pendente',
    priority: 'Alta'
  },
  { 
    id: '2', 
    formName: 'Voluntariado', 
    userName: 'Beatriz Lima', 
    email: 'beatriz.l@email.com', 
    subject: 'Inscrição para Desenvolvedora Frontend',
    message: 'Tenho 3 anos de experiência com React e Tailwind. Gostaria de contribuir nos projetos eleitorais.',
    date: '2026-03-11 09:15', 
    status: 'Em análise',
    priority: 'Média'
  },
  { 
    id: '3', 
    formName: 'Sugestão de Projeto', 
    userName: 'Fernando Rocha', 
    email: 'f.rocha@email.com', 
    subject: 'Monitoramento de Gastos Públicos',
    message: 'Minha ideia é criar um bot que alerta sobre gastos suspeitos em câmaras municipais.',
    date: '2026-03-10 18:45', 
    status: 'Arquivado',
    priority: 'Baixa'
  },
  { 
    id: '4', 
    formName: 'Contato Geral', 
    userName: 'Mariana Souza', 
    email: 'mari.souza@email.com', 
    subject: 'Dúvida sobre API',
    message: 'As APIs desenvolvidas pelo Missão Tech Lab são abertas para consumo externo?',
    date: '2026-03-09 11:20', 
    status: 'Respondido',
    priority: 'Média'
  },
];

export default function AdminFormulariosPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);

  const filteredSubmissions = submissions.filter(s => 
    s.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">FORMULÁRIOS</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Respostas e interações capturadas</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:bg-white/5 transition-all text-xs font-mono rounded-sm">
          <Download className="w-4 h-4" /> EXPORTAR CSV
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar por nome, email ou assunto..." 
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todos os Formulários</option>
            <option>Contato Geral</option>
            <option>Voluntariado</option>
            <option>Sugestão de Projeto</option>
          </select>
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todos Status</option>
            <option>Pendente</option>
            <option>Em análise</option>
            <option>Respondido</option>
            <option>Arquivado</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-normal">Usuário</th>
              <th className="px-6 py-4 font-normal">Formulário</th>
              <th className="px-6 py-4 font-normal">Assunto</th>
              <th className="px-6 py-4 font-normal">Data</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold group-hover:text-[#FFD600] transition-colors">{submission.userName}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{submission.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-400">{submission.formName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-zinc-300 truncate max-w-[200px] block">{submission.subject}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-zinc-500">{submission.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-mono px-2 py-1 rounded-sm border ${
                    submission.status === 'Pendente' ? 'border-orange-500/30 text-orange-400 bg-orange-400/5' :
                    submission.status === 'Respondido' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-400/5' :
                    submission.status === 'Em análise' ? 'border-blue-500/30 text-blue-400 bg-blue-400/5' :
                    'border-zinc-500/30 text-zinc-400 bg-zinc-400/5'
                  }`}>
                    {submission.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedSubmission(submission)}
                      className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500 font-mono">MOSTRANDO {filteredSubmissions.length} RESPOSTAS</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-white/10 rounded-sm text-xs font-mono text-zinc-500 hover:text-white transition-colors">ANTERIOR</button>
          <button className="px-4 py-2 border border-white/10 rounded-sm text-xs font-mono text-zinc-500 hover:text-white transition-colors">PRÓXIMO</button>
        </div>
      </div>

      {/* Submission Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-[#FFD600] uppercase tracking-widest px-2 py-1 bg-[#FFD600]/10 rounded-sm">
                        {selectedSubmission.formName}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ${
                        selectedSubmission.priority === 'Alta' ? 'bg-red-500/10 text-red-400' :
                        selectedSubmission.priority === 'Média' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        Prioridade {selectedSubmission.priority}
                      </span>
                    </div>
                    <h2 className="text-2xl font-display font-bold">{selectedSubmission.subject}</h2>
                    <p className="text-zinc-500 text-sm mt-1">{selectedSubmission.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-white/5 rounded-sm transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-zinc-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Remetente</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFD600] text-black flex items-center justify-center font-bold rounded-sm">
                          {selectedSubmission.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{selectedSubmission.userName}</p>
                          <p className="text-xs text-zinc-500">{selectedSubmission.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Status Atual</p>
                      <div className="flex items-center gap-2">
                        {selectedSubmission.status === 'Pendente' ? <Clock className="w-4 h-4 text-orange-400" /> :
                         selectedSubmission.status === 'Respondido' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                         <AlertCircle className="w-4 h-4 text-blue-400" />}
                        <span className="text-sm font-bold">{selectedSubmission.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-8">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Mensagem</p>
                  <p className="text-sm text-zinc-300 leading-relaxed italic">
                    &quot;{selectedSubmission.message}&quot;
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-grow py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm">
                    RESPONDER AGORA
                  </button>
                  <button className="px-6 py-3 border border-white/10 hover:bg-white/5 transition-all text-xs font-mono rounded-sm">
                    MARCAR COMO LIDO
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
