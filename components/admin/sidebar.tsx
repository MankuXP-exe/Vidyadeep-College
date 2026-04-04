"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Image as ImageIcon,
  MessageSquareText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAdminTheme } from "./theme-provider";

const menuGroups = [
  {
    label: "MAIN",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
    ],
  },
  {
    label: "GENERAL",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (v: boolean) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme } = useAdminTheme();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`
        fixed left-0 top-0 z-40 flex h-screen flex-col
        border-r transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${theme === "dark"
          ? "border-white/[0.06] bg-[#0c1427]"
          : "border-slate-200 bg-white"
        }
      `}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-inherit px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className={`text-[15px] font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Vidyadeep
              </span>
              <span className={`ml-1 text-xs font-normal ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                Admin
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        {menuGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    theme === "dark" ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen?.(false)}
                    title={collapsed ? item.label : undefined}
                    className={`
                      group relative flex items-center gap-3 rounded-xl px-3 py-2.5
                      text-[13px] font-medium transition-all duration-200
                      ${collapsed ? "justify-center" : ""}
                      ${isActive
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                        : theme === "dark"
                          ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full ${
                          theme === "dark"
                            ? "bg-indigo-400"
                            : "bg-indigo-600"
                        }`}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "" : "opacity-60 group-hover:opacity-100"}`} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (Desktop Only) */}
      <div className="border-t border-inherit px-3 py-2 hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex w-full items-center justify-center rounded-xl p-2.5 transition-colors ${
            theme === "dark"
              ? "text-slate-500 hover:bg-white/[0.04] hover:text-white"
              : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* User section */}
      <div className={`border-t border-inherit p-3 ${collapsed ? "flex justify-center" : ""}`}>
        <div className={`flex items-center gap-3 rounded-xl p-2 ${collapsed ? "" : ""}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
            {session?.user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden"
              >
                <p className={`truncate text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {session?.user?.name || "Admin"}
                </p>
                <p className={`truncate text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                  {session?.user?.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              onClick={() => signOut({ callbackUrl: "/admin" })}
              className={`rounded-lg p-1.5 transition-colors ${
                theme === "dark"
                  ? "text-slate-500 hover:bg-white/[0.06] hover:text-red-400"
                  : "text-slate-400 hover:bg-red-50 hover:text-red-500"
              }`}
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
