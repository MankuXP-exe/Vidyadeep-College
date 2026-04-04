"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAdminTheme } from "@/components/admin/theme-provider";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDelete } from "@/components/admin/modal-form";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Trash2,
  CheckCircle,
  Clock,
  MessageSquareText,
  Phone,
  Mail,
} from "lucide-react";

export function EnquiriesClient({ enquiries: initialEnquiries }: { enquiries: any[] }) {
  const [enquiriesList, setEnquiriesList] = useState(initialEnquiries);
  const { theme } = useAdminTheme();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all"
    ? enquiriesList
    : enquiriesList.filter((e: any) => e.status === statusFilter);

  async function toggleStatus(id: string, currentStatus: string) {
    try {
      const newStatus = currentStatus === "NEW" ? "CONTACTED" : "NEW";
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Status updated to ${newStatus}`);
      setEnquiriesList((prev) => prev.map((e: any) => e.id === id ? { ...e, status: newStatus } : e));
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Enquiry deleted!");
      setEnquiriesList((prev) => prev.filter((e: any) => e.id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  const statusCounts = {
    all: enquiriesList.length,
    NEW: enquiriesList.filter((e: any) => e.status === "NEW").length,
    CONTACTED: enquiriesList.filter((e: any) => e.status === "CONTACTED").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Enquiries
        </h1>
        <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          Manage student enquiries and form submissions.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total", value: statusCounts.all, color: "indigo" },
          { label: "New", value: statusCounts.NEW, color: "blue" },
          { label: "Contacted", value: statusCounts.CONTACTED, color: "emerald" },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border p-4 ${
              theme === "dark" ? "border-white/[0.06] bg-[#141b2d]" : "border-slate-200 bg-white"
            }`}
          >
            <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              {s.label}
            </p>
            <p className={`mt-1 text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1">
        {(["all", "NEW", "CONTACTED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              statusFilter === f
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                : theme === "dark"
                  ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {f === "all" ? "All" : f === "NEW" ? "New" : "Contacted"}
            <span className={`rounded-md px-1.5 py-0.5 text-xs ${
              statusFilter === f
                ? "bg-white/20"
                : theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200"
            }`}>
              {statusCounts[f as keyof typeof statusCounts]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        data={filtered}
        searchKey="name"
        searchPlaceholder="Search by name, phone, or course..."
        columns={[
          {
            key: "name",
            label: "Student",
            sortable: true,
            render: (item) => (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-xs font-semibold text-indigo-400">
                  {item.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {item.name}
                  </p>
                  <p className={`flex items-center gap-1 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    <Mail className="h-3 w-3" />
                    {item.email}
                  </p>
                </div>
              </div>
            ),
          },
          {
            key: "phone",
            label: "Phone",
            render: (item) => (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                {item.phone}
              </span>
            ),
          },
          {
            key: "course",
            label: "Course",
            sortable: true,
          },
          {
            key: "message",
            label: "Message",
            render: (item) => (
              <p className="max-w-[200px] truncate" title={item.message}>
                {item.message || "—"}
              </p>
            ),
          },
          {
            key: "createdAt",
            label: "Date",
            sortable: true,
            render: (item) => formatDate(item.createdAt),
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                item.status === "NEW"
                  ? "bg-blue-500/15 text-blue-500"
                  : "bg-emerald-500/15 text-emerald-500"
              }`}>
                {item.status === "NEW" ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                {item.status}
              </span>
            ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => toggleStatus(item.id, item.status)}
              title={item.status === "NEW" ? "Mark as contacted" : "Mark as new"}
              className={`rounded-lg p-2 transition-colors ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                  : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeleteId(item.id)}
              className={`rounded-lg p-2 transition-colors ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  : "text-slate-400 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      <ConfirmDelete
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={loading}
        title="Delete Enquiry?"
        message="This will permanently remove the enquiry record."
      />
    </div>
  );
}
