"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function GalleryGrid({ items }: { items: any[] }) {
  const [active, setActive] = useState<any | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id || item.title || index}
            className="group relative overflow-hidden rounded-[28px] border border-white/40 bg-white/60 shadow-glass"
            onClick={() => setActive(item)}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 text-left">
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.altText}</p>
            </div>
          </button>
        ))}
      </div>
      {active ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4">
          <button className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white" onClick={() => setActive(null)}>
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white p-3">
            <div className="relative aspect-[16/10] w-full">
              <Image src={active.imageUrl} alt={active.altText} fill sizes="100vw" className="object-cover" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
