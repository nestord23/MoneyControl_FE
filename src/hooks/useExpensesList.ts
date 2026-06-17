import { useState, useEffect, useCallback } from 'preact/hooks';
import { expensesService } from '../services/expensesService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { ExpenseResponse, CreateExpenseRequest, UpdateExpenseRequest } from '../types/gastos';
import type { PagedResult } from '../types/compartidos';

const CACHE_KEY = 'page:expenses';

interface UseExpensesListReturn {
  expenses: ExpenseResponse[];
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  filterByCategory: number | null;
  setPage: (page: number) => void;
  setCategoryFilter: (categoryId: number | null) => void;
  create: (data: CreateExpenseRequest) => Promise<ExpenseResponse>;
  update: (id: number, data: UpdateExpenseRequest) => Promise<ExpenseResponse>;
  remove: (id: number) => Promise<void>;
}

export function useExpensesList(pageSize = 20): UseExpensesListReturn {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [data, setData] = useState<PagedResult<ExpenseResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${CACHE_KEY}:${page}:${pageSize}:${categoryFilter ?? 'all'}`;

  const fetchData = useCallback(() => {
    const cached = getCached<PagedResult<ExpenseResponse>>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const promise = categoryFilter
      ? expensesService.getByCategory(categoryFilter, page, pageSize)
      : expensesService.getAll(page, pageSize);
    promise
      .then(res => {
        setCache(cacheKey, res);
        setData(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [cacheKey, categoryFilter, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSetCategoryFilter = useCallback((id: number | null) => {
    setCategoryFilter(id);
    setPage(1);
  }, []);

  const create = useCallback(async (req: CreateExpenseRequest) => {
    const created = await expensesService.create(req);
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

  const update = useCallback(async (id: number, req: UpdateExpenseRequest) => {
    const updated = await expensesService.update(id, req);
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
    await expensesService.delete(id);
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
    expenses: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    loading,
    error,
    filterByCategory: categoryFilter,
    setPage,
    setCategoryFilter: handleSetCategoryFilter,
    create,
    update,
    remove,
  };
}
