import { prisma } from "@/lib/prisma";
import { GalleryClient } from "./gallery-client";

export default async function AdminGalleryPage() {
  let items: any[] = [];
  try {
    items = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    items = [];
  }

  return <GalleryClient items={JSON.parse(JSON.stringify(items))} />;
}
