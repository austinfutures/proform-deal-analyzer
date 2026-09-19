import { describe, it, expect } from "vitest";
import { DealAnalyzer, sortDeals } from "./analyzer";
import type { Property } from "./types";

const base: Property = {
  id: "1",
  address: "123 Main St",
  price: 300000,
  downPaymentPct: 20,
  interestRate: 6,
  monthlyRent: 2500,
  monthlyExpenses: 600,
};

describe("DealAnalyzer", () => {
  it("calculates mortgage correctly", () => {
    const m = new DealAnalyzer(base).monthlyMortgage();
    expect(m).toBeCloseTo(1438.92, 1);
  });

  it("calculates cap rate", () => {
    const { capRate } = new DealAnalyzer(base).analyze();
    expect(capRate).toBeCloseTo(7.6, 1);
  });

  it("handles zero interest without crashing", () => {
    const m = new DealAnalyzer({ ...base, interestRate: 0 }).monthlyMortgage();
    expect(m).toBeGreaterThan(0);
  });
});

describe("sortDeals", () => {
  it("sorts best cap rate first", () => {
    const better = { ...base, id: "2", monthlyRent: 3500 };
    const sorted = sortDeals([base, better], "capRate");
    expect(sorted[0].property.id).toBe("2");
  });
});
