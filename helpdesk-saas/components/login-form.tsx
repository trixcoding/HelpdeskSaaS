"use client";

import { useActionState } from "react";

import { loginAction } from "@/actions/auth";

type ActionState = {
  success: boolean;
    error?: string;
    } | null;

    const initialState: ActionState = null;

    export default function LoginForm() {
      const [state, formAction, pending] =
          useActionState(
                loginAction,
                      initialState
                          );

                            return (
                                <form
                                      action={formAction}
                                            className="space-y-5"
                                                >
                                                      <div>
                                                              <label className="mb-2 block text-sm font-medium text-slate-700">
                                                                        Email
                                                                                </label>

                                                                                        <input
                                                                                                  name="email"
                                                                                                            type="email"
                                                                                                                      required
                                                                                                                                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                                                                                                                          placeholder="john@example.com"
                                                                                                                                                  />
                                                                                                                                                        </div>

                                                                                                                                                              <div>
                                                                                                                                                                      <label className="mb-2 block text-sm font-medium text-slate-700">
                                                                                                                                                                                Password
                                                                                                                                                                                        </label>

                                                                                                                                                                                                <input
                                                                                                                                                                                                          name="password"
                                                                                                                                                                                                                    type="password"
                                                                                                                                                                                                                              required
                                                                                                                                                                                                                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                                                                                                                                                                                                                                  placeholder="********"
                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                      {state?.error && (
                                                                                                                                                                                                                                                                              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                                                                                                                                                                                                                                                                        {state.error}
                                                                                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                                                                                      )}

                                                                                                                                                                                                                                                                                                            <button
                                                                                                                                                                                                                                                                                                                    type="submit"
                                                                                                                                                                                                                                                                                                                            disabled={pending}
                                                                                                                                                                                                                                                                                                                                    className="w-full rounded-lg bg-blue-400 px-4 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                                                  {pending
                                                                                                                                                                                                                                                                                                                                                            ? "Logging in..."
                                                                                                                                                                                                                                                                                                                                                                      : "Login"}
                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                </form>
                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                  }