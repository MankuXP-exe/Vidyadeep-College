"use client";

import type { ReactNode } from "react";
import { AdminThemeProvider, useAdminTheme } from "@/components/admin/theme-provider";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

function LayoutInner({ children }: { children: ReactNode }) {
  const { theme } = useAdminTheme();

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-[#0f1729]" : "bg-[#f1f5f9]"
    }`}>
      <AdminSidebar />
      <div className="ml-[260px] transition-all duration-300">
        <AdminTopbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminThemeProvider>
      <LayoutInner>{children}</LayoutInner>
    </AdminThemeProvider>
  );
}
