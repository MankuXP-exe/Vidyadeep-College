import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";
import { facultySchema } from "@/lib/validations";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);
  const body = await request.json().catch(() => null);
  const parsed = facultySchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid faculty data.", 422);
  const item = await prisma.facultyMember.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  await prisma.facultyMember.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

