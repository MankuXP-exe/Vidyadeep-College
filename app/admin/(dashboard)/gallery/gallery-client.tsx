"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAdminTheme } from "@/components/admin/theme-provider";
import { Modal, ConfirmDelete } from "@/components/admin/modal-form";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Upload,
  ImageIcon,
  Video,
  Link as LinkIcon,
  X,
} from "lucide-react";

type Tab = "all" | "image" | "video";

export function GalleryClient({ items: initialItems }: { items: any[] }) {
  const { theme } = useAdminTheme();
  const [galleryItems, setGalleryItems] = useState(initialItems);
  const [tab, setTab] = useState<Tab>("all");
  const [showUpload, setShowUpload] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Upload form state
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<"image" | "video">("image");
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const filtered = tab === "all" ? galleryItems : galleryItems.filter((i: any) => (i.category || "image") === tab);

  async function compressImage(file: File): Promise<File> {
    if (!file.type.startsWith("image/")) return file;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(new File([blob], file.name, { type: file.type }));
            else resolve(file);
          }, file.type, 0.85);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleUpload() {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("altText", altText || title);
      formData.append("imageUrl", imageUrl);
      formData.append("featured", String(featured));
      formData.append("category", category);
      if (file) {
        toast.loading("Compressing & Uploading...", { id: "upload-toast" }); // Better mobile UX to denote background delay
        let uploadFile = file;
        if (file.type.startsWith("image/")) {
          uploadFile = await compressImage(file);
        }
        formData.append("file", uploadFile);
      } else {
        toast.loading("Uploading...", { id: "upload-toast" });
      }

      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error(`Server returned HTTP ${res.status}. File may be too large to process.`);
      }

      if (!res.ok) {
        throw new Error(data?.error || `Upload failed (${res.status})`);
      }
      toast.success("Gallery item added!", { id: "upload-toast" });
      setShowUpload(false);
      resetForm();
      if (data) setGalleryItems((prev) => [data, ...prev]);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload failed", { id: "upload-toast" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Item deleted!");
      setGalleryItems((prev) => prev.filter((i: any) => i.id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setAltText("");
    setImageUrl("");
    setCategory("image");
    setFeatured(false);
    setFile(null);
  }

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
    theme === "dark"
      ? "bg-white/[0.04] text-white placeholder-slate-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/40"
      : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500/40 border border-slate-200"
  }`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Gallery
          </h1>
          <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Upload images and videos. They&apos;ll auto-reflect on the website.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
        >
          <Plus className="h-4 w-4" />
          Upload
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1">
        {(["all", "image", "video"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              tab === t
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                : theme === "dark"
                  ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {t === "all" ? null : t === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className={`ml-0.5 rounded-md px-1.5 py-0.5 text-xs ${
              tab === t
                ? "bg-white/20"
                : theme === "dark" ? "bg-white/[0.06]" : "bg-slate-200"
            }`}>
              {t === "all" ? galleryItems.length : galleryItems.filter((i: any) => (i.category || "image") === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <div className={`flex flex-col items-center justify-center rounded-2xl border py-16 ${
          theme === "dark" ? "border-white/[0.06] bg-[#141b2d]" : "border-slate-200 bg-white"
        }`}>
          <ImageIcon className={`h-12 w-12 ${theme === "dark" ? "text-slate-600" : "text-slate-300"}`} />
          <p className={`mt-3 text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
            No items yet. Upload your first {tab === "all" ? "media" : tab}.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border ${
                theme === "dark" ? "border-white/[0.06] bg-[#141b2d]" : "border-slate-200 bg-white"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/90 text-white shadow-lg transition-transform hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {/* Category badge */}
                <span className={`absolute right-2 top-2 rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                  (item.category || "image") === "video"
                    ? "bg-purple-500/80 text-white"
                    : "bg-white/80 text-slate-700"
                }`}>
                  {item.category || "image"}
                </span>
              </div>
              <div className="p-3.5">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </p>
                <p className={`mt-0.5 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                  {item.altText}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        open={showUpload}
        onClose={() => { setShowUpload(false); resetForm(); }}
        title="Upload to Gallery"
        description="Add images or videos via file upload or URL."
      >
        <div className="space-y-4">
          <div>
            <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Campus Courtyard"
              className={inputClass}
            />
          </div>
          <div>
            <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Alt Text
            </label>
            <input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Brief description for accessibility"
              className={inputClass}
            />
          </div>
          <div>
            <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Category
            </label>
            <div className="flex gap-2">
              {(["image", "video"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    category === c
                      ? "bg-indigo-500 text-white"
                      : theme === "dark"
                        ? "bg-white/[0.04] text-slate-400 hover:text-white"
                        : "bg-slate-100 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {c === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Image/Video URL
            </label>
            <div className="relative">
              <LinkIcon className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                theme === "dark" ? "text-slate-500" : "text-slate-400"
              }`} />
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
          <div>
            <label className={`mb-1.5 block text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Or Upload File
            </label>
            <div className={`flex items-center gap-3 rounded-xl border-2 border-dashed p-4 ${
              theme === "dark"
                ? "border-white/[0.08] bg-white/[0.02]"
                : "border-slate-200 bg-slate-50"
            }`}>
              <Upload className={`h-8 w-8 ${theme === "dark" ? "text-slate-600" : "text-slate-300"}`} />
              <div className="flex-1">
                {file ? (
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{file.name}</span>
                    <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-300">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Click to select a file
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <label className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm cursor-pointer ${
            theme === "dark"
              ? "bg-white/[0.04] text-slate-300"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
            />
            Feature this item
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => { setShowUpload(false); resetForm(); }}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDelete
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={loading}
        title="Delete Gallery Item?"
        message="This will permanently remove the item from the website gallery."
      />
    </div>
  );
}
