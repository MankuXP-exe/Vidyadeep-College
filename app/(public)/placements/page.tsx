import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PlacementsPage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Student Placements</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Career support structured around real healthcare opportunities</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          "100% Job Placement Assistance",
          "Hospital and diagnostic centre readiness",
          "Government job preparation support",
          "Foreign internship pathway in Japan",
        ].map((item) => (
          <Card key={item} className="p-8 text-sm leading-7 text-slate-300">{item}</Card>
        ))}
      </div>
    </div>
  );
}
