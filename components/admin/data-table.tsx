"use client";

import { useState, useMemo } from "react";
import { useAdminTheme } from "./theme-provider";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  headerActions?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 10,
  actions,
  emptyMessage = "No data found",
  headerActions,
}: DataTableProps<T>) {
  const { theme } = useAdminTheme();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKey) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        String(item[searchKey] || "").toLowerCase().includes(q) ||
        Object.values(item).some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
        const comp = String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? comp : -comp;
      });
    }
    return result;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className={`rounded-2xl border ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      {/* Header */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        {searchKey && (
          <div className="relative max-w-xs flex-1">
            <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              theme === "dark" ? "text-slate-500" : "text-slate-400"
            }`} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className={`h-9 w-full rounded-xl pl-10 pr-4 text-sm outline-none transition-all ${
                theme === "dark"
                  ? "bg-white/[0.04] text-white placeholder-slate-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/40"
                  : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500/40"
              }`}
            />
          </div>
        )}
        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-y text-left text-xs font-medium uppercase tracking-wider ${
              theme === "dark"
                ? "border-white/[0.06] text-slate-500"
                : "border-slate-100 text-slate-400"
            }`}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={`px-5 py-3 ${col.sortable ? "cursor-pointer select-none hover:text-white" : ""} ${col.className || ""}`}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-indigo-400">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </span>
                </th>
              ))}
              {actions && <th className="px-5 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className={`px-5 py-12 text-center text-sm ${
                    theme === "dark" ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((item, i) => (
                <tr
                  key={item.id || i}
                  className={`border-b transition-colors ${
                    theme === "dark"
                      ? "border-white/[0.03] hover:bg-white/[0.02]"
                      : "border-slate-50 hover:bg-slate-50/50"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3.5 text-sm ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    } ${col.className || ""}`}>
                      {col.render ? col.render(item) : String(item[col.key] ?? "")}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-3.5 text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between border-t px-5 py-3 ${
          theme === "dark" ? "border-white/[0.06]" : "border-slate-100"
        }`}>
          <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
                theme === "dark" ? "text-slate-400 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
                theme === "dark" ? "text-slate-400 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let num: number;
              if (totalPages <= 5) {
                num = i + 1;
              } else if (page <= 3) {
                num = i + 1;
              } else if (page >= totalPages - 2) {
                num = totalPages - 4 + i;
              } else {
                num = page - 2 + i;
              }
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                    page === num
                      ? "bg-indigo-500 text-white"
                      : theme === "dark"
                        ? "text-slate-400 hover:bg-white/[0.06]"
                        : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {num}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
                theme === "dark" ? "text-slate-400 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
                theme === "dark" ? "text-slate-400 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
