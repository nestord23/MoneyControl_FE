import { useState, useEffect } from 'preact/hooks';
import { expensesService } from '../services/expensesService';
import { incomesService } from '../services/incomesService';
import { getCached, setCache } from '../lib/cache';

export interface ActivityItem {
  descripcion: string;
  fecha: string;
  monto: string;
  tipo: 'ingreso' | 'gasto';
  icono: string;
}

const CACHE_KEY = 'page:dashboard:activity';

interface UseRecentActivityReturn {
  items: ActivityItem[];
  loading: boolean;
  error: string | null;
}

function formatAmount(amount: number, type: 'ingreso' | 'gasto'): string {
  const sign = type === 'ingreso' ? '+' : '-';
  return `${sign}$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

const ICONO_MAP: Record<string, string> = {
  ingreso: 'trending-up',
  gasto: 'shopping-cart',
};

export function useRecentActivity(limit = 5): UseRecentActivityReturn {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached<ActivityItem[]>(CACHE_KEY);
    if (cached) {
      setItems(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all([
      expensesService.getAll(1, limit),
      incomesService.getAll(1, limit),
    ])
      .then(([expenses, incomes]) => {
        const mapped: ActivityItem[] = [
          ...incomes.items.map(i => ({
            descripcion: i.description || 'Ingreso registrado',
            fecha: formatDate(i.date),
            monto: formatAmount(i.amount, 'ingreso'),
            tipo: 'ingreso' as const,
            icono: 'trending-up',
          })),
          ...expenses.items.map(e => ({
            descripcion: e.description || 'Gasto registrado',
            fecha: formatDate(e.date),
            monto: formatAmount(e.amount, 'gasto'),
            tipo: 'gasto' as const,
            icono: 'shopping-cart',
          })),
        ].sort(() => Math.random() - 0.5).slice(0, limit);

        setCache(CACHE_KEY, mapped);
        setItems(mapped);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [limit]);

  return { items, loading, error };
}
