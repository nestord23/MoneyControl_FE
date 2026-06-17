export type ExpenseType = 0 | 1;

export interface ExpenseResponse {
  id: number;
  amount: number;
  date: string;
  description: string | null;
  type: ExpenseType;
  categoryId: number;
  categoryName: string;
}

export interface CreateExpenseRequest {
  amount: number;
  date: string;
  description?: string | null;
  type: ExpenseType;
  categoryId: number;
}

export interface UpdateExpenseRequest {
  amount: number;
  date: string;
  description?: string | null;
  type: ExpenseType;
  categoryId: number;
}

export interface ExpenseSummaryResponse {
  totalByDay: number;
  totalByWeek: number;
  totalByMonth: number;
  totalByYear: number;
  totalFixed: number;
  totalVariable: number;
}
