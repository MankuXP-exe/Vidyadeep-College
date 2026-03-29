import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdmissionsPage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Admissions</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Apply for the upcoming healthcare-focused academic session</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-display text-3xl text-white">Batch Start Dates</h2>
          <div className="mt-6 grid gap-4">
            {['1 June', '1 August'].map((date) => (
              <div
                key={date}
                className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-xl font-bold tracking-tight text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {date}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="font-display text-3xl text-white">Admission Support</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
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
