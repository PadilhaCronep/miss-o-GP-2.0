'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Shield, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    window.setTimeout(() => {
      if (username === 'admin' && password === 'missao2026') {
        localStorage.setItem('admin_auth', 'true');
        router.replace('/admin');
        return;
      }
      setError('Credenciais invalidas. Utilize o acesso configurado para o painel.');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,214,0,0.14),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-sm border border-[#FFD600]/30 bg-[#FFD600]/10 mb-4">
            <Shield className="w-8 h-8 text-[#FFD600]" />
          </div>
          <h1 className="text-3xl font-display font-bold">Command Center</h1>
          <p className="text-zinc-500 text-sm mt-2">Acesso administrativo do Missao Tech Lab</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-sm border border-white/10 bg-[#0A0A0A] p-6 space-y-5">
          <label className="block space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">Usuario</span>
            <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-black px-3 py-2.5 focus-within:border-[#FFD600]/60 transition-colors">
              <User className="w-4 h-4 text-zinc-500" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Seu usuario"
                required
              />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">Senha</span>
            <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-black px-3 py-2.5 focus-within:border-[#FFD600]/60 transition-colors">
              <Lock className="w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="********"
                required
              />
            </div>
          </label>

          {error ? <p className="text-xs text-rose-300 rounded-sm border border-rose-500/30 bg-rose-500/10 p-3">{error}</p> : null}

          <button
            disabled={loading}
            className="w-full h-11 rounded-sm bg-[#FFD600] text-black font-semibold text-sm hover:bg-white transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {loading ? 'Autenticando...' : 'Entrar no painel'}
            {!loading ? <ArrowRight className="w-4 h-4" /> : null}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
