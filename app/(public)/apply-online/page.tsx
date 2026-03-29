import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ApplyForm } from "@/components/apply-form";

export default function ApplyOnlinePage() {
  return (
    <div className="container py-16 space-y-10">
      <div>
        <Badge>Apply Online</Badge>
        <h1 className="mt-4 font-display text-5xl text-white">Start your admission journey with Vidyadeep Paramedical Institute</h1>
      </div>
      <Card className="p-8 lg:p-10">
        <ApplyForm />
      </Card>
    </div>
  );
}
