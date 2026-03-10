import { UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FacultyCard({ member }: { member: any }) {
  return (
    <Card className="h-full">
      <CardHeader className="items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
          <UserRound className="h-8 w-8" />
        </div>
        <div>
          <CardTitle>{member.name}</CardTitle>
          <p className="mt-1 text-sm font-medium text-primary">{member.designation}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">{member.qualifications}</p>
        {member.bio ? <p className="mt-3 text-sm leading-6 text-slate-600">{member.bio}</p> : null}
      </CardContent>
    </Card>
  );
}
