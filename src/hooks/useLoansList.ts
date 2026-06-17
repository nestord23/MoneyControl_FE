import { useState, useEffect, useCallback } from 'preact/hooks';
import { loansService } from '../services/loansService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { LoanResponse, CreateLoanRequest, UpdateLoanRequest, LoanStatus } from '../types/prestamos';
import type { PagedResult } from '../types/compartidos';

const CACHE_KEY = 'page:loans';

interface UseLoansListReturn {
  loans: LoanResponse[];
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  statusFilter: LoanStatus | null;
  setPage: (page: number) => void;
  setStatusFilter: (status: LoanStatus | null) => void;
  create: (data: CreateLoanRequest) => Promise<LoanResponse>;
  update: (id: number, data: UpdateLoanRequest) => Promise<LoanResponse>;
  markAsPaid: (id: number) => Promise<LoanResponse>;
  remove: (id: number) => Promise<void>;
}

export function useLoansList(pageSize = 20): UseLoansListReturn {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<LoanStatus | null>(null);
  const [data, setData] = useState<PagedResult<LoanResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${CACHE_KEY}:${page}:${pageSize}:${statusFilter ?? 'all'}`;

  const fetchData = useCallback(() => {
    const cached = getCached<PagedResult<LoanResponse>>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const promise = statusFilter === 0
      ? loansService.getPending(page, pageSize)
      : statusFilter === 1
        ? loansService.getPaid(page, pageSize)
        : loansService.getAll(page, pageSize);
    promise
      .then(res => {
        setCache(cacheKey, res);
        setData(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [cacheKey, statusFilter, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSetStatusFilter = useCallback((status: LoanStatus | null) => {
    setStatusFilter(status);
    setPage(1);
  }, []);

  const create = useCallback(async (req: CreateLoanRequest) => {
    const created = await loansService.create(req);
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

  const update = useCallback(async (id: number, req: UpdateLoanRequest) => {
    const updated = await loansService.update(id, req);
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

  const markAsPaid = useCallback(async (id: number) => {
    const updated = await loansService.markAsPaid(id);
    invalidateCache(CACHE_KEY);
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.filter(i => i.id !== id),
        totalCount: prev.totalCount - 1,
      };
    });
    return updated;
  }, []);

  const remove = useCallback(async (id: number) => {
    await loansService.delete(id);
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
    loans: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    loading,
    error,
    statusFilter,
    setPage,
    setStatusFilter: handleSetStatusFilter,
    create,
    update,
    markAsPaid,
    remove,
  };
}
