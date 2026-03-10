import { prisma } from "@/lib/prisma";
import {
  defaultCourses,
  facultyMembers,
  gallerySeed,
  siteContentSeed,
  testimonials,
} from "@/lib/data";

let databaseAvailable: boolean | null = null;

function hasConfiguredDatabase() {
  const url = process.env.DATABASE_URL;

  if (!url) return false;

  return !url.includes("user:password@localhost:5432");
}

async function safeDbQuery<T>(query: () => Promise<T>, fallback: T) {
  if (!hasConfiguredDatabase()) {
    return fallback;
  }

  if (databaseAvailable === false) {
    return fallback;
  }

  try {
    const result = await query();
    databaseAvailable = true;
    return result;
  } catch {
    databaseAvailable = false;
    return fallback;
  }
}

export async function getCourses() {
  const courses = await safeDbQuery(
    () => prisma.course.findMany({ orderBy: [{ featured: "desc" }, { title: "asc" }] }),
    [],
  );

  return courses.length ? courses : defaultCourses;
}

export async function getCourse(slug: string) {
  const course = await safeDbQuery(() => prisma.course.findUnique({ where: { slug } }), null);

  return course || defaultCourses.find((item) => item.slug === slug) || null;
}

export async function getFaculty() {
  const members = await safeDbQuery(
    () => prisma.facultyMember.findMany({ orderBy: { sortOrder: "asc" } }),
    [],
  );

  return members.length ? members : facultyMembers;
}

export async function getGallery() {
  const images = await safeDbQuery(
    () => prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } }),
    [],
  );

  return images.length ? images : gallerySeed;
}

export async function getTestimonials() {
  const items = await safeDbQuery(
    () => prisma.testimonial.findMany({ where: { featured: true }, orderBy: { updatedAt: "desc" } }),
    [],
  );

  return items.length ? items : testimonials;
}

export async function getContent(section: string) {
  const item = await safeDbQuery(
    () => prisma.siteContent.findUnique({ where: { section } }),
    null,
  );

  return item || siteContentSeed.find((entry) => entry.section === section) || null;
}

export async function getAdminSnapshot() {
  const [courses, faculty, gallery, applications, testimonialsData, content] = await Promise.all([
    safeDbQuery(() => prisma.course.count(), 0),
    safeDbQuery(() => prisma.facultyMember.count(), 0),
    safeDbQuery(() => prisma.galleryImage.count(), 0),
    safeDbQuery(() => prisma.application.count(), 0),
    safeDbQuery(() => prisma.testimonial.count(), 0),
    safeDbQuery(() => prisma.siteContent.count(), 0),
  ]);

  return { courses, faculty, gallery, applications, testimonials: testimonialsData, content };
}
