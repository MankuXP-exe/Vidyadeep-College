import { Badge } from "@/components/ui/badge";
import { AdminCollectionManager } from "@/components/admin-collection-manager";
import { prisma } from "@/lib/prisma";
import { siteContentSeed } from "@/lib/data";

export default async function AdminContentPage() {
  const items = await prisma.siteContent.findMany({ orderBy: { section: "asc" } }).catch(() => siteContentSeed as any[]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Content</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Edit website content blocks</h1>
      </div>
      <AdminCollectionManager
        title="Content Block"
        endpoint="/api/admin/content"
        titleKey="title"
        items={items}
        fields={[
          { name: "section", label: "Section Key" },
          { name: "title", label: "Title" },
          { name: "body", label: "Body", type: "textarea" },
        ]}
      />
    </div>
  );
}
