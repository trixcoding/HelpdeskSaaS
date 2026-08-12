import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

import type { Role } from "@prisma/client";

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(
  allowedRoles: Role[],
) {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

export async function requireAgent() {
  return requireRole([
    "AGENT",
    "ADMIN",
  ]);
}