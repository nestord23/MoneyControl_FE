import { useState, useEffect, useCallback } from 'preact/hooks';
import { categoriesService } from '../services/categoriesService';
import { getCached, setCache, invalidateCache } from '../lib/cache';
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types/categorias';
import type { PagedResult } from '../types/compartidos';

const CACHE_KEY = 'page:categories';

interface UseCategoriesListReturn {
  categories: CategoryResponse[];
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  create: (data: CreateCategoryRequest) => Promise<CategoryResponse>;
  update: (id: number, data: UpdateCategoryRequest) => Promise<CategoryResponse>;
  remove: (id: number) => Promise<void>;
}

export function useCategoriesList(pageSize = 20): UseCategoriesListReturn {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PagedResult<CategoryResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${CACHE_KEY}:${page}:${pageSize}`;

  const fetchData = useCallback(() => {
    const cached = getCached<PagedResult<CategoryResponse>>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    categoriesService.getAll(page, pageSize)
      .then(res => {
        setCache(cacheKey, res);
        setData(res);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [cacheKey, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = useCallback(async (req: CreateCategoryRequest) => {
    const created = await categoriesService.create(req);
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

  const update = useCallback(async (id: number, req: UpdateCategoryRequest) => {
    const updated = await categoriesService.update(id, req);
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
    await categoriesService.delete(id);
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
    categories: data?.items ?? [],
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
