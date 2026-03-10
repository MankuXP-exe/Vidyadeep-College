import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, sameOrigin, apiError } from "@/lib/api";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);
  const body = await request.json().catch(() => null);
  const item = await prisma.application.update({ where: { id: params.id }, data: { status: body?.status || "NEW" } });
  return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  await prisma.application.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

