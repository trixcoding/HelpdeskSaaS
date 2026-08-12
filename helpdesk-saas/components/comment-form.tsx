"use client";

import { useActionState } from "react";

import { createCommentAction } from "@/actions/comment";

type Props = {
  ticketId: string;
};

type ActionState = {
  success: boolean;
  error?: string;
} | null;

const initialState: ActionState = null;

export default function CommentForm({
  ticketId,
}: Props) {
  const [state, formAction, pending] =
    useActionState(
      createCommentAction,
      initialState,
    );

  return (
    <form
      action={formAction}
      className="mt-6 space-y-4"
    >
      <input
        type="hidden"
        name="ticketId"
        value={ticketId}
      />

      <textarea
        name="content"
        rows={5}
        required
        placeholder="Write a reply..."
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />

      {state?.error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-500">
          Reply added successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-400 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Reply"}
      </button>
    </form>
  );
}