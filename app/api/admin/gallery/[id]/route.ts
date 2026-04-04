import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin } from "@/lib/api";

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  try {
    // Try to get the item first to clean up Cloudinary
    const item = await prisma.galleryImage.findUnique({ where: { id: params.id } });
    if (item && (item as any).cloudinaryId) {
      try {
        const { deleteFromCloudinary } = await import("@/lib/cloudinary");
        await deleteFromCloudinary((item as any).cloudinaryId);
      } catch { /* ignore cloudinary errors */ }
    }
    await prisma.galleryImage.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Database is currently unavailable.", 503);
  }
}
