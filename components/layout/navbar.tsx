'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollProgressBar } from '@/components/ui/scroll-progress';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/equipe', label: 'Equipe' },
  { href: '/participe', label: 'Participe' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <ScrollProgressBar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
          aria-label="Pagina inicial do Missao Tech Lab"
          onClick={() => setOpen(false)}
        >
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-8 h-8 bg-[#FFD600] rounded-sm flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-black font-display font-bold text-xl leading-none">M</span>
          </motion.div>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            Missao<span className="text-[#FFD600]">Tech</span><span className="text-white/50">Lab</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-1 py-0.5 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-8 left-0 right-0 h-[2px] bg-[#FFD600]"
                    aria-hidden="true"
                  />
                ) : null}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://aludydias.com.br"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-[#FFD600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" aria-hidden="true" />
            LUDYMILLA DIAS
          </a>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#050505]/95"
          >
            <nav className="px-4 py-3 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-sm text-sm ${
                        isActive ? 'bg-[#FFD600] text-black font-semibold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
