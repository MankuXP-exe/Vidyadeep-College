"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAdminTheme } from "./theme-provider";
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
} from "lucide-react";

export function AdminTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useAdminTheme();
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={`
        sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6
        backdrop-blur-xl
        ${theme === "dark"
          ? "border-white/[0.06] bg-[#0f1729]/80"
          : "border-slate-200 bg-white/80"
        }
      `}
    >
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className={`lg:hidden flex items-center justify-center h-10 w-10 rounded-xl transition-colors ${
          theme === "dark" ? "text-slate-400 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
          theme === "dark" ? "text-slate-500" : "text-slate-400"
        }`} />
        <input
          type="text"
          placeholder="Search..."
          className={`
            h-10 w-full rounded-xl pl-10 pr-16 text-sm outline-none transition-all
            ${theme === "dark"
              ? "bg-white/[0.04] text-white placeholder-slate-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/40"
              : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500/40"
            }
          `}
        />
        <kbd className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
          theme === "dark"
            ? "bg-white/[0.06] text-slate-500"
            : "bg-slate-200 text-slate-500"
        }`}>
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
            theme === "dark"
              ? "text-slate-400 hover:bg-white/[0.06] hover:text-amber-400"
              : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
          }`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              theme === "dark"
                ? "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className={`absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border p-1 shadow-2xl ${
                theme === "dark"
                  ? "border-white/[0.08] bg-[#141b2d]"
                  : "border-slate-200 bg-white"
              }`}>
                <div className="px-4 py-3">
                  <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Notifications
                  </p>
                </div>
                <div className={`border-t ${theme === "dark" ? "border-white/[0.06]" : "border-slate-100"}`}>
                  {[
                    { text: "New enquiry from Rahul Sharma", time: "2 min ago", color: "bg-green-500" },
                    { text: "Course 'Diploma in MLT' updated", time: "1 hr ago", color: "bg-blue-500" },
                    { text: "New gallery image uploaded", time: "3 hrs ago", color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                        theme === "dark" ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.color}`} />
                      <div>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{item.text}</p>
                        <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className={`mx-2 h-6 w-px ${theme === "dark" ? "bg-white/[0.08]" : "bg-slate-200"}`} />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className={`flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors ${
              theme === "dark"
                ? "hover:bg-white/[0.04]"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden text-left md:block">
              <p className={`text-sm font-medium leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {session?.user?.name || "Admin"}
              </p>
              <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                Administrator
              </p>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className={`absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border p-1 shadow-2xl ${
                theme === "dark"
                  ? "border-white/[0.08] bg-[#141b2d]"
                  : "border-slate-200 bg-white"
              }`}>
                <div className={`px-3 py-2.5 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  <p className="text-sm font-medium">{session?.user?.name || "Admin"}</p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {session?.user?.email}
                  </p>
                </div>
                <div className={`my-1 border-t ${theme === "dark" ? "border-white/[0.06]" : "border-slate-100"}`} />
                <button
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 hover:bg-white/[0.04]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 hover:bg-white/[0.04]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className={`my-1 border-t ${theme === "dark" ? "border-white/[0.06]" : "border-slate-100"}`} />
                <button
                  onClick={() => signOut({ callbackUrl: "/admin" })}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-red-500 hover:bg-red-50"
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
