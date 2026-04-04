"use client";

import { useAdminTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  subtitle?: string;
  icon: LucideIcon;
  color: "indigo" | "emerald" | "amber" | "rose" | "purple" | "cyan";
  index?: number;
}

const colorMap = {
  indigo: {
    dark: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20",
    light: "from-indigo-50 to-indigo-100/50 border-indigo-200/60",
    icon: "bg-indigo-500/15 text-indigo-500",
    iconLight: "bg-indigo-100 text-indigo-600",
  },
  emerald: {
    dark: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    light: "from-emerald-50 to-emerald-100/50 border-emerald-200/60",
    icon: "bg-emerald-500/15 text-emerald-500",
    iconLight: "bg-emerald-100 text-emerald-600",
  },
  amber: {
    dark: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    light: "from-amber-50 to-amber-100/50 border-amber-200/60",
    icon: "bg-amber-500/15 text-amber-500",
    iconLight: "bg-amber-100 text-amber-600",
  },
  rose: {
    dark: "from-rose-500/20 to-rose-600/5 border-rose-500/20",
    light: "from-rose-50 to-rose-100/50 border-rose-200/60",
    icon: "bg-rose-500/15 text-rose-500",
    iconLight: "bg-rose-100 text-rose-600",
  },
  purple: {
    dark: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    light: "from-purple-50 to-purple-100/50 border-purple-200/60",
    icon: "bg-purple-500/15 text-purple-500",
    iconLight: "bg-purple-100 text-purple-600",
  },
  cyan: {
    dark: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20",
    light: "from-cyan-50 to-cyan-100/50 border-cyan-200/60",
    icon: "bg-cyan-500/15 text-cyan-500",
    iconLight: "bg-cyan-100 text-cyan-600",
  },
};

export function StatsCard({ title, value, change, changeType = "up", subtitle, icon: Icon, color, index = 0 }: StatsCardProps) {
  const { theme } = useAdminTheme();
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={`
        relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5
        ${theme === "dark" ? colors.dark : colors.light}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className={`text-[13px] font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {value}
          </p>
          <div className="flex items-center gap-2">
            {change && (
              <span className={`flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-xs font-semibold ${
                changeType === "up"
                  ? "bg-emerald-500/15 text-emerald-500"
                  : changeType === "down"
                    ? "bg-red-500/15 text-red-500"
                    : theme === "dark" ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500"
              }`}>
                {changeType === "up" ? <TrendingUp className="h-3 w-3" /> : changeType === "down" ? <TrendingDown className="h-3 w-3" /> : null}
                {change}
              </span>
            )}
            {subtitle && (
              <span className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>{subtitle}</span>
            )}
          </div>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          theme === "dark" ? colors.icon : colors.iconLight
        }`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Decorative gradient ball */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/[0.04] to-transparent" />
    </motion.div>
  );
}
