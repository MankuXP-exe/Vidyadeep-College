import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/lib/data";

export function CourseCard({ course }: { course: any }) {
  const Icon = iconMap[course.icon as keyof typeof iconMap] || iconMap.Users;

  return (
    <div className="group relative h-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl space-y-4">
      <div className="absolute top-4 right-4">
        <Badge className="bg-white/10 text-white border-white/10 hover:bg-white/20 transition-colors">
          {course.category}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="inline-flex rounded-xl bg-white/10 p-3 text-white">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white leading-tight">
            {course.title}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-1">
            {course.shortDesc}
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="font-semibold text-white">Duration:</span>
          <span>{course.duration}</span>
        </div>

        <Button asChild variant="outline" className="w-full justify-between group-hover:bg-white/10 transition-colors">
          <Link href={`/courses/${course.slug}`}>
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
