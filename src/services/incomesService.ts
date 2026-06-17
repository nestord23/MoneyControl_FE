import { api } from './api';
import type { IncomeResponse, CreateIncomeRequest, UpdateIncomeRequest, IncomeSummaryResponse } from '../types/ingresos';
import type { PagedResult } from '../types/compartidos';

export const incomesService = {
  getAll: (page = 1, pageSize = 20) =>
    api.get<PagedResult<IncomeResponse>>(`/api/Incomes?page=${page}&pageSize=${pageSize}`),

  getById: (id: number) =>
    api.get<IncomeResponse>(`/api/Incomes/${id}`),

  getMonthlyTotals: (year: number) =>
    api.get<number[]>(`/api/Incomes/monthly?year=${year}`),

  getTotalByDay: (date: string) =>
    api.get<number>(`/api/Incomes/total/day?date=${date}`),

  getTotalByWeek: (date: string) =>
    api.get<number>(`/api/Incomes/total/week?date=${date}`),

  getTotalByMonth: (year: number, month: number) =>
    api.get<number>(`/api/Incomes/total/month?year=${year}&month=${month}`),

  getTotalByYear: (year: number) =>
    api.get<number>(`/api/Incomes/total/year?year=${year}`),

  getSummary: () =>
    api.get<IncomeSummaryResponse>('/api/Incomes/summary'),

  create: (data: CreateIncomeRequest) =>
    api.post<IncomeResponse>('/api/Incomes', data),

  update: (id: number, data: UpdateIncomeRequest) =>
    api.put<IncomeResponse>(`/api/Incomes/${id}`, data),

  delete: (id: number) =>
    api.del(`/api/Incomes/${id}`),
};
