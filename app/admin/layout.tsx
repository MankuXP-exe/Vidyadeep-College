import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminSignOutButton } from "@/components/admin-signout-button";

const links = [
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/faculty", label: "Faculty" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/content", label: "Content" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#eef3ff]">
      <div className="container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[32px] border border-white/40 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-primary">Admin Panel</div>
            <h2 className="mt-3 font-display text-3xl text-slate-950">Vidyadeep CMS</h2>
            <p className="mt-2 text-sm text-slate-600">Signed in as {session.user.email}</p>
          </div>
          <nav className="mt-8 space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary/10 hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <AdminSignOutButton />
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
