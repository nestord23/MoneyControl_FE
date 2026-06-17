import { useState, useEffect, useCallback } from 'preact/hooks';
import { expensesService } from '../services/expensesService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { ExpenseSummaryResponse } from '../types/gastos';

const CACHE_KEY = 'page:expenses:summary';

interface UseExpensesSummaryReturn {
  summary: ExpenseSummaryResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useExpensesSummary(): UseExpensesSummaryReturn {
  const [summary, setSummary] = useState<ExpenseSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    const cached = getCached<ExpenseSummaryResponse>(CACHE_KEY);
    if (cached) {
      setSummary(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    expensesService.getSummary()
      .then(res => {
        setCache(CACHE_KEY, res);
        setSummary(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refresh = useCallback(() => {
    invalidateCache(CACHE_KEY);
    fetchData();
  }, [fetchData]);

  return { summary, loading, error, refresh };
}
