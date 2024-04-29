"use client";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/providers/auth.store.provider";

export default function AuthCheck() {
  const { user } = useAuthStore((store) => ({ user: store.user }));
  if (user) {
    redirect("/home?tab=today");
  }
  redirect("/login?action=login");
}
