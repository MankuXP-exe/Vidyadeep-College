import { Badge } from "@/components/ui/badge";
import { GalleryGrid } from "@/components/gallery-grid";
import { getGallery } from "@/lib/site";

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Gallery</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Explore the campus atmosphere and visual identity of Vidyadeep</h1>
      </div>
      <GalleryGrid items={gallery} />
    </div>
  );
}
