import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";
import { courseSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);
  const body = await request.json().catch(() => null);
  const parsed = courseSchema.safeParse(body);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map(i => `${i.path[0]}: ${i.message}`).join(", ");
    return apiError(`Validation failed: ${errorMsg}`, 422);
  }
  try {
    const item = await prisma.course.update({ where: { id: params.id }, data: parsed.data });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch {
    return apiError("Database is currently unavailable.", 503);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  try {
    await prisma.course.delete({ where: { id: params.id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Database is currently unavailable.", 503);
  }
}
