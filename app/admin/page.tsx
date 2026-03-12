'use client';

import { 
  Users, 
  FolderKanban, 
  UserPlus, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  ArrowUpRight,
  CheckCircle2,
  FileEdit
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Mock data for the dashboard
const stats = [
  { label: 'Total de Projetos', value: '24', icon: FolderKanban, trend: '+2 este mês', color: '#FFD600' },
  { label: 'Membros da Equipe', value: '12', icon: Users, trend: 'Equipe estável', color: '#00E676' },
  { label: 'Voluntários Ativos', value: '48', icon: UserPlus, trend: '+12 novos', color: '#2979FF' },
  { label: 'Leads Capturados', value: '156', icon: MessageSquare, trend: '+42 esta semana', color: '#FF3D00' },
];

const chartData = [
  { name: 'Seg', leads: 12, volunteers: 4 },
  { name: 'Ter', leads: 18, volunteers: 6 },
  { name: 'Qua', leads: 15, volunteers: 8 },
  { name: 'Qui', leads: 25, volunteers: 12 },
  { name: 'Sex', leads: 32, volunteers: 15 },
  { name: 'Sáb', leads: 20, volunteers: 10 },
  { name: 'Dom', leads: 14, volunteers: 5 },
];

const latestLeads = [
  { id: 1, name: 'Ricardo Silva', area: 'Desenvolvimento', date: 'Há 2 horas', status: 'Novo' },
  { id: 2, name: 'Ana Oliveira', area: 'Design UI/UX', date: 'Há 5 horas', status: 'Em análise' },
  { id: 3, name: 'Marcos Santos', area: 'Gestão de Projetos', date: 'Há 8 horas', status: 'Novo' },
  { id: 4, name: 'Julia Costa', area: 'Marketing Político', date: 'Ontem', status: 'Novo' },
];

const latestProjects = [
  { id: 1, name: 'Plataforma Missão 2026', status: 'Em desenvolvimento', progress: 65 },
  { id: 2, name: 'App de Voluntários', status: 'Planejamento', progress: 15 },
  { id: 3, name: 'Dashboard de Dados', status: 'Finalizado', progress: 100 },
];

const alerts = [
  { id: 1, type: 'warning', message: '3 projetos sem atualização há mais de 7 dias', icon: AlertCircle },
  { id: 2, type: 'info', message: 'Reunião de alinhamento amanhã às 19h', icon: Clock },
  { id: 3, type: 'success', message: 'Meta de captação de leads atingida!', icon: CheckCircle2 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tighter">Dashboard Operacional</h1>
        <p className="text-zinc-500 mt-1">Bem-vindo ao centro de comando do Missão Tech Lab.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-[#FFD600]/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#FFD600]" />
                  {stat.trend}
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-sm">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
            {/* Decorative line */}
            <div 
              className="absolute bottom-0 left-0 h-1 transition-all duration-500 group-hover:w-full" 
              style={{ backgroundColor: stat.color, width: '20px' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-lg font-bold">Captação Semanal</h2>
                <p className="text-xs text-zinc-500">Fluxo de leads e voluntários nos últimos 7 dias</p>
              </div>
              <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFD600] rounded-full" />
                  <span>Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2979FF] rounded-full" />
                  <span>Voluntários</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2979FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2979FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#444" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#444" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#FFD600" 
                    fillOpacity={1} 
                    fill="url(#colorLeads)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volunteers" 
                    stroke="#2979FF" 
                    fillOpacity={1} 
                    fill="url(#colorVolunteers)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latest Projects */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Projetos em Destaque</h2>
              <button className="text-xs text-[#FFD600] hover:underline flex items-center gap-1">
                Ver todos <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {latestProjects.map((project) => (
                <div key={project.id} className="p-4 bg-white/5 rounded-sm flex items-center justify-between group hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#FFD600]/10 rounded-sm">
                      <FolderKanban className="w-4 h-4 text-[#FFD600]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{project.name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{project.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FFD600] transition-all duration-1000" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono w-8 text-right">{project.progress}%</span>
                    <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FileEdit className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
          {/* Alerts */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm">
            <h2 className="text-lg font-bold mb-6">Alertas e Pendências</h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-sm border-l-2 flex gap-3 ${
                    alert.type === 'warning' ? 'bg-orange-500/5 border-orange-500' :
                    alert.type === 'info' ? 'bg-blue-500/5 border-blue-500' :
                    'bg-green-500/5 border-green-500'
                  }`}
                >
                  <alert.icon className={`w-4 h-4 mt-0.5 ${
                    alert.type === 'warning' ? 'text-orange-500' :
                    alert.type === 'info' ? 'text-blue-500' :
                    'text-green-500'
                  }`} />
                  <p className="text-xs text-zinc-300 leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Leads */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Últimos Leads</h2>
              <button className="text-xs text-[#FFD600] hover:underline">Ver todos</button>
            </div>
            <div className="space-y-6">
              {latestLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/10 group-hover:border-[#FFD600]/50 transition-colors">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold group-hover:text-[#FFD600] transition-colors">{lead.name}</h4>
                      <p className="text-[10px] text-zinc-500">{lead.area}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-500">{lead.date}</p>
                    <span className={`text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${
                      lead.status === 'Novo' ? 'bg-[#FFD600] text-black font-bold' : 'bg-white/5 text-zinc-400'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs font-bold transition-all">
              Analisar Novos Voluntários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
