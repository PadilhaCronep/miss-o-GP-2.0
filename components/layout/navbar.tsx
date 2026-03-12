'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Início' },
    { href: '/projetos', label: 'Projetos' },
    { href: '/equipe', label: 'Equipe' },
    { href: '/participe', label: 'Participe' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm"
          aria-label="Página inicial do Missão Tech Lab"
        >
          <div className="w-8 h-8 bg-[#FFD600] rounded-sm flex items-center justify-center group-hover:scale-105 transition-transform" aria-hidden="true">
            <span className="text-black font-display font-bold text-xl leading-none">M</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            Missão<span className="text-[#FFD600]">Tech</span><span className="text-white/50">Lab</span>
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
                className={`relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-1 py-0.5 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                {isActive && (
                  <motion.span 
                    layoutId="nav-indicator"
                    className="absolute -bottom-8 left-0 right-0 h-[2px] bg-[#FFD600]"
                    aria-hidden="true"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://aludydias.com.br" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-[#FFD600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-sm px-2 py-1"
            aria-label="Acessar site de Ludymilla Dias (abre em nova aba)"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" aria-hidden="true" />
            LUDYMILLA DIAS
          </a>
        </div>
      </div>
    </header>
  );
}
