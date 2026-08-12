"use client";

import { useActionState } from "react";

import { createTicketAction } from "@/actions/ticket";

type ActionState = {
  success: boolean;
  error?: string;
  ticketId?: string;
} | null;

const initialState: ActionState = null;

export default function CreateTicketForm() {
  const [state, formAction, pending] =
    useActionState(
      createTicketAction,
      initialState,
    );

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          name="title"
          type="text"
          placeholder="Cannot login to my account"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          rows={6}
          placeholder="Describe your problem..."
          required
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Priority
        </label>

        <select
          name="priority"
          defaultValue="MEDIUM"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="LOW">
            Low
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="HIGH">
            High
          </option>

          <option value="URGENT">
            Urgent
          </option>
        </select>
      </div>

      {state?.error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-500">
          Ticket created successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-400 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending
          ? "Creating..."
          : "Create Ticket"}
      </button>
    </form>
  );
}