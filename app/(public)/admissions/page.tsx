import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdmissionsPage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Admissions</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Apply for the upcoming healthcare-focused academic session</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-display text-3xl text-slate-950">Batch Start Dates</h2>
          <div className="mt-6 grid gap-4">
            {['1 June', '1 August'].map((date) => (
              <div key={date} className="rounded-[24px] bg-gradient-to-r from-primary to-secondary p-5 text-lg font-semibold text-white">{date}</div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="font-display text-3xl text-slate-950">Admission Support</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>Academic counselling for diploma and degree programs.</p>
            <p>Eligibility guidance and course selection support.</p>
            <p>Career-oriented advising for hospital and overseas pathways.</p>
          </div>
          <Button asChild className="mt-8">
            <Link href="/apply-online">Apply Online</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
