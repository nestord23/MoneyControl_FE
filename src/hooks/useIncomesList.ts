import { useState, useEffect, useCallback } from 'preact/hooks';
import { incomesService } from '../services/incomesService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { IncomeResponse, CreateIncomeRequest, UpdateIncomeRequest } from '../types/ingresos';
import type { PagedResult } from '../types/compartidos';

const CACHE_KEY = 'page:incomes';

interface UseIncomesListReturn {
  incomes: IncomeResponse[];
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  create: (data: CreateIncomeRequest) => Promise<IncomeResponse>;
  update: (id: number, data: UpdateIncomeRequest) => Promise<IncomeResponse>;
  remove: (id: number) => Promise<void>;
}

export function useIncomesList(pageSize = 20): UseIncomesListReturn {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PagedResult<IncomeResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${CACHE_KEY}:${page}:${pageSize}`;

  const fetchData = useCallback(() => {
    const cached = getCached<PagedResult<IncomeResponse>>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    incomesService.getAll(page, pageSize)
      .then(res => {
        setCache(cacheKey, res);
        setData(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [cacheKey, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = useCallback(async (req: CreateIncomeRequest) => {
    const created = await incomesService.create(req);
    invalidateCache(CACHE_KEY);
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: [created, ...prev.items],
        totalCount: prev.totalCount + 1,
      };
    });
    return created;
  }, []);

  const update = useCallback(async (id: number, req: UpdateIncomeRequest) => {
    const updated = await incomesService.update(id, req);
    invalidateCache(CACHE_KEY);
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map(i => i.id === id ? updated : i),
      };
    });
    return updated;
  }, []);

  const remove = useCallback(async (id: number) => {
    await incomesService.delete(id);
    invalidateCache(CACHE_KEY);
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.filter(i => i.id !== id),
        totalCount: prev.totalCount - 1,
      };
    });
  }, []);

  return {
    incomes: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    loading,
    error,
    setPage,
    create,
    update,
    remove,
  };
}
