import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { defaultCourses } from "@/lib/data";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return apiError("Unauthorized", 401);
  }

  try {
    const [courseCount, enquiryCount, galleryCount, contactedCount] = await Promise.all([
      prisma.course.count().catch(() => defaultCourses.length),
      prisma.application.count().catch(() => 0),
      prisma.galleryImage.count().catch(() => 0),
      prisma.application.count({ where: { status: "CONTACTED" } }).catch(() => 0),
    ]);

    let recentEnquiries: any[] = [];
    try {
      recentEnquiries = await prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
    } catch { /* DB down */ }

    return NextResponse.json({
      stats: {
        courses: courseCount || defaultCourses.length,
        enquiries: enquiryCount,
        gallery: galleryCount,
        conversion: enquiryCount > 0 ? Math.round((contactedCount / enquiryCount) * 100) : 0,
      },
      recentEnquiries,
      activities: [],
      enquiriesByMonth: [],
      courseDistribution: [],
    });
  } catch {
    return NextResponse.json({
      stats: { courses: defaultCourses.length, enquiries: 0, gallery: 0, conversion: 0 },
      recentEnquiries: [],
      activities: [],
      enquiriesByMonth: [],
      courseDistribution: [],
    });
  }
}
