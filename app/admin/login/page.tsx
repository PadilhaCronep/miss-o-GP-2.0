'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login for now
    // In a real app, this would use Firebase Auth
    setTimeout(() => {
      if (username === 'admin' && password === 'missao2026') {
        // Set a mock cookie or local storage
        localStorage.setItem('admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('Credenciais inválidas. Verifique seu usuário e senha.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD600]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-sm mb-6">
            <Shield className="w-10 h-10 text-[#FFD600]" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tighter mb-2">COMMAND CENTER</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Acesso restrito // Missão Tech Lab</p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#FFD600] transition-colors rounded-sm"
                  placeholder="Seu usuário"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#FFD600] transition-colors rounded-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#FFD600] text-black font-bold py-4 rounded-sm hover:bg-[#FFD600]/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'AUTENTICANDO...' : 'ENTRAR NO SISTEMA'}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            &copy; 2026 Missão Tech Lab // Strategic Digital Development
          </p>
        </div>
      </motion.div>
    </div>
  );
}
