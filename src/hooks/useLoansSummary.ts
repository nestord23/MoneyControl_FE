import { useState, useEffect, useCallback } from 'preact/hooks';
import { loansService } from '../services/loansService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { LoanSummaryResponse } from '../types/prestamos';

const CACHE_KEY = 'page:loans:summary';

interface UseLoansSummaryReturn {
  summary: LoanSummaryResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useLoansSummary(): UseLoansSummaryReturn {
  const [summary, setSummary] = useState<LoanSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    const cached = getCached<LoanSummaryResponse>(CACHE_KEY);
    if (cached) {
      setSummary(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    loansService.getSummary()
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
