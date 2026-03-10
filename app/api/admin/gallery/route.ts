import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { createSupabaseAdmin } from "@/lib/supabase";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";

export async function GET() {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  const items = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const altText = String(formData.get("altText") || "").trim();
  const imageUrlInput = String(formData.get("imageUrl") || "").trim();
  const featured = String(formData.get("featured") || "false") === "true";
  const file = formData.get("file") as File | null;

  if (!title || !altText) return apiError("Title and alt text are required.", 422);

  let imageUrl = imageUrlInput;

  if (file && file.size > 0) {
    const supabase = createSupabaseAdmin();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET;
    if (!bucket) return apiError("Storage bucket is not configured.", 500);

    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `gallery/${randomUUID()}.${extension}`;
    const bytes = await file.arrayBuffer();

    const { error } = await supabase.storage.from(bucket).upload(filePath, bytes, {
      contentType: file.type,
      upsert: false,
    });

    if (error) return apiError(error.message, 500);

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    imageUrl = data.publicUrl;
  }

  if (!imageUrl) return apiError("Image URL or upload file is required.", 422);

  const item = await prisma.galleryImage.create({ data: { title, altText, imageUrl, featured } });
  return NextResponse.json(item);
}
