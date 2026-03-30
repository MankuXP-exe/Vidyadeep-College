import Image from "next/image";
import { UserRound } from "lucide-react";

export function FacultyCard({ member }: { member: any }) {
  return (
    <div className="group flex h-full flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-52 w-40 shrink-0 aspect-[3/4] overflow-hidden rounded-lg border border-white/20 bg-white p-2 shadow-md md:h-64 md:w-48">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            <UserRound className="h-24 w-24" />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-1 flex-col items-center gap-1">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-sm font-medium text-blue-400">{member.designation}</p>
        <p className="text-sm text-gray-300">{member.qualifications}</p>
        {member.bio ? (
          <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-3">
            {member.bio}
          </p>
        ) : null}
      </div>
    </div>
  );
}
