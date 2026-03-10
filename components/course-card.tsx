import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/lib/data";

export function CourseCard({ course }: { course: any }) {
  const Icon = iconMap[course.icon as keyof typeof iconMap] || iconMap.Users;

  return (
    <Card className="group flex h-full flex-col transition duration-300 hover:-translate-y-2 hover:shadow-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
        <CardTitle className="pt-4">{course.title}</CardTitle>
        <CardDescription>{course.shortDesc}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-6 pt-2">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Duration:</span> {course.duration}
        </div>
        <Button asChild variant="outline" className="w-full shrink-0 justify-between">
          <Link href={`/courses/${course.slug}`}>
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
