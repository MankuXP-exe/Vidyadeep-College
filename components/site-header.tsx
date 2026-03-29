"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#1e2a78]/75 backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-[#1e2a78]">
            <Image src="/images/logo.png" alt="Vidyadeep logo" fill sizes="48px" className="object-cover" />
          </div>
          <div className="shrink-0">
            <div className="font-display text-lg font-extrabold uppercase tracking-[0.15em] text-white sm:text-2xl">
              Vidyadeep
            </div>
            <div className="text-sm font-bold text-slate-200 sm:text-base">Institute of Paramedical Science</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[13px] font-medium text-slate-200 transition hover:text-primary 2xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="tel:9992101666" className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <Phone className="h-4 w-4 text-secondary" /> 9992101666
          </Link>
          <Button asChild>
            <Link href="/apply-online">Apply Now</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1e2a78]/70 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-white/10 bg-[#1e2a78]/95 xl:hidden"
          >
            <div className="container flex max-h-[calc(100vh-5rem)] flex-col gap-2 overflow-y-auto py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-primary/10"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/apply-online">Apply Now</Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
