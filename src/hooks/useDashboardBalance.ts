import { useState, useEffect } from 'preact/hooks';
import { incomesService } from '../services/incomesService';
import { expensesService } from '../services/expensesService';
import { getCached, setCache } from '../lib/cache';

const CACHE_KEY = 'page:dashboard:balance';

interface UseDashboardBalanceReturn {
  balance: number;
  loading: boolean;
  error: string | null;
}

export function useDashboardBalance(year: number = new Date().getFullYear()): UseDashboardBalanceReturn {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached<number>(CACHE_KEY);
    if (cached !== undefined) {
      setBalance(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all([
      incomesService.getTotalByYear(year),
      expensesService.getTotalByYear(year),
    ])
      .then(([incomeTotal, expenseTotal]) => {
        const total = incomeTotal - expenseTotal;
        setCache(CACHE_KEY, total);
        setBalance(total);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [year]);

  return { balance, loading, error };
}
