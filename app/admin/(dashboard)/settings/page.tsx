"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useAdminTheme } from "@/components/admin/theme-provider";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Palette,
  Sun,
  Moon,
  Save,
  Globe,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { theme, toggleTheme } = useAdminTheme();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "site">("profile");

  const tabs = [
    { key: "profile" as const, label: "Profile", icon: User },
    { key: "appearance" as const, label: "Appearance", icon: Palette },
    { key: "site" as const, label: "Site Settings", icon: Globe },
  ];

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
    theme === "dark"
      ? "bg-white/[0.04] text-white placeholder-slate-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/40"
      : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500/40 border border-slate-200"
  }`;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Settings
        </h1>
        <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          Manage your profile, preferences, and site configuration.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Tabs */}
        <div className={`rounded-2xl border p-2 h-fit ${
          theme === "dark" ? "border-white/[0.06] bg-[#141b2d]" : "border-slate-200 bg-white"
        }`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : theme === "dark"
                    ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={`rounded-2xl border p-6 ${
          theme === "dark" ? "border-white/[0.06] bg-[#141b2d]" : "border-slate-200 bg-white"
        }`}>
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Profile Settings
                </h2>
                <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Manage your administrator profile information.
                </p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white">
                  {session?.user?.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {session?.user?.email}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <Shield className="h-3 w-3 text-indigo-500" />
                    <span className="text-xs font-medium text-indigo-500">Administrator</span>
                  </div>
                </div>
              </div>

              <div className={`border-t ${theme === "dark" ? "border-white/[0.06]" : "border-slate-100"}`} />

              {/* Form */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Full Name
                  </label>
                  <input defaultValue={session?.user?.name || ""} className={inputClass} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Email Address
                  </label>
                  <input defaultValue={session?.user?.email || ""} className={inputClass} disabled />
                </div>
              </div>

              <div className={`border-t pt-4 ${theme === "dark" ? "border-white/[0.06]" : "border-slate-100"}`}>
                <h3 className={`mb-3 text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Change Password
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Current Password
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      New Password
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.success("Profile updated!")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Appearance
                </h2>
                <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Customize the admin dashboard appearance.
                </p>
              </div>

              <div className={`flex items-center justify-between rounded-2xl border p-5 ${
                theme === "dark" ? "border-white/[0.06] bg-white/[0.02]" : "border-slate-100 bg-slate-50"
              }`}>
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5 text-indigo-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-600" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {theme === "dark" ? "Dark Mode" : "Light Mode"}
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {theme === "dark" ? "Easy on the eyes in low light" : "Classic bright appearance"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    theme === "dark" ? "bg-indigo-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                      theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Theme Preview */}
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => { if (theme !== "light") toggleTheme(); }}
                  className={`rounded-2xl border-2 p-4 transition-all ${
                    theme === "light"
                      ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                      : theme === "dark"
                        ? "border-white/[0.06] hover:border-white/[0.15]"
                        : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="rounded-xl bg-[#f1f5f9] p-3">
                    <div className="mb-2 h-3 w-16 rounded bg-slate-300" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-2 w-3/4 rounded bg-slate-200" />
                    </div>
                  </div>
                  <p className={`mt-3 text-center text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    Light
                  </p>
                </button>
                <button
                  onClick={() => { if (theme !== "dark") toggleTheme(); }}
                  className={`rounded-2xl border-2 p-4 transition-all ${
                    theme !== "light"
                      ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="rounded-xl bg-[#0f1729] p-3">
                    <div className="mb-2 h-3 w-16 rounded bg-white/10" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-white/5" />
                      <div className="h-2 w-3/4 rounded bg-white/5" />
                    </div>
                  </div>
                  <p className={`mt-3 text-center text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    Dark
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === "site" && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Site Settings
                </h2>
                <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Configure public website content and information.
                </p>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Institute Name
                  </label>
                  <input defaultValue="Vidyadeep Paramedical Institute" className={inputClass} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Tagline
                  </label>
                  <input defaultValue="Premium Medical Education in Gurugram" className={inputClass} />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Phone 1
                    </label>
                    <input defaultValue="9992101666" className={inputClass} />
                  </div>
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Phone 2
                    </label>
                    <input defaultValue="7988348872" className={inputClass} />
                  </div>
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Phone 3
                    </label>
                    <input defaultValue="07056098341" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Near Civil Hospital, Opp Nayara Petrol Pump, Haily Mandi Road, Farrukhnagar, Gurugram, Haryana"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      YouTube URL
                    </label>
                    <input defaultValue="https://youtube.com/@vidyadeepparamedicalcollege" className={inputClass} />
                  </div>
                  <div>
                    <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Instagram URL
                    </label>
                    <input defaultValue="https://www.instagram.com/vidyadeepparamedicalinstitute/" className={inputClass} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.success("Site settings saved!")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
              >
                <Save className="h-4 w-4" />
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
