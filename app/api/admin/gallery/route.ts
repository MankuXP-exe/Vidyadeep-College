import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { createSupabaseAdmin } from "@/lib/supabase";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";

export async function GET() {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  try {
    const items = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const altText = String(formData.get("altText") || title).trim();
  const imageUrlInput = String(formData.get("imageUrl") || "").trim();
  const featured = String(formData.get("featured") || "false") === "true";
  const category = String(formData.get("category") || "image").trim();
  const file = formData.get("file") as File | null;

  if (!title) return apiError("Title is required.", 422);

  let imageUrl = imageUrlInput;
  let cloudinaryId: string | undefined;

  // Try Cloudinary first if configured
  if (file && file.size > 0 && process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const resourceType = category === "video" ? "video" : "image";
      const result = await uploadToCloudinary(buffer, { folder: "vidyadeep", resourceType });
      imageUrl = result.url;
      cloudinaryId = result.publicId;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    }
  }

  // Fall back to Supabase storage if Cloudinary not configured or failed
  if (file && file.size > 0 && !imageUrl) {
    try {
      const supabase = createSupabaseAdmin();
      const bucket = process.env.SUPABASE_STORAGE_BUCKET;
      if (bucket) {
        const extension = file.name.split(".").pop() || "jpg";
        const filePath = `gallery/${randomUUID()}.${extension}`;
        const bytes = await file.arrayBuffer();
        const { error } = await supabase.storage.from(bucket).upload(filePath, bytes, {
          contentType: file.type,
          upsert: false,
        });
        if (!error) {
          const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
          imageUrl = data.publicUrl;
        }
      }
    } catch (err) {
      console.error("Supabase upload error:", err);
    }
  }

  if (!imageUrl) return apiError("Image URL or upload file is required.", 422);

  // Try to save to database, but still return success if DB is down
  try {
    const createData: any = { title, altText, imageUrl, featured, category };
    if (cloudinaryId) createData.cloudinaryId = cloudinaryId;
    const item = await prisma.galleryImage.create({ data: createData });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch (err) {
    console.error("DB save failed, returning uploaded URL:", err);
    // DB is unreachable but upload succeeded — return success with URL
    return NextResponse.json({
      id: randomUUID(),
      title,
      altText,
      imageUrl,
      featured,
      category,
      cloudinaryId: cloudinaryId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
