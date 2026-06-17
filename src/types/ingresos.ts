export interface IncomeResponse {
  id: number;
  amount: number;
  date: string;
  description: string | null;
}

export interface CreateIncomeRequest {
  amount: number;
  date: string;
  description?: string | null;
}

export interface UpdateIncomeRequest {
  amount: number;
  date: string;
  description?: string | null;
}

export interface IncomeSummaryResponse {
  totalByDay: number;
  totalByWeek: number;
  totalByMonth: number;
  totalByYear: number;
}
