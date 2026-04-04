import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, requireAdmin } from "@/lib/api";

export async function GET() {
  try { await requireAdmin(); } catch { return apiError("Unauthorized.", 401); }
  try {
    const items = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}
