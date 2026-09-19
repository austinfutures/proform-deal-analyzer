import type { Property, DealMetrics } from "./types";

// OOP-style class: keeps calculation logic separate from UI and easy to test
export class DealAnalyzer {
  private property: Property;

  constructor(property: Property) {
    this.property = property;
  }

  private loanAmount(): number {
    return this.property.price * (1 - this.property.downPaymentPct / 100);
  }

  private downPayment(): number {
    return this.property.price * (this.property.downPaymentPct / 100);
  }

  // Standard 30-year fixed mortgage formula
  monthlyMortgage(): number {
    const principal = this.loanAmount();
    const r = this.property.interestRate / 100 / 12;
    const n = 30 * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  analyze(): DealMetrics {
    const mortgage = this.monthlyMortgage();
    const { monthlyRent, monthlyExpenses, price } = this.property;

    const monthlyCashFlow = monthlyRent - monthlyExpenses - mortgage;
    const annualNOI = (monthlyRent - monthlyExpenses) * 12;
    const capRate = price > 0 ? (annualNOI / price) * 100 : 0;
    const down = this.downPayment();
    const cashOnCash = down > 0 ? ((monthlyCashFlow * 12) / down) * 100 : 0;

    return { monthlyMortgage: mortgage, monthlyCashFlow, capRate, cashOnCash };
  }
}

// Algorithms / data structures: sort deals by a chosen metric
export type SortKey = "capRate" | "cashOnCash" | "monthlyCashFlow";

export function sortDeals(
  properties: Property[],
  key: SortKey
): { property: Property; metrics: DealMetrics }[] {
  return properties
    .map((property) => ({ property, metrics: new DealAnalyzer(property).analyze() }))
    .sort((a, b) => b.metrics[key] - a.metrics[key]);
}
