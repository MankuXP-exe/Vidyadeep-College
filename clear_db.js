const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const courseCount = await prisma.course.deleteMany();
    const facultyCount = await prisma.facultyMember.deleteMany();
    const galleryCount = await prisma.galleryImage.deleteMany();
    console.log(`Deleted ${courseCount.count} courses, ${facultyCount.count} faculty members, ${galleryCount.count} gallery images.`);
  } catch (e) {
    if (e.message.includes('No Database URL')) {
      console.log('No DB available or configured, skipping cleanup.');
    } else {
      console.error(e);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
