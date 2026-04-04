"use client";

import { useAdminTheme } from "./theme-provider";
import {
  UserPlus,
  BookPlus,
  Image as ImageIcon,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

interface Activity {
  id: string;
  action: string;
  details: string;
  createdAt: string | Date;
}

const actionConfig: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  ENQUIRY_NEW: { icon: UserPlus, color: "bg-emerald-500", label: "New Enquiry" },
  COURSE_CREATED: { icon: BookPlus, color: "bg-indigo-500", label: "Course Added" },
  COURSE_UPDATED: { icon: BookPlus, color: "bg-blue-500", label: "Course Updated" },
  GALLERY_UPLOADED: { icon: ImageIcon, color: "bg-purple-500", label: "Gallery Upload" },
  ENQUIRY_CONTACTED: { icon: CheckCircle, color: "bg-amber-500", label: "Enquiry Contacted" },
};

function getTimeAgo(date: string | Date) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(then);
}

const defaultActivities: Activity[] = [
  { id: "1", action: "ENQUIRY_NEW", details: "New enquiry from Priya Verma for GNM", createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: "2", action: "COURSE_UPDATED", details: "Updated Diploma in MLT curriculum", createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: "3", action: "GALLERY_UPLOADED", details: "3 new campus photos added", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: "4", action: "ENQUIRY_CONTACTED", details: "Rahul Sharma marked as contacted", createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: "5", action: "ENQUIRY_NEW", details: "New enquiry from Ankit Kumar for MLT", createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: "6", action: "COURSE_CREATED", details: "New course: Diploma in Optometry", createdAt: new Date(Date.now() - 48 * 3600000).toISOString() },
];

export function ActivityFeed({ activities }: { activities?: Activity[] }) {
  const { theme } = useAdminTheme();
  const items = activities && activities.length > 0 ? activities : defaultActivities;

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === "dark"
        ? "border-white/[0.06] bg-[#141b2d]"
        : "border-slate-200 bg-white"
    }`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className={`text-[15px] font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Recent Activity
          </h3>
          <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            Latest admin actions
          </p>
        </div>
        <span className={`rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
          theme === "dark" ? "bg-white/[0.04] text-slate-500" : "bg-slate-100 text-slate-400"
        }`}>
          Live
        </span>
      </div>
      <div className="space-y-0">
        {items.map((activity, i) => {
          const config = actionConfig[activity.action] || { icon: CheckCircle, color: "bg-slate-500", label: "Action" };
          const Icon = config.icon;
          const isLast = i === items.length - 1;

          return (
            <div key={activity.id} className="flex gap-3">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                {!isLast && (
                  <div className={`w-px flex-1 ${
                    theme === "dark" ? "bg-white/[0.06]" : "bg-slate-100"
                  }`} />
                )}
              </div>

              {/* Content */}
              <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  {activity.details}
                </p>
                <p className={`mt-1 text-xs ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                  {getTimeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
