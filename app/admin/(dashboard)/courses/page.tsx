import { prisma } from "@/lib/prisma";
import { defaultCourses } from "@/lib/data";
import { CoursesClient } from "./courses-client";

export default async function AdminCoursesPage() {
  let items: any[] = [];
  try {
    items = await prisma.course.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    items = [];
  }

  if (items.length === 0) {
    items = defaultCourses.map((c, i) => ({ ...c, id: `default-${i}` }));
  }

  return <CoursesClient courses={JSON.parse(JSON.stringify(items))} />;
}
