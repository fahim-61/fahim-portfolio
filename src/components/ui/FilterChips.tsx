"use client";

import React from "react";
import { cn } from "./Button";

interface FilterChipsProps {
  categories: string[];
  counts: Record<string, number>;
  total: number;
  active: string;
  onChange: (category: string) => void;
}

const FilterChips = ({ categories, counts, total, active, onChange }: FilterChipsProps) => {
  const all = ["All", ...categories.filter((c) => (counts[c] ?? 0) > 0)];
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {all.map((cat) => {
        const isActive = active === cat;
        const count = cat === "All" ? total : counts[cat];
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer",
              isActive
                ? "bg-[#00f0ff] border-[#00f0ff] text-[#0a0f1d] font-semibold shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                : "bg-[#0a0f1d] border-[#334155] text-[#cbd5e1] hover:border-[#00f0ff]/60 hover:text-[#00f0ff]"
            )}
          >
            {cat}
            <span className={cn("font-mono text-xs", isActive ? "text-[#0a0f1d]/70" : "text-[#64748b]")}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
