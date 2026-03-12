'use client';

import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Lock, 
  User,
  Save,
  RefreshCw,
  Mail,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminConfiguracoesPage() {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tighter">CONFIGURAÇÕES</h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Preferências do sistema e segurança</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-1">
          {[
            { id: 'geral', label: 'Geral', icon: Settings },
            { id: 'seguranca', label: 'Segurança', icon: Shield },
            { id: 'notificacoes', label: 'Notificações', icon: Bell },
            { id: 'integracoes', label: 'Integrações', icon: Globe },
            { id: 'banco', label: 'Banco de Dados', icon: Database },
          ].map((tab, index) => (
            <button
              key={tab.id}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-sm text-xs font-mono transition-all ${
                index === 0 ? 'bg-[#FFD600] text-black font-bold' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8">
          {/* Profile Section */}
          <section className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <div className="w-16 h-16 bg-[#FFD600] text-black flex items-center justify-center text-2xl font-bold rounded-sm">
                A
              </div>
              <div>
                <h3 className="text-lg font-bold">Perfil do Administrador</h3>
                <p className="text-xs text-zinc-500">Super Admin • Missão Tech Lab</p>
              </div>
              <button className="ml-auto px-4 py-2 border border-white/10 hover:bg-white/5 rounded-sm text-[10px] font-mono transition-all">
                ALTERAR AVATAR
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue="Administrador Missão"
                  className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Principal</label>
                <input 
                  type="email" 
                  defaultValue="admin@missao.org"
                  className="w-full bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                />
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FFD600]" /> Segurança da Conta
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/5">
                <div className="flex items-center gap-4">
                  <Smartphone className="w-5 h-5 text-zinc-500" />
                  <div>
                    <p className="text-sm font-bold">Autenticação em Duas Etapas</p>
                    <p className="text-[10px] text-zinc-500">Aumente a segurança da sua conta administrativa.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-sm text-[10px] font-mono transition-all">
                  CONFIGURAR
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Alterar Senha</label>
                <div className="flex gap-4">
                  <input 
                    type="password" 
                    placeholder="Nova senha"
                    className="flex-grow bg-black border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] rounded-sm"
                  />
                  <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-[10px] font-mono transition-all">
                    ATUALIZAR
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* API Keys Section */}
          <section className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#FFD600]" /> Chaves de API e Integrações
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Firebase Project ID</label>
                <div className="flex gap-4">
                  <div className="flex-grow relative">
                    <input 
                      type={showApiKey ? "text" : "password"} 
                      readOnly
                      value="missao-tech-lab-2026"
                      className="w-full bg-black border border-white/10 px-4 py-2 text-sm font-mono text-zinc-400 rounded-sm"
                    />
                    <button 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-all">
                    <RefreshCw className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 border border-white/10 hover:bg-white/5 rounded-sm text-xs font-mono transition-all">
              DESCARTAR
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-[#FFD600] text-black font-bold text-xs font-mono hover:bg-[#FFD600]/90 transition-all rounded-sm">
              <Save className="w-4 h-4" /> SALVAR ALTERAÇÕES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
