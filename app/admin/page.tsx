import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "ADMIN") {
    redirect("/admin/courses");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-slate-950">Admin Dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Secure login for managing courses, faculty, admissions, gallery, testimonials, and website content.</p>
        </div>
        <AdminLoginForm />
        <Link href="/" className="mt-6 inline-block text-sm text-primary">Return to website</Link>
      </Card>
    </div>
  );
}
