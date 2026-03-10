import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AdminCollectionManager } from "@/components/admin-collection-manager";
import { prisma } from "@/lib/prisma";
import { defaultCourses } from "@/lib/data";

export default async function AdminCoursesPage() {
  const items = await prisma.course.findMany({ orderBy: { updatedAt: "desc" } }).catch(() => defaultCourses as any[]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Courses</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Manage course catalog</h1>
      </div>
      <AdminCollectionManager
        title="Course"
        endpoint="/api/admin/courses"
        titleKey="title"
        items={items}
        fields={[
          { name: "slug", label: "Slug" },
          { name: "title", label: "Title" },
          { name: "category", label: "Category" },
          { name: "shortDesc", label: "Short Description", type: "textarea" },
          { name: "overview", label: "Overview", type: "textarea" },
          { name: "eligibility", label: "Eligibility" },
          { name: "duration", label: "Duration" },
          { name: "careers", label: "Career Opportunities", type: "textarea" },
          { name: "icon", label: "Icon" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />
    </div>
  );
}
