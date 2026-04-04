import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";
import { courseSchema } from "@/lib/validations";

export async function GET() {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  try {
    const items = await prisma.course.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);
  const body = await request.json().catch(() => null);
  const parsed = courseSchema.safeParse(body);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map(i => `${i.path[0]}: ${i.message}`).join(", ");
    return apiError(`Validation failed: ${errorMsg}`, 422);
  }
  try {
    const item = await prisma.course.create({ data: parsed.data });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch (err) {
    return apiError("Database is currently unavailable. Please try again later.", 503);
  }
}
