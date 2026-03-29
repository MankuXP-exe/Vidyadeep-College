import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function FacilitiesPage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Facilities</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">A campus designed for disciplined learning and professional confidence</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Smart Classrooms", "Tech-enabled academic spaces for modern teaching."],
          ["Premium Reception", "A polished first impression aligned with institutional quality."],
          ["Clinical Learning Support", "Course environments tailored to paramedical training."],
          ["Comfort-led Campus", "Fully air-conditioned spaces for year-round comfort."],
        ].map((item) => (
          <Card key={item[0]} className="p-8">
            <h2 className="text-xl font-semibold text-white">{item[0]}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{item[1]}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
