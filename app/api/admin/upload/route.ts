import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, apiError } from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return apiError("Unauthorized", 401);
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "vidyadeep";
    const resourceType = ((formData.get("resourceType") as string) || "image") as "image" | "video";

    if (!file) {
      return apiError("No file provided", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToCloudinary(buffer, { folder, resourceType });

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return apiError("Upload failed", 500);
  }
}
