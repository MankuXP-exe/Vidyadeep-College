"use client";

import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminApplicationsManager({ items }: { items: any[] }) {
  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      toast.success("Status updated");
      window.location.reload();
    } else {
      toast.error("Unable to update status");
    }
  }

  async function remove(id: string) {
    const response = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast.success("Application removed");
      window.location.reload();
    } else {
      toast.error("Unable to delete application");
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">{item.name}</h2>
            <p className="text-sm text-slate-600">{item.course} | {item.phone} | {item.email}</p>
            <p className="text-sm leading-6 text-slate-600">{item.message || "No message provided."}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">{item.status} | {formatDate(item.createdAt)}</p>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => updateStatus(item.id, item.status === "NEW" ? "CONTACTED" : "NEW")}>
              Toggle Status
            </Button>
            <Button type="button" variant="secondary" onClick={() => remove(item.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
