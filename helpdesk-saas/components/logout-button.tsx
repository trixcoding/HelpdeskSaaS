"use client";

import { useTransition } from "react";

import { logoutAction } from "@/actions/auth";

export default function LogoutButton() {
  const [pending, startTransition] =
      useTransition();

        function logout() {
            startTransition(async () => {
                  await logoutAction();
                      });
                        }

                          return (
                              <button
                                    type="button"
                                          onClick={logout}
                                                disabled={pending}
                                                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-400 disabled:opacity-50"
                                                          >
                                                                {pending ? "Logging out..." : "Logout"}
                                                                    </button>
                                                                      );
                                                                      }