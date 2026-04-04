import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { CourseCard } from "@/components/course-card";
import { getCourses } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paramedical Courses & Nursing Degrees | ANM, GNM, MLT, BPT",
  description: "Browse our comprehensive diploma and degree programs in nursing, pharmacy, and medical technology. 100% placement support in top hospitals.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container py-16 space-y-10">
      <FadeIn>
        <Badge>Courses</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Healthcare programs designed for academic excellence and employability</h1>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, index) => (
          <FadeIn key={course.slug} delay={index * 0.04}>
            <CourseCard course={course} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
