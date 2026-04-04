import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourse, getCourses } from "@/lib/site";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  return (
    <div className="container space-y-10 py-16">
      <div>
        <Badge>{course.category}</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">{course.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{course.shortDesc}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6 p-8">
          <div>
            <h2 className="font-display text-3xl text-white">Course Overview</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">{course.overview}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Career Opportunities</h3>
            <p className="mt-3 text-base leading-8 text-slate-300">{course.careers}</p>
          </div>
        </Card>
        <Card className="space-y-6 p-8">
          <div>
            <h3 className="text-xl font-semibold text-white">Eligibility</h3>
            <p className="mt-3 text-base leading-8 text-slate-300">{course.eligibility}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Duration</h3>
            <p className="mt-3 text-base leading-8 text-slate-300">{course.duration}</p>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href="/apply-online">Apply for This Program</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
