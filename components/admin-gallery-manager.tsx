"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminGalleryManager({ items }: { items: any[] }) {
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("altText", altText);
      formData.append("imageUrl", imageUrl);
      formData.append("featured", String(featured));
      if (file) formData.append("file", file);

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Upload failed");
      }

      toast.success("Gallery image saved");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this image?")) return;
    const response = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast.success("Deleted image");
      window.location.reload();
    } else {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="space-y-5 p-8">
        <div>
          <h2 className="font-display text-3xl text-white">Upload Gallery Image</h2>
          <p className="mt-2 text-sm text-slate-300">Upload to Supabase storage or provide a direct image URL.</p>
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Alt Text</Label>
          <Input value={altText} onChange={(event) => setAltText(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Use when not uploading a file" />
        </div>
        <div className="space-y-2">
          <Label>Upload File</Label>
          <Input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        </div>
        <label className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm text-slate-200">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
          Feature this image
        </label>
        <Button type="button" onClick={submit} disabled={loading}>{loading ? "Saving..." : "Save Image"}</Button>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} className="space-y-4 p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
              <Image src={item.imageUrl} alt={item.altText} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.altText}</p>
            </div>
            <Button type="button" variant="secondary" onClick={() => remove(item.id)}>Delete</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
