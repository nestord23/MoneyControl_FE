import { useState, useEffect } from 'preact/hooks';
import { dashboardService } from '../services/dashboardService';
import { getCached, setCache } from '../lib/cache';
import type { DashboardData, ChartDataset } from '../types/dashboard';

const CACHE_KEY = 'page:dashboard';

function formatCurrency(n: number): string {
  const sign = n >= 0 ? '+' : '-';
  return `${sign}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function formatAmount(amount: number, type: 'ingreso' | 'gasto'): string {
  const sign = type === 'ingreso' ? '+' : '-';
  return `${sign}$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export interface StatCard {
  titulo: string;
  valor: string;
  variante: 'primary' | 'secondary' | 'alert';
  icono: 'trending-up' | 'trending-down' | 'activity' | 'dollar-sign';
}

export interface ActivityItem {
  descripcion: string;
  fecha: string;
  monto: string;
  tipo: 'ingreso' | 'gasto';
  icono: string;
}

interface UseDashboardDataReturn {
  balance: number;
  balanceLoading: boolean;
  stats: StatCard[];
  statsLoading: boolean;
  chartLabels: string[];
  chartDatasets: ChartDataset[];
  chartLoading: boolean;
  activityItems: ActivityItem[];
  activityLoading: boolean;
  error: string | null;
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function useDashboardData(year: number = new Date().getFullYear()): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached<DashboardData>(CACHE_KEY);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    dashboardService.getData(year)
      .then(res => {
        setCache(CACHE_KEY, res);
        setData(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [year]);

  const balance = data?.balance ?? 0;
  const incomesMonth = data?.incomesTotalMonth ?? 0;
  const expensesMonth = data?.expensesTotalMonth ?? 0;
  const loansPending = data?.loansTotalPending ?? 0;

  const ratio = expensesMonth > 0
    ? (incomesMonth / expensesMonth)
    : incomesMonth > 0 ? 99 : 1;

  const stats: StatCard[] = [
    { titulo: 'Ingresos', valor: formatCurrency(incomesMonth), variante: 'secondary', icono: 'trending-up' },
    { titulo: 'Gastos', valor: formatCurrency(-expensesMonth), variante: 'alert', icono: 'trending-down' },
    { titulo: 'Ratio', valor: ratio.toFixed(2), variante: 'primary', icono: 'activity' },
    { titulo: 'Préstamos Pendientes', valor: `$${loansPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, variante: 'alert', icono: 'dollar-sign' },
  ];

  const chartDatasets: ChartDataset[] = [
    { label: 'Ingresos', data: data?.incomesMonthlyTotals ?? [], borderColor: '#00ff88' },
    { label: 'Gastos', data: data?.expensesMonthlyTotals ?? [], borderColor: '#ff4466' },
  ];

  const rawExpenses = data?.recentExpenses ?? [];
  const rawIncomes = data?.recentIncomes ?? [];
  const activityItems: ActivityItem[] = [
    ...rawIncomes.map(i => ({
      descripcion: i.description || 'Ingreso registrado',
      fecha: formatDate(i.date),
      monto: formatAmount(i.amount, 'ingreso'),
      tipo: 'ingreso' as const,
      icono: 'trending-up',
    })),
    ...rawExpenses.map(e => ({
      descripcion: e.description || 'Gasto registrado',
      fecha: formatDate(e.date),
      monto: formatAmount(e.amount, 'gasto'),
      tipo: 'gasto' as const,
      icono: 'shopping-cart',
    })),
  ].sort(() => Math.random() - 0.5).slice(0, 5);

  return {
    balance,
    balanceLoading: loading,
    stats,
    statsLoading: loading,
    chartLabels: MESES,
    chartDatasets,
    chartLoading: loading,
    activityItems,
    activityLoading: loading,
    error,
  };
}
