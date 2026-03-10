import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/fade-in";
import { getContent } from "@/lib/site";

export default async function AboutPage() {
  const content = await getContent("about-page");

  return (
    <div className="container py-16 space-y-10">
      <FadeIn>
        <Badge>About College</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">History, vision, and infrastructure built for healthcare education</h1>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        <FadeIn className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="font-display text-3xl text-slate-950">{content?.title}</h2>
            <p className="mt-6 text-base leading-8 text-slate-600">{content?.body}</p>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="space-y-6 p-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Vision</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">To shape competent, ethical, and globally prepared healthcare professionals.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Mission</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Deliver practical medical education, placement support, disciplined campus culture, and student-centered growth.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Affiliation</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Affiliated to Asian International University (UGC Approved).</p>
            </div>
          </Card>
        </FadeIn>
      </div>
      <FadeIn>
        <Card className="p-8">
          <h2 className="font-display text-3xl text-slate-950">Infrastructure</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Fully AC campus and premium reception",
              "Smart classrooms with digital instruction",
              "Clinical and diagnostics-aligned labs",
              "Training support for spoken English and placements",
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-white/70 p-5 text-sm leading-6 text-slate-600">{item}</div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
