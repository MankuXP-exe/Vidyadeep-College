import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { FacultyCard } from "@/components/faculty-card";
import { getFaculty } from "@/lib/site";

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <div className="container py-16 space-y-10">
      <FadeIn>
        <Badge>Faculty</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Meet the mentors shaping future healthcare professionals</h1>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {faculty.map((member, index) => (
          <FadeIn key={member.slug} delay={index * 0.04}>
            <FacultyCard member={member} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
