"use client";

import { useLocale } from "next-intl";

interface BudgetBarProps {
  spent: number;   // tenths of millions
  budget: number;  // tenths of millions (1000 = 100.0M)
}

function fmt(val: number): string {
  return (val / 10).toFixed(1) + "M";
}

export function BudgetBar({ spent, budget }: BudgetBarProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const remaining = budget - spent;
  const pct = Math.min(100, Math.max(0, (spent / budget) * 100));
  const isLow = remaining < 50;

  const labels = {
    budget:    isRTL ? "الميزانية" : "Budget",
    spent:     isRTL ? "المُنفق"   : "Spent",
    remaining: isRTL ? "المتبقي"   : "Remaining",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      {/* Progress bar */}
      <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isLow ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Labels */}
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span className="text-muted-foreground">
          <span className="font-medium text-foreground">{labels.budget}:</span>{" "}
          {fmt(budget)}
        </span>
        <span className="text-muted-foreground">
          <span className="font-medium text-foreground">{labels.spent}:</span>{" "}
          {fmt(spent)}
        </span>
        <span className={isLow ? "font-semibold text-red-500" : "text-muted-foreground"}>
          <span className={`font-medium ${isLow ? "text-red-500" : "text-foreground"}`}>
            {labels.remaining}:
          </span>{" "}
          {fmt(remaining)}
        </span>
      </div>
    </div>
  );
}
