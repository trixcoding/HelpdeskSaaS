"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(150, "Title is too long."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000, "Description is too long."),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),
});

export async function createTicketAction(
  formData: FormData,
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const result = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
  });

  if (!result.success) {
    return {
      success: false,
      error:
        result.error.issues[0]?.message ??
        "Invalid ticket data.",
    };
  }

  const ticket = await prisma.ticket.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      priority: result.data.priority,

      customerId: user.id,
    },
  });

  return {
    success: true,
    ticketId: ticket.id,
  };
}