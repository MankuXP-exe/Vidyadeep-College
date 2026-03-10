import { Badge } from "@/components/ui/badge";
import { AdminCollectionManager } from "@/components/admin-collection-manager";
import { prisma } from "@/lib/prisma";
import { facultyMembers } from "@/lib/data";

export default async function AdminFacultyPage() {
  const items = await prisma.facultyMember.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => facultyMembers as any[]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Faculty</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Manage faculty profiles</h1>
      </div>
      <AdminCollectionManager
        title="Faculty Member"
        endpoint="/api/admin/faculty"
        titleKey="name"
        items={items}
        fields={[
          { name: "name", label: "Name" },
          { name: "slug", label: "Slug" },
          { name: "designation", label: "Designation" },
          { name: "qualifications", label: "Qualifications" },
          { name: "bio", label: "Bio", type: "textarea" },
          { name: "image", label: "Photo URL" },
          { name: "sortOrder", label: "Sort Order", type: "number" },
        ]}
      />
    </div>
  );
}
