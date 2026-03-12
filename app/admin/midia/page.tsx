'use client';

import { useState } from 'react';
import { 
  Upload, 
  Search, 
  Grid, 
  List as ListIcon, 
  Trash2, 
  Download, 
  Eye, 
  Image as ImageIcon,
  File,
  Video,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

// Mock data for media assets
const mockMedia = [
  { id: '1', name: 'logo-missao-tech.png', type: 'image', size: '1.2 MB', date: '2026-03-12', url: 'https://picsum.photos/seed/logo/200/200' },
  { id: '2', name: 'banner-campanha-2026.jpg', type: 'image', size: '4.5 MB', date: '2026-03-11', url: 'https://picsum.photos/seed/banner/800/400' },
  { id: '3', name: 'apresentacao-lab.pdf', type: 'file', size: '8.2 MB', date: '2026-03-10', url: '#' },
  { id: '4', name: 'video-demo-plataforma.mp4', type: 'video', size: '45.0 MB', date: '2026-03-09', url: '#' },
  { id: '5', name: 'icon-voluntarios.svg', type: 'image', size: '12 KB', date: '2026-03-08', url: 'https://picsum.photos/seed/icon/100/100' },
];

export default function AdminMidiaPage() {
  const [media, setMedia] = useState(mockMedia);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedia = media.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">MÍDIA</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Gerenciamento de arquivos e assets</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm">
          <Upload className="w-4 h-4" /> UPLOAD DE ARQUIVO
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0A0A0A] border border-white/10 p-4 rounded-sm">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar arquivos..." 
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex border border-white/10 rounded-sm overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#FFD600] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#FFD600] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          <select className="bg-black border border-white/10 text-xs font-mono px-3 py-2 rounded-sm focus:outline-none focus:border-[#FFD600]">
            <option>Todos os Tipos</option>
            <option>Imagens</option>
            <option>Vídeos</option>
            <option>Documentos</option>
          </select>
        </div>
      </div>

      {/* Media Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMedia.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden group hover:border-[#FFD600]/50 transition-all"
            >
              <div className="aspect-square bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                {item.type === 'image' ? (
                  <Image 
                    src={item.url} 
                    alt={item.name} 
                    fill
                    className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                ) : item.type === 'video' ? (
                  <Video className="w-12 h-12 text-zinc-800" />
                ) : (
                  <File className="w-12 h-12 text-zinc-800" />
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold truncate mb-1">{item.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase">{item.type}</span>
                  <span className="text-[8px] font-mono text-zinc-500">{item.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add New Placeholder */}
          <button className="aspect-square border-2 border-dashed border-white/5 hover:border-[#FFD600]/30 hover:bg-[#FFD600]/5 rounded-sm flex flex-col items-center justify-center gap-2 transition-all group">
            <Plus className="w-8 h-8 text-zinc-700 group-hover:text-[#FFD600] transition-colors" />
            <span className="text-[10px] font-mono text-zinc-700 group-hover:text-[#FFD600] uppercase tracking-widest">Novo Upload</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-normal">Arquivo</th>
                <th className="px-6 py-4 font-normal">Tipo</th>
                <th className="px-6 py-4 font-normal">Tamanho</th>
                <th className="px-6 py-4 font-normal">Data</th>
                <th className="px-6 py-4 font-normal text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMedia.map((item) => (
                <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-900 border border-white/10 rounded-sm flex items-center justify-center">
                        {item.type === 'image' ? <ImageIcon className="w-4 h-4 text-zinc-500" /> :
                         item.type === 'video' ? <Video className="w-4 h-4 text-zinc-500" /> :
                         <File className="w-4 h-4 text-zinc-500" />}
                      </div>
                      <span className="text-xs font-bold group-hover:text-[#FFD600] transition-colors">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-zinc-500">{item.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-zinc-500">{item.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors text-zinc-500 hover:text-white">
                        <Download className="w-4 h-4" />
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
      )}
    </div>
  );
}
