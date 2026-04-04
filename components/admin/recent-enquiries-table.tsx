"use client";

import { useAdminTheme } from "./theme-provider";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  course: string;
  status: string;
  createdAt: string | Date;
}

export function RecentEnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const { theme } = useAdminTheme();

  return (
    <div className={`rounded-2xl border ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className={`text-[15px] font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Recent Enquiries
          </h3>
          <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            Latest student enquiry submissions
          </p>
        </div>
        <Link
          href="/admin/enquiries"
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-500 transition-colors hover:bg-indigo-500/10"
        >
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-y text-left text-xs font-medium uppercase tracking-wider ${
              theme === "dark"
                ? "border-white/[0.06] text-slate-500"
                : "border-slate-100 text-slate-400"
            }`}>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className={`px-5 py-8 text-center text-sm ${
                  theme === "dark" ? "text-slate-500" : "text-slate-400"
                }`}>
                  No enquiries yet
                </td>
              </tr>
            ) : (
              enquiries.slice(0, 5).map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className={`border-b transition-colors ${
                    theme === "dark"
                      ? "border-white/[0.03] hover:bg-white/[0.02]"
                      : "border-slate-50 hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-xs font-semibold text-indigo-400">
                        {enquiry.name[0]?.toUpperCase()}
                      </div>
                      <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {enquiry.name}
                      </span>
                    </div>
                  </td>
                  <td className={`px-5 py-3.5 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {enquiry.phone}
                  </td>
                  <td className={`px-5 py-3.5 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {enquiry.course}
                  </td>
                  <td className={`px-5 py-3.5 text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {formatDate(enquiry.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      enquiry.status === "NEW"
                        ? "bg-blue-500/15 text-blue-500"
                        : enquiry.status === "CONTACTED"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-slate-500/15 text-slate-400"
                    }`}>
                      {enquiry.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
