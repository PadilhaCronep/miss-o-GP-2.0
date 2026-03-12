'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Menu,
  X,
  Database,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Leads', href: '/admin/leads' },
    { icon: FileText, label: 'Formulários', href: '/admin/formularios' },
    { icon: FolderKanban, label: 'Projetos', href: '/admin/projects' },
    { icon: Users, label: 'Pessoas', href: '/admin/pessoas' },
    { icon: Database, label: 'Contribuições', href: '/admin/contribuicoes' },
    { icon: Layers, label: 'Categorias', href: '/admin/categorias' },
    { icon: ImageIcon, label: 'Mídia', href: '/admin/midia' },
    { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } border-r border-white/10 bg-[#0A0A0A] transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="font-display font-bold text-xl tracking-tighter text-[#FFD600]">
              COMMAND CENTER
            </span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-sm transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all group ${
                pathname === item.href 
                  ? 'bg-[#FFD600] text-black font-bold' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-black' : 'group-hover:text-[#FFD600]'}`} />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-4 px-4 py-3 w-full text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-sm transition-all">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-sm w-96">
            <Search className="w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Busca global (projeto, pessoa, lead)..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-white/5 rounded-sm transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFD600] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold">Admin</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-[#FFD600] text-black flex items-center justify-center font-bold rounded-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
