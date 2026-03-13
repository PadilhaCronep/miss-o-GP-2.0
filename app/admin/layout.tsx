'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Database,
  FileText,
  FolderKanban,
  Home,
  ImageIcon,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AdminProvider, useAdmin } from '@/components/admin/admin-provider';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/formularios', label: 'Formularios', icon: FileText },
  { href: '/admin/projects', label: 'Projetos', icon: FolderKanban },
  { href: '/admin/pessoas', label: 'Membros', icon: Users },
  { href: '/admin/contribuicoes', label: 'Contribuicoes', icon: Database },
  { href: '/admin/categorias', label: 'Categorias & Tags', icon: Layers },
  { href: '/admin/midia', label: 'Midia', icon: ImageIcon },
  { href: '/admin/configuracoes', label: 'Configuracoes', icon: Settings },
];

function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { db, integrationMode } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) {
      setAuthChecked(true);
      return;
    }

    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      router.replace('/admin/login');
      return;
    }
    setAuthChecked(true);
  }, [isLogin, router]);

  const latestActivity = useMemo(() => db.activities[0], [db.activities]);

  if (!authChecked && !isLogin) {
    return (
      <div className="min-h-screen bg-[#050505] text-white grid place-items-center">
        <p className="text-zinc-400 font-mono text-sm">Validando sessao administrativa...</p>
      </div>
    );
  }

  if (isLogin) return <>{children}</>;

  const logout = () => {
    localStorage.removeItem('admin_auth');
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,214,0,0.08),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid-white opacity-30" />

      <aside className="hidden xl:flex fixed left-0 top-0 h-screen w-72 flex-col border-r border-white/10 bg-black/60 backdrop-blur-md z-40">
        <div className="p-6 border-b border-white/10">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Missao Lab</p>
          <h1 className="text-xl font-display font-bold tracking-tight mt-1 text-[#FFD600]">Command Center</h1>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${
                  active
                    ? 'bg-[#FFD600] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? 'text-black' : 'group-hover:text-[#FFD600]'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir para plataforma publica
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-red-500/20 text-zinc-300 hover:text-red-300 rounded-sm transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Encerrar sessao
          </button>
        </div>
      </aside>

      <header className="fixed top-0 left-0 xl:left-72 right-0 z-30 h-16 border-b border-white/10 bg-[#050505]/85 backdrop-blur-md">
        <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <button
              className="xl:hidden p-2 rounded-sm border border-white/10 bg-white/5"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-sm border border-white/10 bg-black/40 w-full">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Busca global de leads, membros e projetos"
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border border-white/10 bg-white/5 text-zinc-400 font-mono">
              {integrationMode}
            </span>
            <div className="hidden lg:block text-right">
              <p className="text-xs text-zinc-500">Ultima atividade</p>
              <p className="text-xs text-zinc-300 max-w-[280px] truncate">
                {latestActivity?.description || 'Sem atividade recente'}
              </p>
            </div>
            <button className="p-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 xl:hidden"
          >
            <button
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-72 border-r border-white/10 bg-[#050505] p-4"
            >
              <div className="mb-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Missao Lab</p>
                <p className="text-lg font-display text-[#FFD600] font-bold">Command Center</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-sm ${
                      pathname === item.href
                        ? 'bg-[#FFD600] text-black font-semibold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20 xl:pl-72 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminChrome>{children}</AdminChrome>
    </AdminProvider>
  );
}
