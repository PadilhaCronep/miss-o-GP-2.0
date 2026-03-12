'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  LayoutGrid,
  List as ListIcon,
  X,
  Save,
  Image as ImageIcon,
  Link as LinkIcon,
  FolderKanban
} from 'lucide-react';
import { projects as initialProjects } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject({
        id: '',
        title: '',
        description: '',
        category: 'Eleitoral',
        status: 'Publicado',
        featured: false,
        image: '',
        link: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a Firebase call
    if (editingProject.id) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      const newProject = { ...editingProject, id: Math.random().toString(36).substr(2, 9) };
      setProjects([newProject, ...projects]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">PROJETOS</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Gerenciamento do portfólio do laboratório</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" /> NOVO PROJETO
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex border border-white/10 rounded-sm overflow-hidden">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#FFD600] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#FFD600] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todas Categorias</option>
            <option>Eleitoral</option>
            <option>Transparência</option>
            <option>Mobilização</option>
          </select>
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todos Status</option>
            <option>Publicado</option>
            <option>Rascunho</option>
            <option>Arquivado</option>
          </select>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' ? (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-normal">Projeto</th>
                <th className="px-6 py-4 font-normal">Categoria</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Destaque</th>
                <th className="px-6 py-4 font-normal text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-zinc-700" />
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-[#FFD600] transition-colors">{project.title}</p>
                        <p className="text-[10px] font-mono text-zinc-500">/{project.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-zinc-400">{project.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-mono px-2 py-1 rounded-sm border border-emerald-500/30 text-emerald-400 bg-emerald-400/5">
                      {project.status?.toUpperCase() || 'PUBLICADO'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setProjects(projects.map(p => p.id === project.id ? { ...p, featured: !p.featured } : p))}
                      className={`w-8 h-4 rounded-full relative transition-colors ${project.featured ? 'bg-[#FFD600]' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${project.featured ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(project)}
                        className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                        className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden group hover:border-[#FFD600]/50 transition-colors">
              <div className="aspect-video bg-zinc-900 flex items-center justify-center relative">
                <FolderKanban className="w-12 h-12 text-zinc-800" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-[9px] font-mono text-white border border-white/10">
                    {project.category.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FFD600] transition-colors">{project.title}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-6">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-emerald-400">{project.status?.toUpperCase() || 'PUBLICADO'}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                      className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                    {editingProject.id ? 'EDITAR PROJETO' : 'NOVO PROJETO'}
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
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Título do Projeto</label>
                      <input 
                        type="text" 
                        required
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Categoria</label>
                      <select 
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      >
                        <option>Eleitoral</option>
                        <option>Transparência</option>
                        <option>Mobilização</option>
                        <option>Comunicação</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Descrição Curta</label>
                    <textarea 
                      required
                      rows={3}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                      className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Status</label>
                      <select 
                        value={editingProject.status}
                        onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                      >
                        <option>Publicado</option>
                        <option>Rascunho</option>
                        <option>Arquivado</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Destaque</label>
                      <div className="flex items-center gap-4 h-10">
                        <button 
                          type="button"
                          onClick={() => setEditingProject({...editingProject, featured: !editingProject.featured})}
                          className={`w-12 h-6 rounded-full relative transition-colors ${editingProject.featured ? 'bg-[#FFD600]' : 'bg-zinc-800'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${editingProject.featured ? 'left-7' : 'left-1'}`} />
                        </button>
                        <span className="text-xs text-zinc-400">Mostrar na home</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">URL da Imagem</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                          className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Link Externo</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={editingProject.link}
                          onChange={(e) => setEditingProject({...editingProject, link: e.target.value})}
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
                      <Save className="w-4 h-4" /> SALVAR PROJETO
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500 font-mono">MOSTRANDO {filteredProjects.length} PROJETOS</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-white/10 rounded-sm text-xs font-mono text-zinc-500 hover:text-white transition-colors">ANTERIOR</button>
          <button className="px-4 py-2 border border-white/10 rounded-sm text-xs font-mono text-zinc-500 hover:text-white transition-colors">PRÓXIMO</button>
        </div>
      </div>
    </div>
  );
}
