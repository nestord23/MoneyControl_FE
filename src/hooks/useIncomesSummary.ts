import { useState, useEffect, useCallback } from 'preact/hooks';
import { incomesService } from '../services/incomesService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { IncomeSummaryResponse } from '../types/ingresos';

const CACHE_KEY = 'page:incomes:summary';

interface UseIncomesSummaryReturn {
  summary: IncomeSummaryResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useIncomesSummary(): UseIncomesSummaryReturn {
  const [summary, setSummary] = useState<IncomeSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    const cached = getCached<IncomeSummaryResponse>(CACHE_KEY);
    if (cached) {
      setSummary(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    incomesService.getSummary()
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
