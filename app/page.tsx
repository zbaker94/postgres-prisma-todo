"use client";
import { redirect } from "next/navigation";
import cookies from "js-cookie";

export default function AuthCheck() {
  const token = cookies.get("token");
  if (token) {
    redirect("/home");
  }
  redirect("/login?action=login");
}
