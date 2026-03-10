import { Badge } from "@/components/ui/badge";
import { AdminCollectionManager } from "@/components/admin-collection-manager";
import { prisma } from "@/lib/prisma";
import { testimonials } from "@/lib/data";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { updatedAt: "desc" } }).catch(() => testimonials as any[]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Testimonials</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Manage student review content</h1>
      </div>
      <AdminCollectionManager
        title="Testimonial"
        endpoint="/api/admin/testimonials"
        titleKey="studentName"
        items={items}
        fields={[
          { name: "studentName", label: "Student Name" },
          { name: "course", label: "Course" },
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "rating", label: "Rating", type: "number" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />
    </div>
  );
}
