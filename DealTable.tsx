import type { Property } from "./types";
import { sortDeals } from "./analyzer";
import type { SortKey } from "./analyzer";

interface Props {
  properties: Property[];
  sortKey: SortKey;
  onRemove: (id: string) => void;
}

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function DealTable({ properties, sortKey, onRemove }: Props) {
  const deals = sortDeals(properties, sortKey);

  if (deals.length === 0) return <p>No properties yet. Add one above.</p>;

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th align="left">Address</th>
          <th>Price</th>
          <th>Mortgage/mo</th>
          <th>Cash flow/mo</th>
          <th>Cap rate</th>
          <th>Cash-on-cash</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {deals.map(({ property: p, metrics: m }) => (
          <tr key={p.id} style={{ borderTop: "1px solid #ccc" }}>
            <td>{p.address}</td>
            <td align="center">{money(p.price)}</td>
            <td align="center">{money(m.monthlyMortgage)}</td>
            <td align="center" style={{ color: m.monthlyCashFlow >= 0 ? "green" : "crimson" }}>
              {money(m.monthlyCashFlow)}
            </td>
            <td align="center">{m.capRate.toFixed(1)}%</td>
            <td align="center">{m.cashOnCash.toFixed(1)}%</td>
            <td><button onClick={() => onRemove(p.id)}>✕</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}