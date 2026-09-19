# ProForm Deal Analyzer
**Live demo:** https://proform-deal-analyzer.vercel.app
A small real estate deal analyzer built with React and TypeScript. Add a property listing and instantly see its monthly mortgage, cash flow, cap rate, and cash-on-cash return. Compare deals by sorting on any metric.

## Features

- Add and remove property listings
- Automatic calculation of mortgage payment, monthly cash flow, cap rate, and cash-on-cash return
- Sort deals by cap rate, cash-on-cash return, or monthly cash flow
- Data persists between sessions via localStorage
- Unit-tested calculation logic

## Tech Stack

- React 19 + TypeScript
- Vite
- Vitest

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To run the tests:

```bash
npm test
```

## Project Structure

```
src/
  types.ts            Shared interfaces (Property, DealMetrics)
  analyzer.ts         DealAnalyzer class and sorting logic
  analyzer.test.ts    Unit tests for the calculations
  PropertyForm.tsx    Form for adding properties
  DealTable.tsx       Sortable table of analyzed deals
  App.tsx             Top-level state and layout
```

## Design Decisions

- **Logic separated from UI.** All financial calculations live in `DealAnalyzer`, a plain TypeScript class with no React dependency, which keeps it easy to test and reuse.
- **Typed data models.** Shared interfaces in `types.ts` keep components and calculations consistent.
- **Small, focused components.** Each component has a single responsibility.

## How the Metrics Work

- **Monthly mortgage:** standard 30-year fixed-rate amortization formula
- **Cap rate:** (annual rent - annual expenses) / purchase price
- **Cash-on-cash return:** annual cash flow after mortgage / down payment

## Possible Next Steps

- Backend API and database for saved portfolios
- Charts comparing deals
- Editable listings and custom loan terms
- Property tax and vacancy assumptions
