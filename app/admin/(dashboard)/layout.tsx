"use client";

import { useState, type ReactNode } from "react";
import { AdminThemeProvider, useAdminTheme } from "@/components/admin/theme-provider";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

function LayoutInner({ children }: { children: ReactNode }) {
  const { theme } = useAdminTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-[#0f1729]" : "bg-[#f1f5f9]"
    }`}>
      <AdminSidebar mobileOpen={isMobileOpen} setMobileOpen={setIsMobileOpen} />
      
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      <div className="lg:ml-[260px] transition-all duration-300 relative">
        <AdminTopbar onMenuClick={() => setIsMobileOpen(true)} />
        <main className="p-4 sm:p-6 w-full overflow-x-hidden">
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
