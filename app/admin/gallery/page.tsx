import { Badge } from "@/components/ui/badge";
import { AdminGalleryManager } from "@/components/admin-gallery-manager";
import { prisma } from "@/lib/prisma";
import { gallerySeed } from "@/lib/data";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } }).catch(() => gallerySeed as any[]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Gallery</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Upload and curate gallery visuals</h1>
      </div>
      <AdminGalleryManager items={items} />
    </div>
  );
}
