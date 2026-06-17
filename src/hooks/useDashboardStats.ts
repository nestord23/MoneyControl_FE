import { useState, useEffect } from 'preact/hooks';
import { incomesService } from '../services/incomesService';
import { expensesService } from '../services/expensesService';
import { loansService } from '../services/loansService';
import { getCached, setCache } from '../lib/cache';

export interface DashboardStat {
  titulo: string;
  valor: string;
  variante: 'secondary' | 'alert' | 'primary';
  icono: 'trending-up' | 'trending-down' | 'activity' | 'dollar-sign';
}

const CACHE_KEY = 'page:dashboard:stats';

interface UseDashboardStatsReturn {
  stats: DashboardStat[];
  loading: boolean;
  error: string | null;
}

function formatCurrency(n: number): string {
  const sign = n >= 0 ? '+' : '-';
  return `${sign}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export function useDashboardStats(year?: number, month?: number): UseDashboardStatsReturn {
  const y = year ?? new Date().getFullYear();
  const m = month ?? new Date().getMonth() + 1;
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached<DashboardStat[]>(CACHE_KEY);
    if (cached) {
      setStats(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all([
      incomesService.getTotalByMonth(y, m),
      expensesService.getTotalByMonth(y, m),
      loansService.getTotalPending(),
    ])
      .then(([incomeMonth, expenseMonth, pendingLoans]) => {
        const ratio = expenseMonth > 0 ? (incomeMonth / expenseMonth) : incomeMonth > 0 ? 99 : 1;
        const result: DashboardStat[] = [
          { titulo: 'Ingresos', valor: formatCurrency(incomeMonth), variante: 'secondary', icono: 'trending-up' },
          { titulo: 'Gastos', valor: formatCurrency(-expenseMonth), variante: 'alert', icono: 'trending-down' },
          { titulo: 'Ratio', valor: ratio.toFixed(2), variante: 'primary', icono: 'activity' },
          { titulo: 'Préstamos Pendientes', valor: `$${pendingLoans.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, variante: 'alert', icono: 'dollar-sign' },
        ];
        setCache(CACHE_KEY, result);
        setStats(result);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [y, m]);

  return { stats, loading, error };
}
