"use client";

import { useSession } from "next-auth/react";
import { useAdminTheme } from "@/components/admin/theme-provider";
import { StatsCard } from "@/components/admin/stats-card";
import { EnquiriesChart, RevenueChart, CourseDistributionChart } from "@/components/admin/charts";
import { RecentEnquiriesTable } from "@/components/admin/recent-enquiries-table";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { BookOpen, MessageSquareText, Image as ImageIcon, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardClientProps {
  stats: {
    courses: number;
    enquiries: number;
    gallery: number;
    conversion: number;
  };
  recentEnquiries: any[];
  activities: any[];
}

export function DashboardClient({ stats, recentEnquiries, activities }: DashboardClientProps) {
  const { theme } = useAdminTheme();
  const { data: session } = useSession();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          {greeting()}, {session?.user?.name || "Admin"} 👋
        </h1>
        <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          Here&apos;s what&apos;s happening with your institute today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Courses"
          value={stats.courses}
          change="+2"
          changeType="up"
          subtitle="this month"
          icon={BookOpen}
          color="indigo"
          index={0}
        />
        <StatsCard
          title="Total Enquiries"
          value={stats.enquiries}
          change="+12%"
          changeType="up"
          subtitle="vs last month"
          icon={MessageSquareText}
          color="emerald"
          index={1}
        />
        <StatsCard
          title="Gallery Items"
          value={stats.gallery}
          change="+5"
          changeType="up"
          subtitle="this month"
          icon={ImageIcon}
          color="purple"
          index={2}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversion}%`}
          change="+3.2%"
          changeType="up"
          subtitle="contacted"
          icon={TrendingUp}
          color="amber"
          index={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <EnquiriesChart />
        <CourseDistributionChart />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Bottom Row */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <RecentEnquiriesTable enquiries={recentEnquiries} />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}
