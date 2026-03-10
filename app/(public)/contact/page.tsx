import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { contactDetails, socialLinks } from "@/lib/data";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Contact</Badge>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Reach the admissions and college support team</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-6 p-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Address</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{contactDetails.address.join(", ")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Phone</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{contactDetails.phones.join(" / ")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Social</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm text-primary">
              <Link href={socialLinks.youtube}>YouTube</Link>
              <Link href={socialLinks.instagram}>Instagram</Link>
              <Link href={socialLinks.map}>Google Map</Link>
            </div>
          </div>
        </Card>
        <iframe title="Vidyadeep map" src={contactDetails.mapEmbed} className="min-h-[420px] w-full rounded-[28px] border-0 shadow-glass" loading="lazy" />
      </div>
    </div>
  );
}
