export interface Property {
  id: string;
  address: string;
  price: number;
  downPaymentPct: number;
  interestRate: number;
  monthlyRent: number;
  monthlyExpenses: number;
}

export interface DealMetrics {
  monthlyMortgage: number;
  monthlyCashFlow: number;
  capRate: number;
  cashOnCash: number;
}
