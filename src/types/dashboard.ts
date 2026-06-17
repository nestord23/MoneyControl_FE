export interface ExpenseResponse {
  id: number;
  amount: number;
  date: string;
  description: string | null;
  type: 0 | 1;
  categoryId: number;
  categoryName: string;
}

export interface IncomeResponse {
  id: number;
  amount: number;
  date: string;
  description: string | null;
}

export interface DashboardData {
  balance: number;
  incomesTotalYear: number;
  expensesTotalYear: number;
  incomesTotalMonth: number;
  expensesTotalMonth: number;
  loansTotalPending: number;
  incomesMonthlyTotals: number[];
  expensesMonthlyTotals: number[];
  recentExpenses: ExpenseResponse[];
  recentIncomes: IncomeResponse[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
}
