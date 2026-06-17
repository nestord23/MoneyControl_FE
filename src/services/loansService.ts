import { api } from './api';
import type { LoanResponse, CreateLoanRequest, UpdateLoanRequest, LoanSummaryResponse } from '../types/prestamos';
import type { PagedResult } from '../types/compartidos';

export const loansService = {
  getAll: (page = 1, pageSize = 20) =>
    api.get<PagedResult<LoanResponse>>(`/api/Loans?page=${page}&pageSize=${pageSize}`),

  getPending: (page = 1, pageSize = 20) =>
    api.get<PagedResult<LoanResponse>>(`/api/Loans/pending?page=${page}&pageSize=${pageSize}`),

  getPaid: (page = 1, pageSize = 20) =>
    api.get<PagedResult<LoanResponse>>(`/api/Loans/paid?page=${page}&pageSize=${pageSize}`),

  getById: (id: number) =>
    api.get<LoanResponse>(`/api/Loans/${id}`),

  getTotalPending: () =>
    api.get<number>('/api/Loans/total/pending'),

  getTotalPaid: () =>
    api.get<number>('/api/Loans/total/paid'),

  getSummary: () =>
    api.get<LoanSummaryResponse>('/api/Loans/summary'),

  create: (data: CreateLoanRequest) =>
    api.post<LoanResponse>('/api/Loans', data),

  update: (id: number, data: UpdateLoanRequest) =>
    api.put<LoanResponse>(`/api/Loans/${id}`, data),

  markAsPaid: (id: number) =>
    api.patch<LoanResponse>(`/api/Loans/${id}/pay`),

  delete: (id: number) =>
    api.del(`/api/Loans/${id}`),
};
