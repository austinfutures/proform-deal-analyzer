import { useState } from "react";
import type { Property } from "./types";

interface Props {
  onAdd: (p: Property) => void;
}

const empty = {
  address: "",
  price: 300000,
  downPaymentPct: 20,
  interestRate: 6.5,
  monthlyRent: 2500,
  monthlyExpenses: 600,
};

export default function PropertyForm({ onAdd }: Props) {
  const [form, setForm] = useState(empty);

  const setNum = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: Number(e.target.value) });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address.trim()) return;
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm(empty);
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <label>Price <input type="number" value={form.price} onChange={setNum("price")} /></label>
      <label>Down payment % <input type="number" value={form.downPaymentPct} onChange={setNum("downPaymentPct")} /></label>
      <label>Interest rate % <input type="number" step="0.1" value={form.interestRate} onChange={setNum("interestRate")} /></label>
      <label>Monthly rent <input type="number" value={form.monthlyRent} onChange={setNum("monthlyRent")} /></label>
      <label>Monthly expenses <input type="number" value={form.monthlyExpenses} onChange={setNum("monthlyExpenses")} /></label>
      <button type="submit">Add property</button>
    </form>
  );
}
