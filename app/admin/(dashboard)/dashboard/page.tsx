import { prisma } from "@/lib/prisma";
import { defaultCourses } from "@/lib/data";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  let stats = { courses: 0, enquiries: 0, gallery: 0, conversion: 0 };
  let recentEnquiries: any[] = [];
  let activities: any[] = [];

  try {
    const [courseCount, enquiryCount, galleryCount, contactedCount] = await Promise.all([
      prisma.course.count(),
      prisma.application.count(),
      prisma.galleryImage.count(),
      prisma.application.count({ where: { status: "CONTACTED" } }),
    ]);

    stats = {
      courses: courseCount || defaultCourses.length,
      enquiries: enquiryCount,
      gallery: galleryCount,
      conversion: enquiryCount > 0 ? Math.round((contactedCount / enquiryCount) * 100) : 0,
    };

    recentEnquiries = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Try to get activity logs
    try {
      activities = await (prisma as any).activityLog?.findMany?.({
        orderBy: { createdAt: "desc" },
        take: 8,
      }) || [];
    } catch {
      activities = [];
    }
  } catch {
    stats = {
      courses: defaultCourses.length,
      enquiries: 0,
      gallery: 0,
      conversion: 0,
    };
  }

  return (
    <DashboardClient
      stats={stats}
      recentEnquiries={JSON.parse(JSON.stringify(recentEnquiries))}
      activities={JSON.parse(JSON.stringify(activities))}
    />
  );
}
