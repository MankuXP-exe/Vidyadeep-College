import { prisma } from "@/lib/prisma";
import { EnquiriesClient } from "./enquiries-client";

export default async function AdminEnquiriesPage() {
  let items: any[] = [];
  try {
    items = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    items = [];
  }

  return <EnquiriesClient enquiries={JSON.parse(JSON.stringify(items))} />;
}
