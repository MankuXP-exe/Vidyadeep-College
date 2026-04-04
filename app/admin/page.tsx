import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin-login-form";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c1427] p-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Vidyadeep Admin</h1>
          <p className="mt-1.5 text-sm text-slate-400">Sign in to manage your institute</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141b2d]/80 p-8 shadow-2xl backdrop-blur-xl">
          <AdminLoginForm />
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to website
        </Link>
      </div>
    </div>
  );
}
