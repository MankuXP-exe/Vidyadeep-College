"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSignOutButton() {
  return (
    <Button type="button" variant="secondary" className="w-full justify-start" onClick={() => signOut({ callbackUrl: "/admin" })}>
      <LogOut className="mr-2 h-4 w-4" /> Sign out
    </Button>
  );
}
