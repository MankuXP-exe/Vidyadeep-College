import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
