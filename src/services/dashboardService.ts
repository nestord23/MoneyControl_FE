import { api } from './api';
import type { DashboardData } from '../types/dashboard';

export const dashboardService = {
  getData: (year: number) =>
    api.get<DashboardData>(`/api/Dashboard?year=${year}`),
};
