import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin, sameOrigin } from "@/lib/api";
import { facultySchema } from "@/lib/validations";

export async function GET() {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  const items = await prisma.facultyMember.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  if (!sameOrigin(request)) return apiError("Invalid origin.", 403);
  const body = await request.json().catch(() => null);
  const parsed = facultySchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid faculty data.", 422);
  const item = await prisma.facultyMember.create({ data: parsed.data });
  return NextResponse.json(item);
}

