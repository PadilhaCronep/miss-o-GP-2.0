'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  GripVertical,
  FolderKanban,
  FileText,
  Users,
  Settings,
  ChevronRight,
  Tag
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

// Mock data for categories
const initialCategories = [
  { id: '1', name: 'Eleitoral', description: 'Tecnologias voltadas para campanhas e processos eleitorais.', count: 8, color: '#FFD600' },
  { id: '2', name: 'Transparência', description: 'Projetos de abertura de dados e fiscalização pública.', count: 5, color: '#2979FF' },
  { id: '3', name: 'Mobilização', description: 'Ferramentas para engajamento de voluntários e militância.', count: 12, color: '#00E676' },
  { id: '4', name: 'Comunicação', description: 'Plataformas de difusão de conteúdo e estratégia digital.', count: 4, color: '#FF3D00' },
  { id: '5', name: 'Interno', description: 'Ferramentas de gestão e infraestrutura do laboratório.', count: 3, color: '#AA00FF' },
];

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">CATEGORIAS</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Organização estrutural do ecossistema</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm">
          <Plus className="w-4 h-4" /> NOVA CATEGORIA
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar categorias..." 
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Ordem / Nome</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Projetos / Ações</span>
            </div>
            
            <div className="divide-y divide-white/5">
              {filteredCategories.map((category) => (
                <div key={category.id} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-4 h-4 text-zinc-700 cursor-grab active:cursor-grabbing" />
                    <div 
                      className="w-1 h-8 rounded-full" 
                      style={{ backgroundColor: category.color }} 
                    />
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-[#FFD600] transition-colors">{category.name}</h4>
                      <p className="text-[10px] text-zinc-500 max-w-md truncate">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs font-bold">{category.count}</p>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase">Projetos</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-[10px] text-zinc-500 font-mono italic">
            * Arraste as categorias para reordenar a exibição no site público.
          </p>
        </div>

        {/* Quick Stats / Info */}
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm">
            <h3 className="text-lg font-bold mb-4">Resumo de Estrutura</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-sm">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-[#FFD600]" />
                  <span className="text-xs">Total de Categorias</span>
                </div>
                <span className="text-sm font-bold">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-sm">
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-blue-400" />
                  <span className="text-xs">Projetos Categorizados</span>
                </div>
                <span className="text-sm font-bold">32</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFD600]/5 border border-[#FFD600]/20 p-6 rounded-sm">
            <h3 className="text-sm font-bold text-[#FFD600] mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Dica de Organização
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mantenha as categorias concisas e autoexplicativas. Elas são usadas para filtrar projetos no portfólio e organizar a equipe interna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
