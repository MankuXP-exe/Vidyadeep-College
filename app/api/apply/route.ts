import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applySchema } from "@/lib/validations";
import { apiError, getClientIp, sameOrigin } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return apiError("Invalid origin.", 403);
  }

  const limiter = rateLimit(`apply:${getClientIp(request)}`, 5, 60000);
  if (!limiter.success) {
    return apiError("Too many requests. Please try again shortly.", 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = applySchema.safeParse(body);

  if (!parsed.success) {
    return apiError("Invalid application data.", 422);
  }

  const sanitized = {
    ...parsed.data,
    message: parsed.data.message?.replace(/[<>]/g, ""),
  };

  const application = await prisma.application.create({ data: sanitized }).catch(() => null);

  if (!application) {
    return apiError("Unable to save application.", 500);
  }

  return NextResponse.json({ success: true, applicationId: application.id });
}
