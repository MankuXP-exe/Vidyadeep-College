"use client";

import { useAdminTheme } from "./theme-provider";

function Shimmer({ className }: { className?: string }) {
  const { theme } = useAdminTheme();
  return (
    <div
      className={`animate-pulse rounded-xl ${
        theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200/60"
      } ${className}`}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <Shimmer className="h-3 w-20" />
      <Shimmer className="h-8 w-28" />
      <Shimmer className="h-4 w-16" />
    </div>
  );
}

export function ChartSkeleton() {
  const { theme } = useAdminTheme();
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#141b2d] p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="h-4 w-36" />
          <Shimmer className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 px-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-full animate-pulse rounded-xl ${
              theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200/60"
            }`}
            style={{ height: `${60 + (i * 17) % 120}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#141b2d] p-5">
      <div className="mb-4 space-y-2">
        <Shimmer className="h-4 w-36" />
        <Shimmer className="h-3 w-48" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Shimmer className="h-8 w-8 rounded-full" />
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Shimmer className="h-8 w-48" />
        <Shimmer className="h-4 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <ChartSkeleton />
        <TableSkeleton rows={4} />
      </div>
    </div>
  );
}
