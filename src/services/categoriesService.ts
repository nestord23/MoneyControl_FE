import { api } from './api';
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types/categorias';
import type { PagedResult } from '../types/compartidos';

export const categoriesService = {
  getAll: (page = 1, pageSize = 20) =>
    api.get<PagedResult<CategoryResponse>>(`/api/Categories?page=${page}&pageSize=${pageSize}`),

  getById: (id: number) =>
    api.get<CategoryResponse>(`/api/Categories/${id}`),

  create: (data: CreateCategoryRequest) =>
    api.post<CategoryResponse>('/api/Categories', data),

  update: (id: number, data: UpdateCategoryRequest) =>
    api.put<CategoryResponse>(`/api/Categories/${id}`, data),

  delete: (id: number) =>
    api.del(`/api/Categories/${id}`),
};
