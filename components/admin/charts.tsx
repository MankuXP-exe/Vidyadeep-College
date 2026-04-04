"use client";

import { useAdminTheme } from "./theme-provider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const enquiryData = [
  { month: "Jan", enquiries: 0 },
  { month: "Feb", enquiries: 0 },
  { month: "Mar", enquiries: 0 },
  { month: "Apr", enquiries: 0 },
  { month: "May", enquiries: 0 },
  { month: "Jun", enquiries: 0 },
  { month: "Jul", enquiries: 0 },
  { month: "Aug", enquiries: 0 },
  { month: "Sep", enquiries: 0 },
  { month: "Oct", enquiries: 0 },
  { month: "Nov", enquiries: 0 },
  { month: "Dec", enquiries: 0 },
];

const courseDistribution = [
  { name: "Diploma in MLT", value: 0, color: "#6366f1" },
  { name: "Diploma in GNM", value: 0, color: "#8b5cf6" },
  { name: "Diploma in ANM", value: 0, color: "#a855f7" },
  { name: "Diploma in Physiotherapy", value: 0, color: "#06b6d4" },
  { name: "CMS & ED", value: 0, color: "#10b981" },
  { name: "Homeopathy Pharmacy", value: 0, color: "#f59e0b" },
];

const revenueData = [
  { month: "Jan", revenue: 0, expenses: 0 },
  { month: "Feb", revenue: 0, expenses: 0 },
  { month: "Mar", revenue: 0, expenses: 0 },
  { month: "Apr", revenue: 0, expenses: 0 },
  { month: "May", revenue: 0, expenses: 0 },
  { month: "Jun", revenue: 0, expenses: 0 },
  { month: "Jul", revenue: 0, expenses: 0 },
  { month: "Aug", revenue: 0, expenses: 0 },
  { month: "Sep", revenue: 0, expenses: 0 },
  { month: "Oct", revenue: 0, expenses: 0 },
  { month: "Nov", revenue: 0, expenses: 0 },
  { month: "Dec", revenue: 0, expenses: 0 },
];

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#141b2d] px-4 py-3 shadow-2xl">
      <p className="mb-1.5 text-xs font-medium text-slate-400">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}
        </p>
      ))}
    </div>
  );
}

export function EnquiriesChart({ data }: { data?: typeof enquiryData }) {
  const { theme } = useAdminTheme();
  const chartData = data || enquiryData;

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className={`text-[15px] font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Enquiries Overview
          </h3>
          <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            Monthly enquiry trends
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Enquiries</span>
          </span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="enquiryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme === "dark" ? "#64748b" : "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme === "dark" ? "#64748b" : "#94a3b8" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="enquiries"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#enquiryGradient)"
              name="Enquiries"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RevenueChart({ data }: { data?: typeof revenueData }) {
  const { theme } = useAdminTheme();
  const chartData = data || revenueData;

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className={`text-[15px] font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Revenue Analytics
          </h3>
          <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            Revenue vs expenses over time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Revenue</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Expenses</span>
          </span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme === "dark" ? "#64748b" : "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme === "dark" ? "#64748b" : "#94a3b8" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} name="Revenue" barSize={14} />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Expenses" barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CourseDistributionChart({ data }: { data?: typeof courseDistribution }) {
  const { theme } = useAdminTheme();
  const chartData = data || courseDistribution;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      <div className="mb-4">
        <h3 className={`text-[15px] font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Course Distribution
        </h3>
        <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
          Enquiries by course program
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{total}</span>
            <span className={`text-[10px] ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Total</span>
          </div>
        </div>
        <div className="flex-1 space-y-2.5">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {item.name.replace("Diploma in ", "")}
                </span>
              </div>
              <span className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
