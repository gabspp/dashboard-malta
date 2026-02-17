
export interface CashFlowEntry {
  date: string;
  day: string;
  restaurant: string;
  inflow: number;
  outflow: number;
  balance: number;
}

export interface AccountsPayable {
  restaurant: string;
  realizedUntilNov23: number;
  forecastJanuary: number;
  remainingToPay: number;
}

export interface DashboardSummary {
  totalBalance: number;
  totalForecast: number;
  totalRealized: number;
  weeklyInflow: number;
  weeklyOutflow: number;
}
