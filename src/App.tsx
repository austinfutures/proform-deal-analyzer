import { useEffect, useState } from "react";
import type { Property } from "./types";
import type { SortKey } from "./analyzer";
import PropertyForm from "./PropertyForm";
import DealTable from "./DealTable";

const STORAGE_KEY = "property-deal-analyzer";

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [sortKey, setSortKey] = useState<SortKey>("capRate");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }, [properties]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1>Property Deal Analyzer</h1>
      <PropertyForm onAdd={(p) => setProperties([...properties, p])} />

      <h2>Deals</h2>
      <label>
        Sort by:{" "}
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
          <option value="capRate">Cap rate</option>
          <option value="cashOnCash">Cash-on-cash</option>
          <option value="monthlyCashFlow">Monthly cash flow</option>
        </select>
      </label>
      <DealTable
        properties={properties}
        sortKey={sortKey}
        onRemove={(id) => setProperties(properties.filter((p) => p.id !== id))}
      />
    </div>
  );
}
