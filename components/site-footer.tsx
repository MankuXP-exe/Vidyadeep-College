import Link from "next/link";
import { Instagram, MapPinned, Youtube } from "lucide-react";
import { contactDetails, navItems, socialLinks } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-slate-950 text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-4">
          <h3 className="font-display text-xl">Vidyadeep Paramedical College</h3>
          <p className="text-sm leading-6 text-slate-300">
            A premium healthcare education campus focused on employability, discipline, and modern clinical learning.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Explore</h4>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Contact</h4>
          <div className="text-sm leading-6 text-slate-300">{contactDetails.address.join(", ")}</div>
          <div className="text-sm text-slate-300">{contactDetails.phones.join(" / ")}</div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Connect</h4>
          <Link href={socialLinks.youtube} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <Youtube className="h-4 w-4" /> YouTube
          </Link>
          <Link href={socialLinks.instagram} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <Instagram className="h-4 w-4" /> Instagram
          </Link>
          <Link href={socialLinks.map} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <MapPinned className="h-4 w-4" /> Google Map
          </Link>
        </div>
      </div>
    </footer>
  );
}
