// src/pages/AdminDashboardPage.tsx

import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Users, FileText, TrendingUp, Activity, Crown, Star,
  Calendar, BarChart3, PieChart, LineChart, Shield,
  Database, Mail, Loader2, AlertCircle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AdminStats {
  users: {
    total: number;
    newThisWeek: number;
    newThisMonth: number;
    activeUsers: number;
    betaTesters: number;
  };
  reports: {
    total: number;
    personal: number;
    synastry: number;
    thisWeek: number;
    thisMonth: number;
    averagePerUser: number;
  };
  engagement: {
    usersWithMultipleReports: number;
    topUser: {
      name: string;
      reportCount: number;
    } | null;
  };
  growth: {
    dailySignups: Array<{
      date: string;
      count: number;
    }>;
    dailyReports: Array<{
      date: string;
      count: number;
    }>;
  };
}

const fetchAdminStats = async (): Promise<AdminStats> => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

const AdminDashboardPage: FC = () => {
  const user = useAuthStore((state) => state.user);
  
  // Verificar se é o owner/admin - você deve ajustar essa lógica
  const isOwner = user?.email === 'italo@arcano.com' || user?.email === 'italo889@gmail.com';
  // Using the email property from UserPayload to check admin permissions
  
  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  const { 
    data: stats, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
    refetchInterval: 5 * 60 * 1000, // Refresh a cada 5 minutos
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#161221] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#8b63e9] mx-auto mb-4" />
          <p className="text-[#a495c6]">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#161221] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-400">Erro ao carregar dashboard admin</p>
          <p className="text-[#a495c6] text-sm mt-2">
            {(error as any)?.message || 'Tente novamente mais tarde'}
          </p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-[#161221] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2f2546] to-[#1a1525] border-b border-[#8b63e9]/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="text-[#8b63e9]" />
                Dashboard Admin
              </h1>
              <p className="text-[#a495c6] mt-1">
                Visão geral da plataforma Arcano
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-[#a495c6]">
                Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Sistema Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Admin Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/changelog"
              className="px-4 py-2 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9] border border-[#8b63e9]/30 hover:bg-[#8b63e9]/30 transition-colors flex items-center gap-2"
            >
              <Sparkles size={16} />
              Gerenciar Changelogs
            </Link>
            
            <div className="px-4 py-2 rounded-lg bg-[#2f2546]/40 border border-[#8b63e9]/20 text-[#a495c6] flex items-center gap-2">
              <Database size={16} />
              Outros recursos em breve
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total de Usuários"
            value={stats.users.total}
            trend={`+${stats.users.newThisMonth} este mês`}
            icon={<Users />}
            color="blue"
          />
          
          <KPICard
            title="Relatórios Gerados"
            value={stats.reports.total}
            trend={`+${stats.reports.thisMonth} este mês`}
            icon={<FileText />}
            color="purple"
          />
          
          <KPICard
            title="Usuários Ativos"
            value={stats.users.activeUsers}
            trend={`${((stats.users.activeUsers / stats.users.total) * 100).toFixed(1)}% do total`}
            icon={<Activity />}
            color="green"
          />
          
          <KPICard
            title="Beta Testers"
            value={stats.users.betaTesters}
            trend="Usuários especiais"
            icon={<Crown />}
            color="gold"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Metrics */}
          <MetricCard title="Métricas de Usuários" icon={<Users />}>
            <div className="space-y-4">
              <MetricRow
                label="Novos esta semana"
                value={stats.users.newThisWeek}
                total={stats.users.total}
              />
              <MetricRow
                label="Usuários com múltiplos relatórios"
                value={stats.engagement.usersWithMultipleReports}
                total={stats.users.total}
              />
              <MetricRow
                label="Taxa de conversão"
                value={((stats.users.activeUsers / stats.users.total) * 100).toFixed(1) + '%'}
              />
            </div>
          </MetricCard>

          {/* Report Metrics */}
          <MetricCard title="Métricas de Relatórios" icon={<FileText />}>
            <div className="space-y-4">
              <MetricRow
                label="Relatórios Pessoais"
                value={stats.reports.personal}
                total={stats.reports.total}
              />
              <MetricRow
                label="Relatórios de Sinastria"
                value={stats.reports.synastry}
                total={stats.reports.total}
              />
              <MetricRow
                label="Média por usuário"
                value={stats.reports.averagePerUser.toFixed(1)}
              />
            </div>
          </MetricCard>
        </div>

        {/* Engagement */}
        {stats.engagement.topUser && (
          <div className="mb-8">
            <MetricCard title="Destaque da Comunidade" icon={<Star />}>
              <div className="text-center p-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8b63e9]/20 to-[#FFD700]/20 rounded-2xl border border-[#8b63e9]/30">
                  <Crown className="text-[#FFD700]" size={20} />
                  <div>
                    <p className="text-white font-semibold">
                      {stats.engagement.topUser.name}
                    </p>
                    <p className="text-[#a495c6] text-sm">
                      {stats.engagement.topUser.reportCount} relatórios criados
                    </p>
                  </div>
                </div>
              </div>
            </MetricCard>
          </div>
        )}

        {/* Advanced Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Gráfico de Linha - Crescimento de Usuários */}
          <div className="xl:col-span-2">
            <ChartCard title="Crescimento de Usuários" icon={<LineChart />}>
              <Line
                data={{
                  labels: stats.growth.dailySignups.map(d => new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
                  datasets: [{
                    label: 'Novos Usuários',
                    data: stats.growth.dailySignups.map(d => d.count),
                    borderColor: '#8b63e9',
                    backgroundColor: 'rgba(139, 99, 233, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#8b63e9',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { color: '#F5F5F5' }
                    }
                  },
                  scales: {
                    x: { 
                      ticks: { color: '#a495c6' },
                      grid: { color: 'rgba(164, 149, 198, 0.1)' }
                    },
                    y: { 
                      ticks: { color: '#a495c6' },
                      grid: { color: 'rgba(164, 149, 198, 0.1)' }
                    }
                  }
                }}
                height={200}
              />
            </ChartCard>
          </div>

          {/* Gráfico de Pizza - Tipos de Relatórios */}
          <ChartCard title="Tipos de Relatórios" icon={<PieChart />}>
            <Pie
              data={{
                labels: ['Pessoais', 'Sinastria'],
                datasets: [{
                  data: [stats.reports.personal, stats.reports.synastry],
                  backgroundColor: ['#8b63e9', '#FFD700'],
                  borderColor: ['#6d28d9', '#f59e0b'],
                  borderWidth: 2,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { 
                      color: '#F5F5F5',
                      padding: 20,
                      usePointStyle: true
                    }
                  }
                }
              }}
              height={200}
            />
          </ChartCard>
        </div>

        {/* Seção de Gráficos de Barras */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Barras - Atividade por Semana */}
          <ChartCard title="Relatórios Criados (30 dias)" icon={<BarChart3 />}>
            <Bar
              data={{
                labels: stats.growth.dailyReports.map(d => new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
                datasets: [{
                  label: 'Relatórios',
                  data: stats.growth.dailyReports.map(d => d.count),
                  backgroundColor: 'rgba(255, 215, 0, 0.8)',
                  borderColor: '#FFD700',
                  borderWidth: 1,
                  borderRadius: 6,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: '#F5F5F5' }
                  }
                },
                scales: {
                  x: { 
                    ticks: { color: '#a495c6' },
                    grid: { color: 'rgba(164, 149, 198, 0.1)' }
                  },
                  y: { 
                    ticks: { color: '#a495c6' },
                    grid: { color: 'rgba(164, 149, 198, 0.1)' },
                    beginAtZero: true
                  }
                }
              }}
              height={200}
            />
          </ChartCard>

          {/* Gráfico de Barras - Engajamento dos Usuários */}
          <ChartCard title="Engajamento de Usuários" icon={<Activity />}>
            <Bar
              data={{
                labels: ['Usuários Ativos', 'Com Múltiplos Relatórios', 'Beta Testers'],
                datasets: [{
                  label: 'Usuários',
                  data: [
                    stats.users.activeUsers,
                    stats.engagement.usersWithMultipleReports,
                    stats.users.betaTesters
                  ],
                  backgroundColor: [
                    'rgba(139, 99, 233, 0.8)',
                    'rgba(255, 215, 0, 0.8)',
                    'rgba(34, 197, 94, 0.8)'
                  ],
                  borderColor: ['#8b63e9', '#FFD700', '#22c55e'],
                  borderWidth: 1,
                  borderRadius: 6,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: '#F5F5F5' }
                  }
                },
                scales: {
                  x: { 
                    ticks: { color: '#a495c6' },
                    grid: { color: 'rgba(164, 149, 198, 0.1)' }
                  },
                  y: { 
                    ticks: { color: '#a495c6' },
                    grid: { color: 'rgba(164, 149, 198, 0.1)' },
                    beginAtZero: true
                  }
                }
              }}
              height={200}
            />
          </ChartCard>
        </div>

        {/* Simple Growth Charts (mantendo os originais como resumo) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GrowthChart
            title="Tendência de Crescimento"
            data={stats.growth.dailySignups}
            icon={<TrendingUp />}
            color="#8b63e9"
          />
          
          <GrowthChart
            title="Resumo de Atividade"
            data={stats.growth.dailyReports}
            icon={<BarChart3 />}
            color="#FFD700"
          />
        </div>
      </div>
    </div>
  );
};

// Componente KPI Card
const KPICard: FC<{
  title: string;
  value: number | string;
  trend: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'gold';
}> = ({ title, value, trend, icon, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    purple: 'from-[#8b63e9]/20 to-[#a78bfa]/20 border-[#8b63e9]/30 text-[#8b63e9]',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    gold: 'from-[#FFD700]/20 to-[#FFED4A]/20 border-[#FFD700]/30 text-[#FFD700]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} backdrop-blur border`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#a495c6] text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          <p className="text-xs text-[#a495c6] mt-1">{trend}</p>
        </div>
        <div className={`p-3 rounded-xl bg-current/10 ${colorClasses[color].split(' ').pop()}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Componente Metric Card
const MetricCard: FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl bg-[#2f2546]/40 border border-[#8b63e9]/30 backdrop-blur"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);

// Componente Metric Row
const MetricRow: FC<{
  label: string;
  value: number | string;
  total?: number;
}> = ({ label, value, total }) => (
  <div className="flex items-center justify-between">
    <span className="text-[#a495c6]">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-white font-semibold">{value}</span>
      {total && typeof value === 'number' && (
        <span className="text-xs text-[#8b63e9]">
          ({((value / total) * 100).toFixed(1)}%)
        </span>
      )}
    </div>
  </div>
);

// Componente Growth Chart (simplified)
const GrowthChart: FC<{
  title: string;
  data: Array<{ date: string; count: number }>;
  icon: React.ReactNode;
  color: string;
}> = ({ title, icon, data }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const average = total / data.length || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-[#2f2546]/40 border border-[#8b63e9]/30 backdrop-blur"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9]">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#a495c6]">Total (30 dias)</span>
          <span className="text-white font-semibold">{total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#a495c6]">Média diária</span>
          <span className="text-white font-semibold">{average.toFixed(1)}</span>
        </div>
        
        {/* Simple visual representation */}
        <div className="pt-4">
          <div className="h-2 bg-[#2f2546] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#8b63e9] to-[#a78bfa] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (total / 100) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-[#a495c6] mt-2 text-center">
            Últimos 30 dias de atividade
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Componente ChartCard para gráficos
const ChartCard: FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-[#2f2546]/40 border border-[#8b63e9]/30 backdrop-blur"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9]">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="h-64">
        {children}
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
