import { PrismaClient } from "@prisma/client";
import {
  defaultCourses,
  facultyMembers,
  gallerySeed,
  siteContentSeed,
  testimonials,
} from "./lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  // Seed Courses
  for (const course of defaultCourses) {
    const exists = await prisma.course.findUnique({ where: { slug: course.slug } });
    if (!exists) {
      await prisma.course.create({ data: course });
      console.log(`Created course: ${course.title}`);
    }
  }

  // Seed Faculty
  for (const faculty of facultyMembers) {
    const exists = await prisma.facultyMember.findUnique({ where: { slug: faculty.slug } });
    if (!exists) {
      await prisma.facultyMember.create({
        data: {
          name: faculty.name,
          slug: faculty.slug,
          designation: faculty.designation,
          qualifications: faculty.qualifications,
          image: faculty.image || "",
          sortOrder: faculty.sortOrder,
          bio: "",
        },
      });
      console.log(`Created faculty: ${faculty.name}`);
    }
  }

  // Seed Gallery
  for (const img of gallerySeed) {
    // Check if we already seeded it using title since gallery doesn't have slug
    const exists = await prisma.galleryImage.findFirst({ where: { title: img.title } });
    if (!exists) {
      await prisma.galleryImage.create({
        data: {
          title: img.title,
          imageUrl: img.imageUrl,
          altText: img.altText || "",
          featured: img.featured,
        },
      });
      console.log(`Created external gallery image: ${img.title}`);
    }
  }

  // Seed Testimonials
  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { studentName: t.studentName } });
    if (!exists) {
      await prisma.testimonial.create({
        data: {
          studentName: t.studentName,
          course: t.course,
          quote: t.quote,
          rating: t.rating,
          featured: true,
        },
      });
      console.log(`Created testimonial: ${t.studentName}`);
    }
  }

  // Seed SiteContent
  for (const c of siteContentSeed) {
    const exists = await prisma.siteContent.findUnique({ where: { section: c.section } });
    if (!exists) {
      await prisma.siteContent.create({ data: c });
      console.log(`Created site content: ${c.section}`);
    }
  }

  console.log("Database perfectly seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
