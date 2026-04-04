import { prisma } from "@/lib/prisma";
import {
  defaultCourses,
  facultyMembers,
  gallerySeed,
  siteContentSeed,
  testimonials,
} from "@/lib/data";

function hasConfiguredDatabase() {
  const url = process.env.DATABASE_URL;

  if (!url) return false;

  return !url.includes("user:password@localhost:5432");
}

async function safeDbQuery<T>(query: () => Promise<T>, fallback: T) {
  if (!hasConfiguredDatabase()) {
    return fallback;
  }

  try {
    const result = await query();
    return result;
  } catch (err) {
    console.error("Database query failed:", err);
    return fallback;
  }
}

export async function getCourses() {
  const isConfigured = hasConfiguredDatabase();
  const courses = await safeDbQuery(
    () => prisma.course.findMany({ orderBy: [{ featured: "desc" }, { title: "asc" }] }),
    [],
  );

  // Fallback to seed data ONLY if no database is connected at all
  if (!isConfigured && (!courses || courses.length === 0)) {
    return defaultCourses;
  }

  return courses;
}

export async function getCourse(slug: string) {
  const course = await safeDbQuery(() => prisma.course.findUnique({ where: { slug } }), null);

  return course || defaultCourses.find((item) => item.slug === slug) || null;
}

export async function getFaculty() {
  const isConfigured = hasConfiguredDatabase();
  const members = await safeDbQuery(
    () => prisma.facultyMember.findMany({ orderBy: { sortOrder: "asc" } }),
    [],
  );

  if (!isConfigured && (!members || members.length === 0)) {
    return facultyMembers;
  }

  return members;
}

export async function getGallery() {
  const isConfigured = hasConfiguredDatabase();
  const images = await safeDbQuery(
    () => prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } }),
    [],
  );

  if (!isConfigured && (!images || images.length === 0)) {
    return gallerySeed;
  }

  return images;
}

export async function getTestimonials() {
  const isConfigured = hasConfiguredDatabase();
  const items = await safeDbQuery(
    () => prisma.testimonial.findMany({ where: { featured: true }, orderBy: { updatedAt: "desc" } }),
    [],
  );

  if (!isConfigured && (!items || items.length === 0)) {
    return testimonials;
  }

  return items;
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
