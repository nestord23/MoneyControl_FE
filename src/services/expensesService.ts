import { api } from './api';
import type { ExpenseResponse, CreateExpenseRequest, UpdateExpenseRequest, ExpenseSummaryResponse } from '../types/gastos';
import type { PagedResult } from '../types/compartidos';

export const expensesService = {
  getAll: (page = 1, pageSize = 20) =>
    api.get<PagedResult<ExpenseResponse>>(`/api/Expenses?page=${page}&pageSize=${pageSize}`),

  getById: (id: number) =>
    api.get<ExpenseResponse>(`/api/Expenses/${id}`),

  getByCategory: (categoryId: number, page = 1, pageSize = 20) =>
    api.get<PagedResult<ExpenseResponse>>(`/api/Expenses/category/${categoryId}?page=${page}&pageSize=${pageSize}`),

  getMonthlyTotals: (year: number) =>
    api.get<number[]>(`/api/Expenses/monthly?year=${year}`),

  getTotalByDay: (date: string) =>
    api.get<number>(`/api/Expenses/total/day?date=${date}`),

  getTotalByWeek: (date: string) =>
    api.get<number>(`/api/Expenses/total/week?date=${date}`),

  getTotalByMonth: (year: number, month: number) =>
    api.get<number>(`/api/Expenses/total/month?year=${year}&month=${month}`),

  getTotalByYear: (year: number) =>
    api.get<number>(`/api/Expenses/total/year?year=${year}`),

  getTotalFixed: () =>
    api.get<number>('/api/Expenses/total/fixed'),

  getTotalVariable: () =>
    api.get<number>('/api/Expenses/total/variable'),

  getSummary: () =>
    api.get<ExpenseSummaryResponse>('/api/Expenses/summary'),

  create: (data: CreateExpenseRequest) =>
    api.post<ExpenseResponse>('/api/Expenses', data),

  update: (id: number, data: UpdateExpenseRequest) =>
    api.put<ExpenseResponse>(`/api/Expenses/${id}`, data),

  delete: (id: number) =>
    api.del(`/api/Expenses/${id}`),
};
