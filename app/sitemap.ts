import { MetadataRoute } from "next";
import { getCourses } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vidyadeepinstitute.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/faculty",
    "/facilities",
    "/admissions",
    "/placements",
    "/contact",
    "/apply-online",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic course routes
  const courses = await getCourses();
  const courseRoutes = courses.map((course: any) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes];
}
