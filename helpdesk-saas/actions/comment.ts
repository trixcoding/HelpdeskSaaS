"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const commentSchema = z.object({
  ticketId: z.string().min(1),
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(5000, "Comment is too long."),
});

export async function createCommentAction(
  formData: FormData,
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const result = commentSchema.safeParse({
    ticketId: formData.get("ticketId"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      success: false,
      error:
        result.error.issues[0]?.message ??
        "Invalid comment.",
    };
  }

  const {
    ticketId,
    content,
  } = result.data;

  const ticket =
    await prisma.ticket.findFirst({
      where: {
        id: ticketId,
      },
      select: {
        id: true,
        customerId: true,
        agentId: true,
      },
    });

  if (!ticket) {
    return {
      success: false,
      error: "Ticket not found.",
    };
  }

  const isCustomer =
    ticket.customerId === user.id;

  const isAgent =
    ticket.agentId === user.id;

  const isAdmin =
    user.role === "ADMIN";

  if (
    !isCustomer &&
    !isAgent &&
    !isAdmin
  ) {
    return {
      success: false,
      error: "You are not allowed to reply to this ticket.",
    };
  }

  const comment =
    await prisma.comment.create({
      data: {
        content,
        ticketId,
        userId: user.id,
      },
    });

  return {
    success: true,
    commentId: comment.id,
  };
}