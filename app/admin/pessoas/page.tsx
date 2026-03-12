'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram,
  Shield,
  Zap,
  Clock,
  Terminal,
  Code2,
  Database,
  Layout,
  X,
  Save,
  User
} from 'lucide-react';
import { team as initialTeam } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminTeamPage() {
  const [team, setTeam] = useState(initialTeam);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (member?: any) => {
    if (member) {
      setEditingMember(member);
    } else {
      setEditingMember({
        id: '',
        name: '',
        role: '',
        area: 'Engenharia',
        experience: 'Júnior',
        hours: 0,
        projectIds: [],
        links: {
          github: '',
          linkedin: '',
          instagram: ''
        }
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember.id) {
      setTeam(team.map(m => m.id === editingMember.id ? editingMember : m));
    } else {
      const newMember = { ...editingMember, id: Math.random().toString(36).substr(2, 9) };
      setTeam([newMember, ...team]);
    }
    setIsModalOpen(false);
  };

  const getAreaIcon = (area: string) => {
    const a = area.toLowerCase();
    if (a.includes('front') || a.includes('ui')) return <Layout className="w-4 h-4" />;
    if (a.includes('back') || a.includes('dados')) return <Database className="w-4 h-4" />;
    if (a.includes('infra') || a.includes('cyber')) return <Shield className="w-4 h-4" />;
    if (a.includes('fullstack')) return <Code2 className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">PESSOAS</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Gerenciamento da equipe de elite</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" /> ADICIONAR MEMBRO
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar membros..." 
            className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todas Áreas</option>
            <option>Engenharia</option>
            <option>Dados</option>
            <option>Design</option>
            <option>Segurança</option>
          </select>
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todos Níveis</option>
            <option>Sênior</option>
            <option>Pleno</option>
            <option>Júnior</option>
          </select>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeam.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm group hover:border-[#FFD600]/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-zinc-900 border border-white/10 flex items-center justify-center text-3xl font-display font-bold text-zinc-500 group-hover:bg-[#FFD600] group-hover:text-black transition-all rounded-sm">
                {member.name.charAt(0)}
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleOpenModal(member)}
                  className="p-2 hover:bg-white/5 rounded-sm text-zinc-500 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setTeam(team.filter(m => m.id !== member.id))}
                  className="p-2 hover:bg-white/5 rounded-sm text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFD600] transition-colors">{member.name}</h3>
            <p className="text-xs text-zinc-500 mb-4">{member.role}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                {getAreaIcon(member.area)} {member.area}
              </span>
              <span className="px-2 py-0.5 bg-[#FFD600]/5 border border-[#FFD600]/20 text-[9px] font-mono text-[#FFD600] uppercase">
                {member.experience}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500">PROJETOS</span>
                <span className="text-white">{member.projectIds?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500">CONTRIBUIÇÃO</span>
                <span className="text-white">{member.hours}h</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-white/5">
              {member.links?.github && <Github className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />}
              {member.links?.linkedin && <Linkedin className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />}
              {member.links?.instagram && <Instagram className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />}
              <Mail className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-bold">
                    {editingMember.id ? 'EDITAR MEMBRO' : 'ADICIONAR MEMBRO'}
                  </h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-sm transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-500" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={editingMember.name}
                        onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cargo / Role</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Lead Developer"
                        value={editingMember.role}
                        onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Área de Atuação</label>
                      <select 
                        value={editingMember.area}
                        onChange={(e) => setEditingMember({...editingMember, area: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      >
                        <option>Engenharia</option>
                        <option>Dados</option>
                        <option>Design</option>
                        <option>Segurança</option>
                        <option>Gestão</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Nível de Experiência</label>
                      <select 
                        value={editingMember.experience}
                        onChange={(e) => setEditingMember({...editingMember, experience: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      >
                        <option>Sênior</option>
                        <option>Pleno</option>
                        <option>Júnior</option>
                        <option>Especialista</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Github</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="username"
                          value={editingMember.links.github}
                          onChange={(e) => setEditingMember({...editingMember, links: {...editingMember.links, github: e.target.value}})}
                          className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">LinkedIn</label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="username"
                          value={editingMember.links.linkedin}
                          onChange={(e) => setEditingMember({...editingMember, links: {...editingMember.links, linkedin: e.target.value}})}
                          className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Instagram</label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="username"
                          value={editingMember.links.instagram}
                          onChange={(e) => setEditingMember({...editingMember, links: {...editingMember.links, instagram: e.target.value}})}
                          className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-grow py-3 border border-white/10 hover:bg-white/5 transition-all text-xs font-mono rounded-sm"
                    >
                      CANCELAR
                    </button>
                    <button 
                      type="submit"
                      className="flex-grow py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" /> SALVAR MEMBRO
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

