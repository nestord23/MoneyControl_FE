export type LoanStatus = 0 | 1;

export interface LoanResponse {
  id: number;
  amount: number;
  lenderName: string;
  date: string;
  status: LoanStatus;
}

export interface CreateLoanRequest {
  amount: number;
  lenderName: string;
  date: string;
}

export interface UpdateLoanRequest {
  amount: number;
  lenderName: string;
  date: string;
  status: LoanStatus;
}

export interface LoanSummaryResponse {
  totalPending: number;
  totalPaid: number;
  pendingCount: number;
  paidCount: number;
}
