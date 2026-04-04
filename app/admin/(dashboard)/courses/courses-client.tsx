"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAdminTheme } from "@/components/admin/theme-provider";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm, ConfirmDelete } from "@/components/admin/modal-form";
import { Plus, Pencil, Trash2, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";

const courseFields = [
  { name: "slug", label: "Slug", required: true, placeholder: "e.g., diploma-in-mlt" },
  { name: "title", label: "Title", required: true, placeholder: "e.g., Diploma in MLT" },
  { name: "category", label: "Category", placeholder: "e.g., Diploma Program" },
  { name: "shortDesc", label: "Short Description", type: "textarea" as const },
  { name: "overview", label: "Overview", type: "textarea" as const },
  { name: "eligibility", label: "Eligibility", placeholder: "e.g., 10+2 Science" },
  { name: "duration", label: "Duration", placeholder: "e.g., 2 Years" },
  { name: "careers", label: "Career Opportunities", type: "textarea" as const },
  { name: "icon", label: "Icon Name", placeholder: "e.g., Microscope" },
  { name: "featured", label: "Featured", type: "checkbox" as const },
];

const emptyForm = Object.fromEntries(courseFields.map((f) => [f.name, f.type === "checkbox" ? false : ""]));

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function CoursesClient({ courses: initialCourses }: { courses: any[] }) {
  const [coursesList, setCoursesList] = useState(initialCourses);
  const { theme } = useAdminTheme();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [loading, setLoading] = useState(false);

  function openCreate() {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(item: any) {
    setForm({ ...item });
    setEditId(item.id);
    setShowForm(true);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const url = editId ? `/api/admin/courses/${editId}` : "/api/admin/courses";
      const res = await fetch(url, {
        method: editId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "Operation failed");
      }
      toast.success(editId ? "Course updated!" : "Course created!");
      setShowForm(false);
      
      if (data) {
        if (editId) {
          setCoursesList((prev) => prev.map((c: any) => c.id === editId ? data : c));
        } else {
          setCoursesList((prev) => [data, ...prev]);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${deleteId}`, { method: "DELETE" });
      toast.success("Course deleted!");
      setCoursesList((prev) => prev.filter((c: any) => c.id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  }

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
            Courses
          </h1>
          <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Manage your course catalog. Changes auto-sync with the website.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </motion.div>

      {/* Table */}
      <DataTable
        data={coursesList}
        searchKey="title"
        searchPlaceholder="Search courses..."
        columns={[
          {
            key: "title",
            label: "Course",
            sortable: true,
            render: (item) => (
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  theme === "dark" ? "bg-indigo-500/15" : "bg-indigo-100"
                }`}>
                  <BookOpen className={`h-4 w-4 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                </div>
                <div>
                  <span className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {item.title}
                  </span>
                  {item.featured && (
                    <Star className="ml-1.5 inline h-3 w-3 fill-amber-400 text-amber-400" />
                  )}
                </div>
              </div>
            ),
          },
          { key: "category", label: "Category", sortable: true },
          { key: "duration", label: "Duration" },
          { key: "eligibility", label: "Eligibility" },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => openEdit(item)}
              className={`rounded-lg p-2 transition-colors ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeleteId(item.id?.startsWith("default-") ? null : item.id)}
              disabled={item.id?.startsWith("default-")}
              className={`rounded-lg p-2 transition-colors disabled:opacity-30 ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  : "text-slate-400 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      {/* Modal Form */}
      <ModalForm
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editId ? "Edit Course" : "Add New Course"}
        description="Course details will auto-sync with the public website."
        fields={courseFields}
        values={form}
        onChange={(name, value) => {
          setForm((prev: any) => {
            const updates: any = { ...prev, [name]: value };
            // Auto-slugify if changing title and slug was empty or previously auto-generated
            if (name === "title" && (!prev.slug || prev.slug === slugify(prev.title))) {
              updates.slug = slugify(value);
            }
            return updates;
          });
        }}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={editId ? "Update Course" : "Create Course"}
      />

      {/* Delete Confirmation */}
      <ConfirmDelete
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={loading}
        title="Delete Course?"
        message="This will permanently remove the course from the website. This action cannot be undone."
      />
    </div>
  );
}
