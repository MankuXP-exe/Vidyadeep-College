import { Badge } from "@/components/ui/badge";
import { AdminApplicationsManager } from "@/components/admin-applications-manager";
import { prisma } from "@/lib/prisma";

export default async function AdminApplicationsPage() {
  const items = await prisma.application.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Applications</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Review student admission applications</h1>
      </div>
      <AdminApplicationsManager items={items} />
    </div>
  );
}
