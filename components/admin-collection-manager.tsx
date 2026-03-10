"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox";
};

export function AdminCollectionManager({ title, endpoint, fields, items, titleKey }: { title: string; endpoint: string; fields: Field[]; items: any[]; titleKey: string; }) {
  const initialState = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""])), [fields]);
  const [form, setForm] = useState<any>(initialState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField(name: string, value: any) {
    setForm((current: any) => ({ ...current, [name]: value }));
  }

  async function submit() {
    setLoading(true);
    try {
      const response = await fetch(editingId ? `${endpoint}/${editingId}` : endpoint, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }
      toast.success(editingId ? "Updated successfully" : "Created successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item?")) return;
    try {
      const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="space-y-5 p-8">
        <div>
          <h2 className="font-display text-3xl text-slate-950">{editingId ? `Edit ${title}` : `Add ${title}`}</h2>
          <p className="mt-2 text-sm text-slate-600">Manage live website content securely.</p>
        </div>
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea value={form[field.name] ?? ""} onChange={(event) => updateField(field.name, event.target.value)} />
            ) : field.type === "checkbox" ? (
              <label className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm text-slate-700">
                <input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => updateField(field.name, event.target.checked)} />
                Enabled
              </label>
            ) : (
              <Input type={field.type === "number" ? "number" : "text"} value={form[field.name] ?? ""} onChange={(event) => updateField(field.name, field.type === "number" ? Number(event.target.value) : event.target.value)} />
            )}
          </div>
        ))}
        <div className="flex gap-3">
          <Button type="button" onClick={submit} disabled={loading}>{loading ? "Saving..." : editingId ? "Update" : "Create"}</Button>
          {editingId ? <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(initialState); }}>Cancel</Button> : null}
        </div>
      </Card>
      <div className="space-y-4">
        {items.map((item) => {
          const itemId = item.id || item.slug || item.section || item.title;
          return (
            <Card key={itemId} className="flex flex-col gap-4 p-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{item[titleKey]}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{Object.entries(item).filter(([key]) => !["id", titleKey, "createdAt", "updatedAt"].includes(key)).slice(0, 3).map(([key, value]) => `${key}: ${String(value)}`).join(" | ")}</p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => { setEditingId(item.id || null); setForm({ ...item }); }}>Edit</Button>
                {item.id ? <Button type="button" variant="secondary" onClick={() => remove(item.id)}>Delete</Button> : null}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
